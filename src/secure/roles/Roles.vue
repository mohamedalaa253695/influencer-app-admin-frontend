<template>
  <div class="d-flex justify-content-between my-3">
    <h2>roles</h2>
    <router-link
      to="/roles/create"
      class="btn btn-primary"
      v-if="AuthenticatedUser.canEdit('roles')"
      >create Role</router-link
    >
  </div>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="role in roles" :key="role.id">
          <td>{{ role.id }}</td>
          <td>{{ role.name }}</td>
          <td>
            <div
              class="btn-group mr-2"
              v-if="AuthenticatedUser.canEdit('roles')"
            >
              <router-link
                :to="`/roles/${role.id}/edit`"
                class="btn btn-sm btn-outline-secondary"
                >Edit</router-link
              >
              <a
                href="javascript:void(0)"
                class="btn btn-sm btn-outline-secondary"
                @click="del(role.id)"
                >Delete</a
              >
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <nav aria-label="...">
    <ul class="pagination">
      <li class="page-item">
        <a
          class="page-link"
          @click="prev"
          href="javascript:void(0)"
          tabindex="-1"
          >Previous</a
        >
      </li>
      <li class="page-item">
        <a class="page-link" @click="next" href="javascript:void(0)">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
// import { onMounted } from "@vue/runtime-core";
import { ref, onMounted, computed } from "@vue/runtime-core";
import axios from "axios";
// import { User } from "@/classes/user";
import { Entity } from "@/interfaces/entity";
import { useStore } from "vuex";

export default {
  name: "Roles",
  setup() {
    const roles = ref([]);
    const page = ref(1);
    const lastPage = ref(0);
    const store = useStore();

    const AuthenticatedUser = computed(() => store.state.User.user);

    const load = async () => {
      const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/roles?page=${page.value}`
      );
      roles.value = response.data.data;
      console.log(roles.value);

      if (response.data.meta !== undefined) {
        lastPage.value = response.data.meta.last_page;
      }
    };

    const prev = async () => {
      if (page.value == 1) return;
      page.value--;
      await load();
    };

    const next = async () => {
      if (page.value == lastPage.value) return;
      page.value++;
      await load();
    };

    const del = async (id: number) => {
      if (confirm("Are you sure you want to delete that role?")) {
        await axios.delete(`${process.env.VUE_APP_BASE_URL}/roles/${id}`);
        roles.value = roles.value.filter((e: Entity) => e.id !== id);
      }
    };
    onMounted(() => {
      load();
    });
    return {
      roles,
      next,
      prev,
      del,
      AuthenticatedUser,
    };
  },
};
</script>

<style></style>
