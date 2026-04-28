<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const props = defineProps<{
  user: any
}>()

const messages = ref([
  { _id: '1', senderId: 'me', text: 'Hey there!', createdAt: new Date().toISOString() },
  { _id: '2', senderId: props.user?._id, text: 'Hi! How are you?', createdAt: new Date().toISOString() },
])

const messageEndRef = ref<HTMLElement | null>(null)

const scrollToBottom = () => {
  if (messageEndRef.value) {
    messageEndRef.value.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(scrollToBottom)
watch(messages, scrollToBottom, { deep: true })
</script>



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
