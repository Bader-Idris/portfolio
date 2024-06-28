<template>
  <div class="register">
    <form class="form" @submit.prevent="register">
      <h1>Register</h1>
      <label for="user">user name</label>
      <input v-model="user" name="user" type="text" class="input" />
      <label for="email">email</label>
      <input v-model="email" name="email" type="email" class="input" />
      <label for="password">Password</label>
      <input v-model="password" name="password" type="text" class="input" />
      <!-- <button class="btn">Register</button> -->
      <button class="btn" :disabled="loading">
        <span v-if="loading">
          <CustomLoader />
        </span>
        <span v-else> Register </span>
      </button>
    </form>
    <div v-if="showPrompt" class="prompt">
      <AppLink to="/login" class="internal-link">login page</AppLink>
    </div>
  </div>
</template>

<script setup>
import CustomLoader from "@/components/CustomLoader.vue";
import { useUserStore } from "@/stores/UserNameStore";
import { ref } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const user = ref("");
const email = ref("");
const password = ref("");
const loading = ref(false);
const showPrompt = ref(false);

const register = async function () {
  loading.value = true;

  const url = "/api/v1/auth/register";
  const data = {
    name: this.user,
    email: this.email,
    password: this.password
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
    if (!response.ok) {
      if (response.status === 400) {
        toast(result.msg, {
          theme: "dark", //! light auto colored
          type: "error",
          dangerouslyHTMLString: true
        });
        // appear the login page
        this.showPrompt = true;
        // const redirectPath = this.$route.query.redirect || '/login';
        // this.$router.push(redirectPath);
      } else if (response.status === 400) {
        //! important
        // Handle already exists 400
      } else if (response.status === 401) {
        // Handle 401 Unauthorized
      } else {
        // Handle other status codes
      }
    } else {
      //response.ok ✅
      useUserStore().setUser(user);

      // Display success toast message
      toast("Successfully Registered in", {
        theme: "auto",
        type: "success",
        position: "top-center",
        dangerouslyHTMLString: true
      });

      const redirectPath = this.$route.query.redirect || "/protected";
      this.$router.push(redirectPath);
    }
  } catch (error) {
    // Handle fetch error
    console.error(error);
  }
};
</script>

<style lang="scss">
.form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;

  .input {
    border: 1px solid gray;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
  }

  .btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }
}
</style>
