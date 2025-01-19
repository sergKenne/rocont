<template>
  <button class="btn">
    <SvgIcon :name="icon" class="btn__icon" />
    <span class="btn__text">{{ text }}</span>
    <SvgIcon v-if="closeIcon" :name="closeIcon" class="btn__icon btn__icon--close" />
  </button>
</template>

<script setup>
  import { defineProps } from 'vue';
  import SvgIcon from './SvgIcon.vue';
  defineProps({
    text: {
      type: String,
      default: () => ""
    },
    icon: {
      type: String
    },
    closeIcon: {
      type: String,
      default: () => ""
    }
  })
  
</script>

<style lang="scss" scoped>
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 4px;
    background-color: $green;
    color: $white;
    padding: 10.5px 12px;
    border-radius: $raduis;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    cursor: pointer;
    transition: $transition;
    &--secondary {
      background-color: $grey_light;
      .btn__icon {
        opacity: 1;
        stroke: $dark_light;
      }
      &:hover .btn__icon {
        stroke: $red_dark;
      }
      &:active .btn__icon {
        stroke: $red_dark;
      }
    }
    &--error {
      background-color: $red_dark;
      .btn__icon {
        opacity: 1;
      }
      .btn__icon--close {
        opacity: 50%;
        stroke: $white;
      }
    }
    &--success {
      background-color: $green;

      .btn__icon {
        opacity: 1;
      }

      .btn__icon--close {
        opacity: 50%;
        stroke: $white;
      }
    }
    &__icon {
      width: 20px;
      height: 20px;
      opacity: .5;
    }
    &:hover .btn__icon {
      opacity: 1.5;
    }
  }
</style>


