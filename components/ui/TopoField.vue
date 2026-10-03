<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  mode?: 'dark' | 'light' | 'auto'
  speed?: number
  length?: number
  density?: number
  opacity?: number
  hue?: number
  saturation?: number
  brightness?: number
}>(), { mode: 'auto', speed: 1, length: 1, density: 1, opacity: 1, hue: 0, saturation: 1, brightness: 1 })
const clamp = (value: number, fallback: number, min: number, max: number) => Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback
const settings = computed(() => ({
  speed: clamp(props.speed, 1, 0, 10),
  length: clamp(props.length, 1, .1, 10),
  density: clamp(props.density, 1, .1, 10),
  opacity: clamp(props.opacity, 1, 0, 1),
  hue: clamp(props.hue, 0, -360, 360),
  saturation: clamp(props.saturation, 1, 0, 3),
  brightness: clamp(props.brightness, 1, 0, 3)
}))
const canvas = ref<HTMLCanvasElement>()
const ready = ref(false)
const dark = ref(true)
let dispose = () => {}

const vertex = `
attribute vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`
// TopoField effect adapted from MengTo/threeui (MIT).
// Simplex noise: Copyright (C) 2011 Ashima Arts. All rights reserved. MIT License.
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
const fragment = `
precision highp float;
uniform vec2 u_resolution;
uniform vec2 u_size;
uniform float u_time;
uniform float u_length;
uniform float u_density;
uniform float u_dark;
uniform float u_hue;
uniform float u_saturation;
uniform float u_brightness;
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(.211324865405187, .366025403784439, -.577350269189626, .024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = x0.x > x0.y ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - .5;
  vec3 ox = floor(x + .5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - .85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;
  st.x *= u_size.x / u_size.y;
  vec2 noisePos = st * (1.4 * u_length) + vec2(u_time * .015, u_time * .025);
  float n = snoise(noisePos) * .5 + .5;
  float triangleWave = abs(fract(n * 10.0 * u_density) - .5) * 2.0;
  float topoLines = (1.0 - smoothstep(0.0, .02, triangleWave)) * .45;
  vec2 cell = mod(gl_FragCoord.xy / u_resolution * u_size, 48.0);
  vec2 pixel = u_size / u_resolution;
  float grid = max(1.0 - step(pixel.x, cell.x), 1.0 - step(pixel.y, cell.y)) * .12;
  vec3 brand = vec3(15.0, 23.0, 42.0) / 255.0;
  vec3 mint = vec3(248.0, 250.0, 252.0) / 255.0;
  vec3 accent = vec3(14.0, 165.0, 233.0) / 255.0;
  vec3 color = mix(mix(mint, brand, u_dark), accent, grid);
  color = mix(color, mix(accent, mint, u_dark), topoLines);
  vec3 axis = normalize(vec3(1.0));
  float angle = radians(u_hue);
  color = color * cos(angle) + cross(axis, color) * sin(angle) + axis * dot(axis, color) * (1.0 - cos(angle));
  color = mix(vec3(dot(color, vec3(.2126, .7152, .0722))), color, u_saturation);
  gl_FragColor = vec4(clamp(color * u_brightness, 0.0, 1.0), 1.0);
}
`

onMounted(() => {
  const el = canvas.value
  if (!el) return
  const gl = el.getContext('webgl', { alpha: false, antialias: false, depth: false })
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const scheme = window.matchMedia('(prefers-color-scheme: dark)')
  let program: WebGLProgram | null = null
  let buffer: WebGLBuffer | null = null
  let shaders: WebGLShader[] = []
  let uniforms: Record<string, WebGLUniformLocation | null> = {}
  let frame = 0, previous = 0, time = 0, width = 0, height = 0, visible = false
  const stop = () => { cancelAnimationFrame(frame); frame = 0; previous = 0 }
  const release = () => {
    ready.value = false
    if (!gl) return
    gl.deleteBuffer(buffer)
    gl.deleteProgram(program)
    shaders.forEach(shader => gl.deleteShader(shader))
    buffer = null; program = null; shaders = []; uniforms = {}
  }
  const draw = (now: number) => {
    frame = 0
    if (!gl || !program || gl.isContextLost() || !visible || document.hidden || !width || !height) return
    const s = settings.value
    const moving = s.speed > 0 && !motion.matches
    if (moving && previous) time += Math.min((now - previous) / 1000, .1) * s.speed
    previous = moving ? now : 0
    gl.useProgram(program)
    gl.uniform2f(uniforms.u_resolution!, el.width, el.height)
    gl.uniform2f(uniforms.u_size!, width, height)
    for (const [name, value] of Object.entries({ time, length: s.length, density: s.density, dark: Number(dark.value), hue: s.hue, saturation: s.saturation, brightness: s.brightness })) gl.uniform1f(uniforms[`u_${name}`]!, value)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
    ready.value = true
    if (moving) frame = requestAnimationFrame(draw)
  }
  const restart = () => { stop(); draw(performance.now()) }
  const theme = () => {
    let value: string | null = null
    for (let node: HTMLElement | null = el; node && !value; node = node.parentElement) {
      for (const attribute of ['data-theme', 'data-scheme']) {
        const candidate = node.getAttribute(attribute)
        if (candidate === 'dark' || candidate === 'light') { value = candidate; break }
      }
    }
    dark.value = props.mode === 'auto' ? (value ? value === 'dark' : scheme.matches) : props.mode !== 'light'
    restart()
  }
  const resize = () => {
    const rect = el.getBoundingClientRect()
    width = rect.width; height = rect.height
    const dpr = clamp(window.devicePixelRatio, 1, 1, 2)
    el.width = Math.max(1, Math.round(width * dpr)); el.height = Math.max(1, Math.round(height * dpr))
    gl?.viewport(0, 0, el.width, el.height)
    restart()
  }
  const init = () => {
    if (!gl || gl.isContextLost()) return
    release()
    try {
      for (const [type, source] of [[gl.VERTEX_SHADER, vertex], [gl.FRAGMENT_SHADER, fragment]] as const) {
        const shader = gl.createShader(type)
        if (!shader) throw new Error('Shader allocation failed')
        shaders.push(shader)
        gl.shaderSource(shader, source); gl.compileShader(shader)
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error('Shader compilation failed')
      }
      program = gl.createProgram()
      if (!program) throw new Error('Program allocation failed')
      shaders.forEach(shader => gl.attachShader(program!, shader))
      gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Program link failed')
      buffer = gl.createBuffer()
      if (!buffer) throw new Error('Buffer allocation failed')
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW)
      const position = gl.getAttribLocation(program, 'a_position')
      gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
      for (const name of ['resolution', 'size', 'time', 'length', 'density', 'dark', 'hue', 'saturation', 'brightness']) uniforms[`u_${name}`] = gl.getUniformLocation(program, `u_${name}`)
      resize()
    } catch { release(); stop() }
  }
  const lost = (event: Event) => { event.preventDefault(); stop(); release() }
  const resizeObserver = new ResizeObserver(resize)
  const intersection = new IntersectionObserver(([entry]) => { visible = !!entry?.isIntersecting; restart() })
  const themes = new MutationObserver(theme)
  for (let node: HTMLElement | null = el; node; node = node.parentElement) themes.observe(node, { attributes: true, attributeFilter: ['data-theme', 'data-scheme'] })
  resizeObserver.observe(el); intersection.observe(el)
  document.addEventListener('visibilitychange', restart)
  window.addEventListener('resize', resize)
  motion.addEventListener('change', restart); scheme.addEventListener('change', theme)
  el.addEventListener('webglcontextlost', lost); el.addEventListener('webglcontextrestored', init)
  const unwatch = watch([settings, () => props.mode], theme)
  theme(); init()
  dispose = () => {
    stop(); unwatch(); resizeObserver.disconnect(); intersection.disconnect(); themes.disconnect()
    document.removeEventListener('visibilitychange', restart)
    window.removeEventListener('resize', resize)
    motion.removeEventListener('change', restart); scheme.removeEventListener('change', theme)
    el.removeEventListener('webglcontextlost', lost); el.removeEventListener('webglcontextrestored', init)
    release()
  }
})
onBeforeUnmount(() => dispose())
</script>

<template>
  <div class="topo-field" :class="{ 'topo-light': !dark }" :style="{ opacity: settings.opacity }" aria-hidden="true">
    <canvas ref="canvas" :style="{ visibility: ready ? 'visible' : 'hidden' }" />
  </div>
</template>

<style scoped>
.topo-field{position:absolute;inset:0;z-index:-1;pointer-events:none;overflow:hidden;background-color:#091413;background-image:repeating-radial-gradient(ellipse at 80% 60%,transparent 0 24px,#408a714d 25px 26px,transparent 27px 48px),linear-gradient(#b0e4cc1f 1px,transparent 0),linear-gradient(90deg,#b0e4cc1f 1px,transparent 0);background-size:auto,48px 48px,48px 48px;mask-image:linear-gradient(90deg,transparent 15%,#000)}
.topo-light{background-color:#b0e4cc}
canvas{display:block;width:100%;height:100%}
</style>
