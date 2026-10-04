<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 132 });
</script>
<template>
    <span class="logo-frame" :style="{ width: `${size}px` }"
        ><img
            :src="'/brand/LOGO-GAGATECH-removebg.png'"
            class="logo-mark"
            alt="GAGA TECH"
    /></span>
</template>

<style scoped>
.logo-frame {
    display: block;
    max-width: 100%;
    flex-shrink: 0;
}
.logo-mark {
    display: block;
    width: 100%;
    height: auto;
    filter: invert(var(--logo-invert));
}
</style>
