<template>
  <div class="books">
    <div class="container">
      <div v-if="!filterBooks(searchInput, books).length" class="books__info">По вашему запросу ничего не найдено
      </div>
      <BooksItem class="books__item" v-for="book in filterBooks(searchInput, books)" :key="book.id" :book="book"
        :actionModal="actionModal" />
    </div>
    <div class="books__buttons">
      <Button v-if="isAlert.success" text="Книга добавлена в список" :icon="addSuccessIcon" :closeIcon="closeIcon"
        class="btn--success books__icon" @click="alert.hideSuccess" />
      <Button v-if="isAlert.delete" text="Книга удалена" :icon="addSuccessIcon" :closeIcon="closeIcon"
        class="btn--success books__icon" @click="alert.hideSuccess" />
      <Button v-if="isAlert.error" text="Книга не добавлена" :icon="errorAddIcon" :closeIcon="closeIcon"
        class="btn--error books__icon" />
      <Button v-if="isAlert.update" text="Книга обновлена" :icon="addSuccessIcon" :closeIcon="closeIcon"
        class="btn--success books__icon" />
      <Button text="Добавить книгу" :icon="addIcon" class="books__icon books__icon--add" @click="actionModal.open" />
    </div>
  </div>
</template>

<script setup>
  import {defineProps, ref } from 'vue'
  import BooksItem from './BooksItem.vue';
  import Button from './Button.vue';
  import addIcon from '@/assets/icons/add.svg'
  import errorAddIcon from '@/assets/icons/error-add.svg';
  import closeIcon from '@/assets/icons/close.svg'
  import addSuccessIcon from '../assets/icons/add-success.svg'
  import filterBooks from '../utils/filterBooks'  
  
  import { storeToRefs } from 'pinia'
  import { useBooksStore } from '@/store/books/useBooksStore'
  
  defineProps({
    isAlert: Object,
    alert: Object,
    actionModal: Object,
  })

  const store = useBooksStore()
  const { books, searchInput } = storeToRefs(store)
  
</script>

<style lang="scss" scoped>
  .books {
    height: calc(100vh - 148px);
    overflow-y: scroll;
    @media (max-width: 550px) {
      height: calc(100vh - 128px);
    }
    &::-webkit-scrollbar,
    &::-webkit-scrollbar {
      height: 2px;
      width: 2px;
    }
  
    &::-webkit-scrollbar-track,
    &::-webkit-scrollbar-track {
      background: transparent;
    }
  
    &::-webkit-scrollbar-thumb,
    &::-webkit-scrollbar-thumb {
      background-color: transparent;
      border-radius: 1px;
      border: 1px solid transparent;
    }
    &__info {
      font-size: 16px;
      font-weight: 400;
      line-height: 19.2px;
      color: $dark_light;
    }
    &__item {
      margin-bottom: 16px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    &__buttons {
      position: fixed;
      bottom: 16px;
      left: 16px;
      right: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      @media (max-width: 320px) {
       left: 8px;
       right: 8px;
      }
    }
    &__icon {
      @media (max-width: 550px) {
        width: 100%;
      }
      &--add {
        display: none;
        @media (max-width: 550px) {
          display: flex;
        }
      }
    }
  }
</style>