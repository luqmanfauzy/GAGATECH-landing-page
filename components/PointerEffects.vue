<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
const cursor = ref<HTMLElement>()
let dispose = () => {}
onMounted(() => {
  const query = matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)')
  let frame = 0, x = -100, y = -100, targetX = -100, targetY = -100
  let magnetic: HTMLElement | null = null
  let timer: ReturnType<typeof setInterval> | undefined
  let scrambled: HTMLElement | null = null
  let original = ''
  const restore = () => { clearInterval(timer); if (scrambled) scrambled.textContent = original; scrambled = null }
  const resetMagnet = () => { if (magnetic) magnetic.style.translate = ''; magnetic = null }
  const move = (e: PointerEvent) => {
    if (!query.matches || !cursor.value) return
    targetX = e.clientX; targetY = e.clientY
    cursor.value.style.opacity = '1'
    const target = e.target as HTMLElement
    const project = target.closest('[data-project]')
    cursor.value.textContent = project ? 'Lihat ↗' : ''
    cursor.value.classList.toggle('is-project', !!project)
    cursor.value.classList.toggle('is-link', !!target.closest('a, button, summary'))
    const next = target.closest<HTMLElement>('[data-magnetic]')
    if (magnetic !== next) resetMagnet()
    magnetic = next
    if (magnetic) { const rect = magnetic.getBoundingClientRect(); magnetic.style.translate = `${(e.clientX - rect.left - rect.width / 2) * .12}px ${(e.clientY - rect.top - rect.height / 2) * .12}px` }
    const card = target.closest<HTMLElement>('.project-visual')
    if (card) { const rect = card.getBoundingClientRect(); card.style.setProperty('--px', `${e.clientX - rect.left}px`); card.style.setProperty('--py', `${e.clientY - rect.top}px`) }
  }
  const over = (e: PointerEvent) => {
    if (!query.matches) return
    const label = (e.target as HTMLElement).closest<HTMLElement>('[data-scramble]')
    if (!label || label === scrambled) return
    restore(); scrambled = label; original = label.textContent || ''
    let tick = 0
    timer = setInterval(() => { if (!scrambled) return; scrambled.textContent = original.split('').map((char, index) => index < tick || char === ' ' ? char : '01_+/'[Math.floor(Math.random() * 5)]).join(''); tick += 2; if (tick > original.length) restore() }, 35)
  }
  const draw = () => { x += (targetX - x) * .18; y += (targetY - y) * .18; if (cursor.value) cursor.value.style.transform = `translate3d(${x}px,${y}px,0)`; frame = requestAnimationFrame(draw) }
  const leave = () => { if (cursor.value) cursor.value.style.opacity = '0'; resetMagnet(); restore() }
  const change = () => { cancelAnimationFrame(frame); leave(); if (query.matches && !document.hidden) draw() }
  window.addEventListener('pointermove', move, { passive: true }); window.addEventListener('pointerover', over); document.addEventListener('pointerleave', leave); document.addEventListener('visibilitychange', change); query.addEventListener('change', change); change()
  dispose = () => { cancelAnimationFrame(frame); restore(); resetMagnet(); window.removeEventListener('pointermove', move); window.removeEventListener('pointerover', over); document.removeEventListener('pointerleave', leave); document.removeEventListener('visibilitychange', change); query.removeEventListener('change', change) }
})
onBeforeUnmount(() => dispose())
</script>
<template><div ref="cursor" class="custom-cursor" aria-hidden="true" /></template>
