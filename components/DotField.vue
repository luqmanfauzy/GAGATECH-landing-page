<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
const canvas = ref<HTMLCanvasElement>();
let dispose = () => {};
onMounted(() => {
    const el = canvas.value;
    if (!el) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0,
        height = 0,
        frame = 0,
        visible = false;
    let pointer = { x: -1000, y: -1000 };
    const draw = () => {
        ctx.clearRect(0, 0, width, height);
        for (let x = 12; x < width; x += 25)
            for (let y = 12; y < height; y += 25) {
                const distance = Math.hypot(x - pointer.x, y - pointer.y);
                const force = motion.matches
                    ? 0
                    : Math.max(0, 1 - distance / 180);
                ctx.fillStyle = `rgba(255,255,255,${0.13 + force * 0.55})`;
                ctx.beginPath();
                ctx.arc(
                    x + (x - pointer.x) * force * 0.12,
                    y + (y - pointer.y) * force * 0.12,
                    1 + force * 1.5,
                    0,
                    Math.PI * 2,
                );
                ctx.fill();
            }
        if (visible && !document.hidden && !motion.matches)
            frame = requestAnimationFrame(draw);
    };
    const restart = () => {
        cancelAnimationFrame(frame);
        draw();
    };
    const resize = new ResizeObserver(() => {
        const rect = el.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
        const dpr = Math.min(window.devicePixelRatio, 2);
        el.width = width * dpr;
        el.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        restart();
    });
    const observer = new IntersectionObserver(([entry]) => {
        visible = !!entry?.isIntersecting;
        restart();
    });
    const move = (event: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const leave = () => {
        pointer = { x: -1000, y: -1000 };
    };
    const visibility = () => restart();
    resize.observe(el);
    observer.observe(el);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", visibility);
    motion.addEventListener("change", restart);
    dispose = () => {
        cancelAnimationFrame(frame);
        resize.disconnect();
        observer.disconnect();
        window.removeEventListener("pointermove", move);
        document.removeEventListener("pointerleave", leave);
        document.removeEventListener("visibilitychange", visibility);
        motion.removeEventListener("change", restart);
    };
});
onBeforeUnmount(() => dispose());
</script>
<template>
    <canvas ref="canvas" class="dot-canvas" aria-hidden="true" />
</template>
