<template>
  <div class="modal">
    <div class="modal__dialog">
      <SvgIcon :name="closeIcon" class="modal__close-icon" @click="closeModal" />
      <div class="modal__body">
        <h4 class="modal__title">{{ !isEditModal ? "Добавить книгу" : "Редактирование" }}</h4>
        <p class="modal__description">{{ !isEditModal ? "Заполните все поля и добавьте книгу в список" : "Внесите изменение в карточке" }}</p>
        <form action="" class="modal__form">
          <Input label="Название" placeholder="Название произведения" :value="bookInputs.title" name="title"
            :error="errors.title" @onInput="handleChangeInput" />
          <Input label="Автор" placeholder="Имя и фамилия автора" :value="bookInputs.author" name="author"
            :error="errors.author" @onInput="handleChangeInput" />
          <Input label="Год" placeholder="Год выпуска" name="year" :value="bookInputs.year" :error="errors.year"
            @onInput="handleChangeInput" />
          <Input label="Жанр" placeholder="Добавьте жанр произведения" :value="bookInputs.genre" name="genre"
            @onInput="handleChangeInput" />
          <Checkbox />
          <div v-if="!isEditModal" class="modal__form-btns">
            <Button text="Добавить" :icon="addIcon" class="modal__add-btn" @click="handleAddBook" />
          </div>
          <div v-if="isEditModal" class="modal__form-btns">
            <Button text="Сохранить" :icon="saveIcon" class="modal__save-btn" @click="handleUpdateBook" />
            <Button :icon="deleteIcon" class="modal__delete-btn btn--secondary" @click="handleRemoveBook"/>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, reactive } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import SvgIcon from './SvgIcon.vue';
import closeIcon from '@/assets/icons/close.svg';
import Button from './Button.vue';
import addIcon from '@/assets/icons/add.svg'
import saveIcon from '@/assets/icons/save.svg'
import deleteIcon from '@/assets/icons/delete.svg'
import Input from './Input.vue';
import Checkbox from './Checkbox.vue';

import {useBooksStore} from '@/store/books/useBooksStore'
import { storeToRefs } from 'pinia';

const props = defineProps({
  isEditModal: Boolean,
  actionModal: Object,
  alert: Object
})

const store = useBooksStore()
const { bookInputs} = storeToRefs(store)
const { handleChangeInput, clearBookInputsField, addBook, updateBook, removeBook } = store
const errors = reactive({ title: "", author: "", year: "" })

const closeModal = () => {
  props.actionModal.close()
  clearBookInputsField()
}

const handleAddBook = (e) => {
  e.preventDefault()

  if (!bookInputs.value.title.trim().length) {
    errors.title = "Пожалуйста, заполните это поле"
    props.alert.showError()
    setTimeout(() => {
      props.alert.hideError()
    }, 2000)
  } else {
    errors.title= ""
  }

  if (!bookInputs.value.author.trim().length) {
    errors.author = "Пожалуйста, заполните это поле"
    props.alert.showError()
    setTimeout(() => {
      props.alert.hideError()
    }, 2000)
  } else {
    errors.author = ""
  }

  if (Number(bookInputs.value.year) > new Date().getFullYear()) {
    errors.year = "год не должно превышать текущий год"
    props.alert.showError()
    setTimeout(() => {
      props.alert.hideError()
    }, 2000)
  } 

  if ((bookInputs.value.year.trim().length > 0) && !Number(bookInputs.value.year)) {
    errors.year = "поле должно содержать только цифы"
    props.alert.showError()
    setTimeout(() => {
      props.alert.hideError()
    }, 2000)
  }

  if (bookInputs.value.title.trim().length
    && bookInputs.value.author.trim().length
    && (Number(bookInputs.value.year) < new Date().getFullYear() || bookInputs.value.year.trim().length == 0)
  ) {

    const newBook = {
      id: uuidv4(),
      ...bookInputs.value  
    }

    addBook(newBook)
    clearBookInputsField()
    props.actionModal.close()
    props.alert.showSuccess() 
    setTimeout(() => {
      props.alert.hideSuccess() 
    }, 2000)
  }

}

const handleUpdateBook = (e) => {
  e.preventDefault()

  errors.title = (!bookInputs.value.title.trim().length) ? "Пожалуйста, заполните это поле" : ""
  errors.author = (!bookInputs.value.author.trim().length) ? "Пожалуйста, заполните это поле" : ""

  if (Number(bookInputs.value.year) > new Date().getFullYear()) {
    errors.year = "год не должно превышать текущий год"
  }

  if ((bookInputs.value.year.trim().length > 0) && !Number(bookInputs.value.year)) {
    errors.year = "поле должно содержать только цифы"
  }

  if (bookInputs.value.title.trim().length
    && bookInputs.value.author.trim().length
    && (Number(bookInputs.value.year) < new Date().getFullYear() || bookInputs.value.year.trim().length == 0)
  ) {

    updateBook({ ...bookInputs.value })
    clearBookInputsField()
    props.actionModal.close()
    props.alert.showUpdate()
    setTimeout(() => {
      props.alert.hideUpdate()
    }, 2000)
  }
}

const handleRemoveBook = (e) => {
  e.preventDefault()
  removeBook(bookInputs.value.id)
  clearBookInputsField()
  props.actionModal.close()
  props.alert.showDelete()
  setTimeout(() => {
    props.alert.hideDelete()
  },2000)
}

onMounted(() => {
  const modal = document.querySelector('.modal');
  modal.addEventListener('click', function (e) {
    if (e.target.className == 'modal') {
      props.actionModal.close()
      clearBookInputsField()
    }
  })
})

</script>

<style lang='scss' scoped>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 100vh;
  background: rgba($dark, 10%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;

  &__dialog {
    position: relative;
    background-color: $white;
    width: 464px;
    min-height: 200px;
    border-radius: 16px;
    padding: 32px;
    margin-left: 6px;
    margin-right: 6px;
    @media (max-width: 530px) {
      padding: 28px;
      height: 100vh;
      width: 100%;
      margin-left: 0;
      margin-right: 0;
      border-radius: 0px;
    }
    @media (max-width: 320px) {
      padding: 20px;
    }
  }

  &__close-icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
    position: absolute;
    top: 32px;
    right: 32px;
    stroke: #707786;
    @media (max-width: 320px) {
      top: 18px;
    }
  }

  &__title {
    font-size: 20px;
    font-weight: 600;
    line-height: 20px;
    color: $dark;
    margin-bottom: 8px;
  }

  &__description {
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    color: $dark_light;
    margin-bottom: 16px;
  }

  &__form-btns {
    display: flex;
    justify-content: flex-end;
    gap: 8px
  }

  &__add-btn {
    @media (max-width: 480px) {
      width: 100%;
    }
  }

  &__save-btn {
    @media (max-width: 480px) {
      width: 100%;
    }
  }
}
</style>