<template>
  <div class="input">
    <label class="input__label" :for="name">{{  label }}</label>
    <input 
      class="input__field" 
      :class="error ? 'error' : ''"
      :id="name" 
      type="text" 
      :placeholder="placeholder" 
      :name="name" 
      :value="value"
      @input="emit('onInput', { name: $event.target.name, value: $event.target.value })"
    />
    <span v-if="error" class="input__status">{{ error }}</span>
  </div>
</template>

<script setup>
  import {defineProps, defineEmits} from 'vue'

  defineProps({
    label: {
      type: String,
      required: true
    },
    placeholder: {
      type: String
    },
    name: {
      type: String,
      required: true,
      default: () => ""
    },
    value: {
      type: String
    },
    error: {
      type: String
    }
  })

  const emit = defineEmits(['onInput'])


</script>

<style lang="scss" scoped>
  .input {
    display: flex;
    flex-direction: column;
    padding-bottom: 12px;
    position: relative;
    &__label {
      font-size: 14px;
      font-weight: 600;
      line-height: 21px;
      color: $dark;
      margin-bottom: 4px;
    }
    &__field {
      height: 41px;
      border-radius: 8px;
      background-color: $grey_light;
      border: none;
      outline: none;
      padding: 10px 12px;
      color: $dark;
      font-size: 14px;
      font-weight: 400;
      line-height: 21px;
      border: 2px solid transparent;
      &::placeholder {
        font-size: 14px;
        font-weight: 400;
        line-height: 21px;
        color: $dark_light;
      }
      &:active, &:focus {
        border-color: $green;
      }
      &.error {
        border-color: $red_dark;
      }
    }
    &__status {
      font-size: 10px;
      font-weight: 400;
      line-height: 10px;
      color: $red_dark;
      position: absolute;
      bottom: -1px;
      left: 16px;
    }
  }

  input:focus::-webkit-input-placeholder {
    color: transparent;
  }

  input:focus:-moz-placeholder {
    color: transparent;
  }

  input:focus::-moz-placeholder {
    color: transparent;
  }

  input:focus:-ms-input-placeholder {
    color: transparent;
  }
</style>