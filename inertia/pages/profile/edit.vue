<script setup lang="ts">
import { useForm, usePage } from '@inertiajs/vue3'

const page = usePage()
// On récupère l'utilisateur connecté via les props globales d'Inertia
const user = page.props.auth.user

const form = useForm({
  avatar: null as File | null,
})

// Cette fonction met à jour le formulaire quand on choisit un fichier
const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files) {
    form.avatar = target.files[0]
  }
}

const submit = () => {
  // On utilise PATCH vers la route définie dans start/routes.ts
  form.patch('/profile', {
    onSuccess: () => {
      form.reset()
      alert('Avatar mis à jour !')
    },
  })
}
</script>

<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-xl font-bold mb-4">Paramètres du profil</h1>

    <div class="mb-6 flex items-center gap-4">
      <div class="w-16 h-16 rounded-full bg-gray-200 overflow-hidden border">
        <img v-if="user.profilePic" :src="user.profilePic" class="w-full h-full object-cover" />
        <div v-else class="w-full h-full flex items-center justify-center text-gray-400">?</div>
      </div>
      <div>
        <p class="font-medium">{{ user.fullName }}</p>
        <p class="text-sm text-gray-500">{{ user.email }}</p>
      </div>
    </div>

    <form @submit.prevent="submit" class="space-y-4">
      <div>
        <label class="block text-sm mb-1">Changer la photo de profil</label>
        <input type="file" @change="onFileChange" accept="image/*" class="w-full text-sm" />
      </div>

      <button
        type="submit"
        :disabled="form.processing || !form.avatar"
        class="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
      >
        {{ form.processing ? 'Envoi en cours...' : 'Enregistrer' }}
      </button>
    </form>
  </div>
</template>
