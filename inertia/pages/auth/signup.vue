<script setup lang="ts">
import { Form } from '@adonisjs/inertia/vue'
</script>

<template>
  <div class="form-container">
    <div>
      <h1>Signup</h1>
      <p>Enter your details below to create your account</p>
    </div>

    <div>
      <Form route="new_account.store" #default="{ processing, errors }">
        <div>
          <label class="block" for="fullName">Full name</label>
          <input
            class="w-full"
            type="text"
            name="fullName"
            id="fullName"
            :data-invalid="errors.fullName ? 'true' : undefined"
          />
          <div v-if="errors.fullName">{{ errors.fullName }}</div>
        </div>

        <div>
          <label class="block" for="email">Email</label>
          <input
            class="w-full"
            type="email"
            name="email"
            id="email"
            autocomplete="email"
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
            autocomplete="new-password"
            :data-invalid="errors.password ? 'true' : undefined"
          />
          <div v-if="errors.password">{{ errors.password }}</div>
        </div>

        <div>
          <label class="block" for="passwordConfirmation">Confirm password</label>
          <input
            class="w-full"
            type="password"
            name="passwordConfirmation"
            id="passwordConfirmation"
            autocomplete="new-password"
            :data-invalid="errors.passwordConfirmation ? 'true' : undefined"
          />
          <div v-if="errors.passwordConfirmation">{{ errors.passwordConfirmation }}</div>
        </div>

        <div>
          <button type="submit" class="button" :disabled="processing">Sign up</button>
        </div>
      </Form>
    </div>
  </div>
</template>
