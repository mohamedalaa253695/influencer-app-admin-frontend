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

    <div class="form-group row d-flex align-items-center">
      <label for="permissions" class="col-sm-2 col-form-label"
        >Permissions</label
      >
      <div
        class="form-check form-check-inline col-3"
        v-for="permission in permissions"
        :key="permission.id"
      >
        <input
          class="form-check-input"
          type="checkbox"
          id="inlineCheckbox1"
          :value="permission.id"
          @change="select(permission.id, $event.target.checked)"
        />
        <label class="form-check-label" for="inlineCheckbox1">{{
          permission.name
        }}</label>
      </div>
    </div>

    <button type="text" class="btn btn-primary">Submit</button>
  </form>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import router from "@/router";
export default {
  name: "RolesCreate",
  setup() {
    const name = ref("");
    const permissions = ref([]);
    const selected = ref([] as number[]);
    const router = useRouter();

    axios.post(`${process.env.VUE_APP_BASE_URL}/roles`, {
      name: name.value,
    });
    onMounted(async () => {
      const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/permissions`
      );
      permissions.value = response.data.data;
    });
    const select = (id: number, checked: boolean) => {
      if (checked) {
        selected.value = [...selected.value, id];
        return;
      }
      selected.value = selected.value.filter((s) => s !== id);
    };

    const submit = async () => {
      //   console.log(selected.value);
      await axios.post(`${process.env.VUE_APP_BASE_URL}/roles`, {
        name: name.value,
        permissions: selected.value,
      });
      await router.push("/roles");
    };

    return {
      name,
      permissions,
      select,
      submit,
    };
  },
};
</script>

<style></style>
