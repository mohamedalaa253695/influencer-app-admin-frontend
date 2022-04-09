<template>
  <form @submit.prevent="submit">
    <div class="mb-3">
      <label for="firstName" class="form-label">Name</label>
      <input
        type="text"
        name="name"
        v-model="name"
        class="form-control"
        id="firstName"
        aria-describedby="RoleName"
      />
    </div>

    <div class="form-group d-flex-column">
      <label class="col-sm-2 col-form-label">Permissions</label>
      <div class="col-sm-10 ms-3">
        <div
          class="form-check form-check-inline col-3"
          v-for="permission in permissions"
          :key="permission.id"
        >
          <input
            class="form-check-input"
            type="checkbox"
            :value="permission.id"
            :checked="checked(permission.id)"
            @change="select(permission.id, $event.target.checked)"
          />
          <label class="form-check-label">{{ permission.name }}</label>
        </div>
      </div>
    </div>

    <button type="text" class="btn btn-primary">Submit</button>
  </form>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import router from "@/router";
import { Role } from "@/classes/role";
export default {
  name: "RolesEdit",
  setup() {
    const name = ref("");
    const permissions = ref([]);
    const selected = ref([] as number[]);
    const router = useRouter();
    const { params } = useRoute();
    onMounted(async () => {
      const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/permissions`
      );
      permissions.value = response.data.data;
      const roleCall = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/roles/${params.id}`
      );
      const role: Role = roleCall.data.data;
      name.value = role.name;
      selected.value = role.permissions.map((p) => p.id);
    });
    const select = (id: number, checked: boolean) => {
      if (checked) {
        selected.value = [...selected.value, id];
        return;
      }
      selected.value = selected.value.filter((s) => s !== id);
    };
    const submit = async () => {
      await axios.put(`${process.env.VUE_APP_BASE_URL}/roles/${params.id}`, {
        name: name.value,
        permissions: selected.value,
      });
      await router.push("/roles");
    };
    const checked = (id: number) => selected.value.some((s) => s === id);
    return {
      name,
      permissions,
      select,
      submit,
      checked,
    };
  },
};
</script>

<style></style>
