<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import { ref } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import NoChatSelected from '../components/NoChatSelected.vue'
import ChatContainer from '../components/ChatContainer.vue'

const selectedUser = ref(null)

const handleSelectUser = (user: any) => {
  selectedUser.value = user
}
</script>

<template>
  <Head title="Chat" />
  <div class="chat-layout">
    <div class="chat-wrapper">
      <div class="chat-card">
        <div class="chat-content">
          <Sidebar :selected-user="selectedUser" @select-user="handleSelectUser" />
          <NoChatSelected v-if="!selectedUser" />
          <ChatContainer v-else :user="selectedUser" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-layout {
  min-height: calc(100vh - 64px);
  background: var(--gray-2);
}

.chat-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 5rem;
  padding-left: 1rem;
  padding-right: 1rem;
}

.chat-card {
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 72rem;
  height: calc(100vh - 8rem);
}

.chat-content {
  display: flex;
  height: 100%;
  border-radius: 0.5rem;
  overflow: hidden;
}
</style>
