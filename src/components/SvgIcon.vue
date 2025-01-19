<script setup>
import { defineProps } from 'vue';
const props = defineProps({ name: String })
</script>

<template>
  <svg>
    <use :xlink:href="`#${name}`" />
  </svg>
</template>

<style lang="scss" scoped></style>