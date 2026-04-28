<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const props = defineProps<{
  user: any
}>()

const messages = ref([])

const messageEndRef = ref<HTMLElement | null>(null)

const scrollToBottom = () => {
  if (messageEndRef.value) {
    messageEndRef.value.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(scrollToBottom)
watch(messages, scrollToBottom, { deep: true })
</script>

<template>
  <div class="chat-container">
    <div class="chat-header">
      <div class="user-info">
        <img :src="user?.profilePic || '/avatar.png'" :alt="user?.fullName" class="avatar" />
        <div>
          <div class="user-name">{{ user?.fullName }}</div>
          <div class="user-status">{{ user?.online ? 'Online' : 'Offline' }}</div>
        </div>
      </div>
    </div>

    <div class="message-list">
      <div
        v-for="message in messages"
        :key="message._id"
        class="message-item"
        :class="{ 'message-me': message.senderId === 'me', 'message-them': message.senderId !== 'me' }"
      >
        <div class="message-avatar">
          <img
            :src="message.senderId === 'me' ? '/avatar.png' : user?.profilePic || '/avatar.png'"
            class="avatar-small"
          />
        </div>
        <div class="message-content">
          <div class="message-bubble">
            {{ message.text }}
          </div>
          <div class="message-time">
            {{ new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
          </div>
        </div>
      </div>
      <div ref="messageEndRef"></div>
    </div>

    <div class="message-input-area">
      <div class="input-container">
        <input type="text" placeholder="Type a message..." class="message-input" />
        <button class="send-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header {
  padding: 1rem;
  border-bottom: 1px solid var(--gray-3);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  object-fit: cover;
}

.user-name {
  font-weight: 500;
}

.user-status {
  font-size: 0.75rem;
  color: var(--gray-6);
}

.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message-item {
  display: flex;
  gap: 0.5rem;
  max-width: 80%;
}

.message-me {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.message-them {
  align-self: flex-start;
}

.avatar-small {
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
}

.message-content {
  display: flex;
  flex-direction: column;
}

.message-me .message-content {
  align-items: flex-end;
}

.message-bubble {
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  background-color: var(--gray-2);
  font-size: 0.875rem;
}

.message-me .message-bubble {
  background-color: var(--gray-12);
  color: #fff;
}

.message-time {
  font-size: 0.75rem;
  color: var(--gray-6);
  margin-top: 0.25rem;
}

.message-input-area {
  padding: 1rem;
  border-top: 1px solid var(--gray-3);
}

.input-container {
  display: flex;
  gap: 0.5rem;
}

.message-input {
  flex: 1;
  height: 2.5rem;
  border: 1px solid var(--gray-3);
  border-radius: 0.5rem;
  padding: 0 1rem;
}

.send-button {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--gray-12);
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}
</style>
