<script setup lang="ts">
import { Form } from '@adonisjs/inertia/vue'
</script>

<template>
  <div class="form-container">
    <div>
      <h1>Login</h1>
      <p>Enter your details below to login to your account</p>
    </div>

    <div>
      <Form route="session.store" #default="{ processing, errors }">
        <div class="block">
          <label class="block" for="email">Email</label>
          <input
            class="w-full"
            type="email"
            name="email"
            id="email"
            autocomplete="username"
            :data-invalid="errors.email ? 'true' : undefined"
          />
          <div v-if="errors.email">{{ errors.email }}</div>
        </div>

        <div>
          <label class="block" for="password">Password</label>
          <input
            class="w-full"
            type="password"
            name="password"
            id="password"
            autocomplete="current-password"
            :data-invalid="errors.password ? 'true' : undefined"
          />
          <div v-if="errors.password">{{ errors.password }}</div>
        </div>
        <div class="flex items-center gap-5">
          <label class="block" for="remember">Se souvenir de moi</label>
          <input type="checkbox" name="remember" id="remember" />
        </div>

        <div>
          <button type="submit" class="button" :disabled="processing">Login</button>
        </div>
      </Form>
    </div>
  </div>
</template>
