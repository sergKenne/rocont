<template>
  <div class="book">
    <p class="book__name">{{ book.title }}</p>
    <ul class="book__list">
      <li class="book__list-item">{{ book.author }}</li>
      <li class="book__list-item">{{ book.year }}</li>
      <li class="book__list-item">{{ book.genre }}</li>
    </ul>
    <SvgIcon :name="editIcon"  class="book__icon" @click="editBook(book)"/>
  </div>
</template>

<script setup>
  import { defineProps } from 'vue'
  import SvgIcon from './SvgIcon.vue';
import editIcon from '@/assets/icons/edit.svg'
  import { useBooksStore } from '../store/books/useBooksStore'
  
  const props = defineProps({
    book: Object,
    actionModal: Object,
  })

  const store = useBooksStore()

  const editBook = (book) => {
    props.actionModal.open()
    props.actionModal.toggleToEdit()
    store.setBookInputs(book)
  }
  
</script>

<style lang="scss" scoped>
  .book {
    position: relative;
    padding: 16px;
    border: 2px solid $grey_light;
    border-radius: 16px;
    transition: $transition;
    &:last-child {
      margin-bottom: 0;
    }
    &:hover {
      background-color: $grey_light;
    }
    &__name {
      color: $dark;
      margin-bottom: 8px;
      font-size: 16px;
      font-weight: 400;
      line-height: 19.2px;
      margin-right: 32px;
    }
    &__list {
      display: flex;
      column-gap: 16px;
      color: $dark_light;
      font-size: 14px;
      font-weight: 400;
      line-height: 21px;
    }
    &__icon {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 20px;
      height: 20px;
      stroke: $dark_light;
      cursor: pointer;
    }
  }
</style>