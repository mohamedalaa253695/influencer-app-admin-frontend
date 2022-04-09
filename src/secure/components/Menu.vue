<template>
<div class="container mt-3">

    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse mt-3">
      <div class="position-sticky pt-3">
        <ul class="nav flex-column">
          <li class="nav-item">
            <router-link
              to="/dashboard"
              active-class="active"
              class="nav-link"
              aria-current="page"
            >
              <span data-feather="home"></span>
              Dashboard
            </router-link>
          </li>
          <li class="nav-item" v-if="user.canView('users')">
            <router-link
              to="/users"
              active-class="active"
              class="nav-link"
              aria-current="page"
            >
              <span data-feather="users"></span>
              Users
            </router-link>
          </li>
          <li class="nav-item" v-if="user.canView('roles')">
            <router-link
              to="/roles"
              active-class="active"
              class="nav-link"
              aria-current="page"
            >
              <span data-feather="roles"></span>
              Roles
            </router-link>
          </li>
          <li class="nav-item" v-if="user.canView('products')">
            <router-link
              to="/products"
              active-class="active"
              class="nav-link"
              aria-current="page"
            >
              <span data-feather="products"></span>
              Products
            </router-link>
          </li>
          <li class="nav-item" v-if="user.canView('orders')">
            <router-link
              to="/orders"
              active-class="active"
              class="nav-link"
              aria-current="page"
            >
              <span data-feather="orders"></span>
              Orders
            </router-link>
          </li>
        </ul>
      </div>
    </nav>

</div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "Menu",
  setup() {
    const store = useStore();
    const user = computed(() => store.state.User.user);
    console.log(user);
    return {
      user,
    };
  },
};
</script>
<style scoped></style>
