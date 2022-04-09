<template>
  <header
    class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow"
  >
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#" >
      <img src="../../assets/images/affliate-logo.png" style="width:150px; hieght:150px;" alt="">
      </a>

    <div class="navbar-nav">
      <div class="nav-item text-nowrap d-flex">
        <div class="text-white">
          <router-link
            to="/profile"
            class="nav-link px-3 text-white border rounded opacity-75"
            >{{ user.name }}
          </router-link>
        </div>
        <a
          class="nav-link text-white px-3"
          href="javascript:void(0)"
          @click="logout"
          >Sign out</a
        >
      </div>
    </div>
  </header>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "Header",
  setup() {
    const router = useRouter();
    const sotre = useStore();

    const user = computed(() => sotre.state.User.user);
    const logout = () => {
      localStorage.clear();
      router.push("/login");
    };

    return {
      logout,
      user,
    };
  },
};
</script>

<style></style>
