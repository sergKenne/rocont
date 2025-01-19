<template>
  <label class="checkbox">
    <input type="checkbox" class="checkbox__input" />
    <SvgIcon :name="squareIcon" class="checkbox__icon checkbox__icon--square" />
    <SvgIcon :name="checkIcon" class="checkbox__icon checkbox__icon--check" />
    <p class="checkbox__label">Я согласен с условиями <span>Политики конфиденциальности</span></p>
  </label>
</template>

<script setup>
  import SvgIcon from './SvgIcon.vue';
import squareIcon from '../assets/icons/square.svg'
import checkIcon from '../assets/icons/check.svg'

</script>

<style lang="scss" scoped>


.checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 8px;
  margin-bottom: 16px;
  margin-top: 4px;

  &__input {
    display: none;

    &:checked ~ .checkbox__icon--square {
      display: none;
    }
    &:checked~.checkbox__icon--check {
      display: inline-block;
    }
  }

  &__icon {
    width: 16px;
    height: 16px;
    &--check {
      display: none;
    }
  }

  &__label {
    color: $dark_light;
    font-size: 10px;
    font-weight: 400;
    line-height: 10px;
    span {
      border-bottom: 1px solid $dark_light;
    }
  }
}
</style>