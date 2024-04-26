import { defineStore } from "pinia";

export const useUserStore = defineStore(
  "user",
  {
    state: () => ({//! reactive property
      // user: null,
      user: JSON.parse(localStorage.getItem("user")) || {}
    }),
    actions: {
      setUser(user) {
        this.user = user; // Update the user data in the store
        localStorage.setItem("user", JSON.stringify(user));
      },
      clearUser() {
        this.user = {}; // Clear the user data in the store
        localStorage.removeItem("user");
      },
    },

    getters: {
      isLoggedIn: (state) => {
        return state.user && state.user.username && state.user.userId && state.user.role;
      },
    },
  }
);