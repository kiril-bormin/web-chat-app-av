<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { usePage } from '@inertiajs/vue3'
import axios from 'axios'
import { Transmit } from '@adonisjs/transmit-client'

const props = defineProps<{
  user: any
}>()

const page = usePage()
const currentUser = page.props.user as any

const messages = ref<any[]>([])
const newMessage = ref('')
const loading = ref(true)
const messageEndRef = ref<HTMLElement | null>(null)
const imageInput = ref<HTMLInputElement | null>(null)
const selectedImage = ref<File | null>(null)
const imagePreview = ref<string | null>(null)

let transmit: Transmit | null = null
let subscription: any = null

const scrollToBottom = () => {
  if (messageEndRef.value) {
    messageEndRef.value.scrollIntoView({ behavior: 'smooth' })
  }
}

const fetchMessages = async () => {
  loading.value = true
  try {
    const response = await axios.get(`/messages/${props.user.id}`)
    messages.value = response.data
    setTimeout(scrollToBottom, 50)
  } catch (error) {
    console.error('Failed to fetch messages:', error)
  } finally {
    loading.value = false
  }
}

const sendMessage = async () => {
  if (!newMessage.value.trim() && !selectedImage.value) return

  const formData = new FormData()
  if (newMessage.value.trim()) formData.append('text', newMessage.value)
  if (selectedImage.value) formData.append('image', selectedImage.value)

  try {
    const response = await axios.post(`/messages/${props.user.id}`, formData)
    // The message will be added via Transmit subscription to avoid duplicates 
    // or we can add it manually if we want instant feedback before server confirms
    newMessage.value = ''
    selectedImage.value = null
    imagePreview.value = null
  } catch (error) {
    console.error('Failed to send message:', error)
  }
}

const handleImageSelect = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    selectedImage.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const setupTransmit = async () => {
  transmit = new Transmit({
    baseUrl: window.location.origin
  })

  subscription = transmit.subscription(`chats/${currentUser.id}`)
  await subscription.create()

  subscription.onMessage((data: any) => {
    const message = data.message
    // Only add if it belongs to the current conversation
    if (
      (message.senderId === props.user.id && message.receiverId === currentUser.id) ||
      (message.senderId === currentUser.id && message.receiverId === props.user.id)
    ) {
      // Avoid duplicate if we already added it locally (optional logic)
      if (!messages.value.find(m => m.id === message.id)) {
        messages.value.push(message)
        setTimeout(scrollToBottom, 50)
      }
    }
  })
}

onMounted(() => {
  fetchMessages()
  setupTransmit()
})

onUnmounted(() => {
  if (subscription) {
    subscription.delete()
  }
})

watch(() => props.user.id, () => {
  fetchMessages()
})

watch(messages, scrollToBottom, { deep: true })
</script>

<template>
  <div class="chat-container">
    <header class="chat-header">
      <div class="user-info">
        <img :src="user.profilePic || '/avatar.png'" :alt="user.fullName" class="avatar" />
        <div>
          <div class="user-name">{{ user.fullName }}</div>
          <div class="user-status">{{ user.online ? 'Online' : 'Offline' }}</div>
        </div>
      </div>
    </header>

    <div class="message-list">
      <div v-if="loading" class="loading">Loading messages...</div>
      <template v-else>
        <div
          v-for="message in messages"
          :key="message.id"
          class="message-item"
          :class="{ 'message-me': message.senderId === currentUser.id, 'message-them': message.senderId !== currentUser.id }"
        >
          <div class="message-content">
            <div class="message-bubble">
              <img v-if="message.image" :src="message.image" class="message-image" />
              <p v-if="message.text">{{ message.text }}</p>
            </div>
            <span class="message-time">{{ new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}</span>
          </div>
        </div>
      </template>
      <div ref="messageEndRef"></div>
    </div>

    <div class="message-input-area">
      <div v-if="imagePreview" class="image-preview-container">
        <img :src="imagePreview" class="image-preview" />
        <button @click="imagePreview = null; selectedImage = null" class="remove-image">×</button>
      </div>
      
      <div class="input-container">
        <button @click="imageInput?.click()" class="icon-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
        </button>
        <input 
          type="file" 
          ref="imageInput" 
          @change="handleImageSelect" 
          accept="image/*" 
          style="display: none" 
        />
        
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          type="text"
          placeholder="Type a message..."
          class="message-input"
        />
        <button @click="sendMessage" class="send-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
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

.message-image {
  max-width: 200px;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
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
  align-items: center;
}

.message-input {
  flex: 1;
  height: 2.5rem;
  border: 1px solid var(--gray-3);
  border-radius: 0.5rem;
  padding: 0 1rem;
}

.icon-button {
  background: none;
  border: none;
  color: var(--gray-8);
  cursor: pointer;
  padding: 0.25rem;
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

.image-preview-container {
  position: relative;
  display: inline-block;
  margin-bottom: 0.5rem;
}

.image-preview {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 0.5rem;
}

.remove-image {
  position: absolute;
  top: -5px;
  right: -5px;
  background: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: var(--gray-6);
}
</style>
