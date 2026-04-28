<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

defineProps<{
  selectedUser: any
}>()

const emit = defineEmits(['select-user'])

const users = ref<any[]>([])
const loading = ref(true)

const showOnlineOnly = ref(false)

const fetchUsers = async () => {
  try {
    const response = await axios.get('/users')
    users.value = response.data
  } catch (error) {
    console.error('Failed to fetch users:', error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchUsers)
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <div class="header-title">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
        <span class="title-text">Contacts</span>
      </div>

      <div class="filter-container">
        <label class="checkbox-label">
          <input type="checkbox" v-model="showOnlineOnly" />
          <span class="label-text">Show online only</span>
        </label>
      </div>
    </div>

    <div class="user-list">
      <div v-if="loading" class="loading">Loading users...</div>
      <button
        v-else
        v-for="user in users"
        :key="user.id"
        @click="emit('select-user', user)"
        class="user-item"
        :class="{ active: selectedUser?.id === user.id }"
      >
        <div class="avatar-container">
          <img :src="user.profilePic || '/avatar.png'" :alt="user.fullName" class="avatar" />
          <span v-if="user.online" class="online-indicator"></span>
        </div>

        <div class="user-info">
          <div class="user-name">{{ user.fullName }}</div>
          <div class="user-status">{{ user.online ? 'Online' : 'Offline' }}</div>
        </div>
      </button>

      <div v-if="!loading && users.length === 0" class="empty-list">No users found</div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  height: 100%;
  width: 5rem;
  border-right: 1px solid var(--gray-3);
  display: flex;
  flex-direction: column;
  transition: all 0.2s;
}

@media (min-width: 1024px) {
  .sidebar {
    width: 18rem;
  }
}

.sidebar-header {
  border-bottom: 1px solid var(--gray-3);
  width: 100%;
  padding: 1.25rem;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.title-text {
  font-weight: 500;
  display: none;
}

@media (min-width: 1024px) {
  .title-text {
    display: block;
  }
}

.filter-container {
  margin-top: 0.75rem;
  display: none;
  align-items: center;
  gap: 0.5rem;
}

@media (min-width: 1024px) {
  .filter-container {
    display: flex;
  }
}

.checkbox-label {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.label-text {
  font-size: 0.875rem;
}

.user-list {
  overflow-y: auto;
  width: 100%;
  padding: 0.75rem 0;
}

.user-item {
  width: 100%;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: background-color 0.2s;
}

.user-item:hover {
  background-color: var(--gray-2);
}

.user-item.active {
  background-color: var(--gray-3);
}

.avatar-container {
  position: relative;
  margin: 0 auto;
}

@media (min-width: 1024px) {
  .avatar-container {
    margin: 0;
  }
}

.avatar {
  width: 3rem;
  height: 3rem;
  object-fit: cover;
  border-radius: 9999px;
}

.online-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0.75rem;
  height: 0.75rem;
  background-color: #22c55e;
  border-radius: 9999px;
  border: 2px solid #fff;
}

.user-info {
  display: none;
  text-align: left;
  min-width: 0;
}

@media (min-width: 1024px) {
  .user-info {
    display: block;
  }
}

.user-name {
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-status {
  font-size: 0.875rem;
  color: var(--gray-6);
}

.empty-list {
  text-align: center;
  color: var(--gray-6);
  padding: 1rem 0;
}

.loading {
  text-align: center;
  padding: 1rem;
  color: var(--gray-6);
}
</style>

<style scoped>
.sidebar {
  height: 100%;
  width: 5rem;
  border-right: 1px solid var(--gray-3);
  display: flex;
  flex-direction: column;
  transition: all 0.2s;
}

@media (min-width: 1024px) {
  .sidebar {
    width: 18rem;
  }
}

.sidebar-header {
  border-bottom: 1px solid var(--gray-3);
  width: 100%;
  padding: 1.25rem;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.title-text {
  font-weight: 500;
  display: none;
}

@media (min-width: 1024px) {
  .title-text {
    display: block;
  }
}

.filter-container {
  margin-top: 0.75rem;
  display: none;
  align-items: center;
  gap: 0.5rem;
}

@media (min-width: 1024px) {
  .filter-container {
    display: flex;
  }
}

.checkbox-label {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.label-text {
  font-size: 0.875rem;
}

.user-list {
  overflow-y: auto;
  width: 100%;
  padding: 0.75rem 0;
}

.user-item {
  width: 100%;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: background-color 0.2s;
}

.user-item:hover {
  background-color: var(--gray-2);
}

.user-item.active {
  background-color: var(--gray-3);
}

.avatar-container {
  position: relative;
  margin: 0 auto;
}

@media (min-width: 1024px) {
  .avatar-container {
    margin: 0;
  }
}

.avatar {
  width: 3rem;
  height: 3rem;
  object-fit: cover;
  border-radius: 9999px;
}

.online-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0.75rem;
  height: 0.75rem;
  background-color: #22c55e;
  border-radius: 9999px;
  border: 2px solid #fff;
}

.user-info {
  display: none;
  text-align: left;
  min-width: 0;
}

@media (min-width: 1024px) {
  .user-info {
    display: block;
  }
}

.user-name {
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-status {
  font-size: 0.875rem;
  color: var(--gray-6);
}

.empty-list {
  text-align: center;
  color: var(--gray-6);
  padding: 1rem 0;
}
</style>
