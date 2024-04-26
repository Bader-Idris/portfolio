<template>
  <div class="login">
    <form class="form" @submit.prevent="login">
      <h1>Login</h1>
      <div class="input-container">
        <label for="email">Email</label>
        <input v-model="email" name="email" type="text" class="input" aria-labelledby="email">
      </div>
      <div class="input-container">
        <label for="password">Password</label>
        <input v-model="password" name="password" type="password" class="input" aria-labelledby="password">
      </div>
      <button class="btn" :disabled="loading">
        <span v-if="loading">
          <CustomLoader />
        </span>
        <span v-else>
          Login
        </span>
      </button>
    </form>
  </div>
</template>

<script setup>// converted from Options API to Composition API
import CustomLoader from "@/components/CustomLoader.vue";
import { useUserStore } from '@/stores/UserNameStore';
import { ref } from 'vue';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const email = ref('');
const password = ref('');
const loading = ref(false);

const login = async () => {
  loading.value = true;

  const url = '/api/v1/auth/login';
  const data = {
    email: email.value,
    password: password.value
  };
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: "follow"
  };

  try {
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    if (response.ok) {
      const user = {
        username: result.user.name,
        userId: result.user.userId,
        role: result.user.role
      };
      useUserStore().setUser(user);

      // Display success toast message
      toast("Successfully logged in", {
        theme: "auto",
        type: "success",
        position: "top-center",
        dangerouslyHTMLString: true
      });
      const redirectPath = $route.query.redirect || '/protected';
      $router.push(redirectPath);
    } else {
      const redirectPath = $route.query.redirect || '/failed';
      $router.push(redirectPath);
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

</script>

<style lang="scss">
.login {
  @include inTheMiddle;
  .form {
    width: 384px;
    height: 520px;
    position: relative;
    display: flex;
    margin: auto;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    @include softForm;
    h1 {
      text-align: center;
      margin-bottom: 50px;
    }
    .input-container {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;

      label {
        margin-bottom: 5px;
      }
      .input {
        border: 1px solid gray;
        padding: 10px;
        border-radius: 5px;
      }
    }
    .btn {
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: 500;
      font-size: 20px;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-top: 50px;
      span {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
      }
    }
  }
}

</style>
