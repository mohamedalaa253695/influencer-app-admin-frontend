<template>
  <form @submit.prevent="submit">
    <div class="mb-3">
      <label for="firstName" class="form-label">First Name</label>
      <input
        type="text"
        name="first_name"
        v-model="firstName"
        class="form-control"
        id="firstName"
        aria-describedby="emailHelp"
      />
    </div>
    <div class="mb-3">
      <label for="lastName" class="form-label">Last Name</label>
      <input
        type="text"
        name="last_name"
        v-model="lastName"
        class="form-control"
        id="lastName"
        aria-describedby="emailHelp"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email address</label>
      <input
        type="email"
        name="email"
        v-model="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Role</label>
      <select
        class="form-select"
        name="role_id"
        v-model="roleId"
        aria-label="Default select example"
      >
        <option value="0">Select Role</option>
        <option v-for="role in roles" :key="role.id" :value="role.id">
          {{ role.name }}
        </option>
      </select>
    </div>

    <button type="text" class="btn btn-primary">Submit</button>
  </form>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
export default {
  name: "UsersCreate",
  setup() {
    const firstName = ref("");
    const lastName = ref("");
    const email = ref("");
    const roleId = ref(0);
    const roles = ref([]);
    const router = useRouter();
    onMounted(async () => {
      const response = await axios.get("roles");
      roles.value = response.data.data;
    });
    const submit = async () => {
      await axios.post("users", {
        first_name: firstName.value,
        last_name: lastName.value,
        email: email.value,
        role_id: roleId.value,
      });
      await router.push("/users");
    };
    return {
      firstName,
      lastName,
      email,
      roleId,
      roles,
      submit,
    };
  },
};
</script>

<style>
</style>