<template>
  <header
    class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow"
  >
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#"
      >Company name</a
    >

    <div class="navbar-nav">
      <div class="nav-item text-nowrap">
        <a class="nav-link px-3" href="javascript:void(0)" @click="logout"
          >Sign out</a
        >
      </div>
    </div>
  </header>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "Header",

  setup() {
    const router = useRouter();
    const logout = () => {
      localStorage.clear();
      router.push("/login");
    };

    return {
      logout,
    };
  },
};
</script>

<style>
</style>