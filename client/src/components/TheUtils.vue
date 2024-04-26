<template>
  <div class="utils">
    <p v-if="isLoggedIn">Hello {{ userStore.user.username }}</p>
    <AppLink v-if="!isLoggedIn" to="/register">Register</AppLink>
    <AppLink v-if="!isLoggedIn" to="/login">Login</AppLink>
    <button v-if="isLoggedIn" @click="logout" class="logout">Logout</button>
  </div>
</template>

<script setup>// converted from Options API to Composition API
import { useUserStore } from '@/stores/UserNameStore';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const userStore = useUserStore();
const isLoggedIn = computed(() => userStore.isLoggedIn);

const logout = async () => {
  const url = '/api/v1/auth/logout';
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: JSON.stringify({ userId: userStore.user.userId }),
    redirect: 'follow'
  };

  try {
    const response = await fetch(url, requestOptions);
    const result = await response.text();
    if (response.ok) {
      userStore.clearUser();
      toast("Successfully logged out", {
        theme: "auto",
        type: "success",
        position: "top-center",
        dangerouslyHTMLString: true
      });
      // router.push('/login'); // You can use the router directly
    } else {
      console.error('Logout failed:', result);
    }
  } catch (error) {
    console.error(error);
  }
};

// Initialize user from localStorage
userStore.user = JSON.parse(localStorage.getItem('user')) || {};
</script>

<style lang="scss" scoped>
.utils {
  width: 100%;
  height: 40px;
  background: #011627;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  justify-content: flex-end;
  * {
    font-size: 16px;
    color: white;
    width: fit-content;
    padding: 10px;
  }
  a {}
  .logout {
    width: fit-content;
    background: #61488e3b;
    color: #007bff;
    font-weight: bold;
    margin: 0 10px 0 15px;
    cursor: pointer;
    border: none;
    border-radius: 10px;
    padding: 5px;
    transition: opacity 0.3s ease;
    &:hover {
      opacity: 0.3;
      background-color: white;
      color: #000dff;
      transition: 0.3 ;
    }
  }
}
</style>