<template>
  <header class="header">
    <div class="container">
      <div class="header__top">
        <a href="#" class="header__logo" :class="{ hide: isSearchInput }">
          <img src="../assets/images/logo.png" alt="logo" class="header__logo-img">
        </a>
        <form class="header__form">
          <SvgIcon v-if="store.searchInput" :name="closeIcon" @click="store.clearSearchInput"
            class="header__form-close-svg" />
          <SvgIcon v-if="isSearchInput" :name="closeIcon" class="header__form-mobile-svg" @click="hideSearchForm" />
          <span class="header__form-icon" @click="isSearchInput = !isSearchInput">
            <SvgIcon :name="searchIcon" class="header__form-svg" />
          </span>
          <input type="text" class="header__form-input" :class="{ show: isSearchInput }" :value="store.searchInput"
            placeholder="Найти ту самую книгу" @input="handleChange">
        </form>
      </div>
      <div class="header__bottom">
        <p v-if="!store.searchInput.length">Книги в каталоге<span class="header__counter">{{
            filterBooks(store.searchInput,
            store.books).length}}</span></p>
        <p v-else>Книги по запросу<span class="header__counter">«{{ store.searchInput }}»</span></p>
        <Button text="Добавить книгу" :icon="addIcon" class="header__btn" @click="showAddModal" />
      </div>
    </div>
  </header>
</template>

<script setup>
  import Button from './Button.vue';
  import SvgIcon from './SvgIcon.vue';
  import searchIcon from '@/assets/icons/search.svg'
  import addIcon from '@/assets/icons/add.svg'
  import closeIcon from '@/assets/icons/close.svg'
  import { useBooksStore } from '../store/books/useBooksStore';
  import filterBooks from '../utils/filterBooks';
import { ref } from 'vue';

const props = defineProps({
    actionModal: Object,
  })

  const store = useBooksStore();
  const isSearchInput = ref(false)

  const handleChange = (e) => {
    store.handleSearchInput(e.target.value)
  }

  const showAddModal = () => {
    props.actionModal.open()
    props.actionModal.toggleToAdd()
}

const hideSearchForm = () => {
  isSearchInput.value = false
  store.clearSearchInput()
}
  
</script>

<style lang="scss" scoped>
  .header {
    padding-top: 16px;
    padding-bottom: 16px;
    background-color: $grey_light;
    margin-bottom: 16px;
    &__top {
      display: flex;
      column-gap: 25px;
      align-items: center;
      margin-bottom: 16px;
      @media (max-width: 320px) {
        column-gap: 0;
      }
    }
    &__logo{
      flex: 0 0 55px;
      &.hide {
        @media (max-width: 320px){
          display: none;
        }
      }
    }
    &__logo-img {
      width: 55px;
      height: 41px;
      @media (max-width: 320px) {
        height: 38px;
      }
    }
    &__form {
      flex: 1;
      position: relative;
    }
    &__form-icon {
      position: absolute;
      left: 12px;
      top: 10.5px;
      
      @media (max-width: 320px) {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 41px;
        height: 41px;
        background-color: $white;
        border-radius: 8px;
        top: 0;
        right: 0;
        left:initial;
        cursor: pointer;
      }
    }
    &__form-svg {
      width: 20px;
      height: 20px;
    }
    &__form-close-svg {
      width: 20px;
      height: 20px;
      stroke: $dark_light;
      position: absolute;
      right: 12px;
      top: 10px;
      cursor: pointer;
      z-index: 4;
      @media (max-width: 320px) {
        display: none;
      }
    }
    &__form-mobile-svg{
      width: 20px;
      height: 20px;
      stroke: $dark_light;
      position: absolute;
      left: 12px;
      top: 10.5px;
      z-index: 4;
      cursor: pointer;
    }
    &__form-input {
      display: block;
      width: 100%;
      border: none;
      outline: none;
      background-color: $white;
      height: 41px;
      padding: 10px 38px 10px 34px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 400;
      line-height: 21px;
      color: $dark;
      border: 2px solid transparent;
      @media (max-width: 320px) {
        padding-right: 12px;
        position: relative;
        z-index: -1;
      }

      &.show {
        @media (max-width: 320px) {
          z-index: 2;
        }
      }
    
      &::placeholder {
        color: $dark_light;
      }
    
      &:active,
      &:focus {
        border-color: $green;
      }
    }
    &__bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 20px;
      font-weight: 600;
      line-height: 20px;
      color: $dark;
    }
    &__counter {
      padding-left: 8px;
      color: $dark_light;
      line-height: 41px;
    }
    &__btn {
      width: 157px;
      height: 41px;
      @media (max-width: 550px) {
        display: none;
      }
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