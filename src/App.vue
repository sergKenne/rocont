<template>
  <div class="wrapper">
    <Header :actionModal="actionModal" />
    <BooksList :isAlert="isAlert" :alert="alert" :actionModal="actionModal" />
    <Teleport to="#modal">
      <Modal v-if="isModal" :actionModal="actionModal" :isEditModal="isEditModal" :alert="alert" />
    </Teleport>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue';
import { reactive, ref } from 'vue';
import BooksList from './components/BooksList.vue';
import Modal from './components/Modal.vue';

const isModal = ref(false)
const isEditModal = ref(false)
const isAlert = reactive({
  success: false,
  error: false,
  delete: false,
  update: false
})

const alert = {
  showSuccess: () => isAlert.success = true,
  hideSuccess: () => isAlert.success = false,
  showDelete: () => isAlert.delete = true,
  hideDelete: () => isAlert.delete = false,
  showError: () => isAlert.error = true,
  hideError: () => isAlert.error = false,
  showUpdate: () => isAlert.update = true,
  hideUpdate: () => isAlert.update = false
}

const actionModal = {
  open: () => isModal.value = true,
  close: () => isModal.value = false,
  toggleToEdit: () => isEditModal.value = true,
  toggleToAdd: () => isEditModal.value = false
}

</script>

<style lang="scss" scoped></style>
