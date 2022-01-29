<template>
  <div class="d-flex justify-content-between my-3">
    <h2>products</h2>
    <router-link to="/products/create" class="btn btn-primary"
      >create Product</router-link
    >
  </div>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">image</th>
          <th scope="col">title</th>
          <th scope="col">description</th>
          <th scope="col">price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>
            <img :src="product.image" height="50" :alt="product.title" />
          </td>
          <td>{{ product.title }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.price }}</td>
          <td>
            <div class="btn-group mr-2">
              <router-link
                :to="`/products/${product.id}/edit`"
                class="btn btn-sm btn-outline-secondary"
                @click="alert('hi')"
                >Edit
              </router-link>
              <a
                href="javascript:void(0)"
                class="btn btn-sm btn-outline-secondary"
                @click="del(product.id)"
              >
                Delete</a
              >
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Paginator :last-page="lastPage" @page-changed="load($event)"></Paginator>
</template>

<script lang="ts">
// import { onMounted } from "@vue/runtime-core";
import { ref, onMounted } from "@vue/runtime-core";
import axios from "axios";
import { User } from "@/classes/user";
import { Entity } from "@/interfaces/entity";
import router from "@/router";
import { useRouter } from "vue-router";
import Paginator from "@/secure/components/Paginator.vue";

export default {
  name: "Products",
  components: { Paginator },
  setup() {
    const products = ref([]);
    const lastPage = ref(0);
    const router = useRouter();

    const load = async (page = 1) => {
      const response = await axios.get(`products?page=${page}`);
      products.value = response.data.data;

      lastPage.value = response.data.meta.last_page;
    };

    const del = async (id: number) => {
      if (confirm("Are you sure you want to delete that product?")) {
        await axios.delete(`products/${id}`);
        products.value = products.value.filter((e: Entity) => e.id !== id);
      }
    };

    onMounted(load);

    return {
      products,
      lastPage,
      load,
      del,
    };
  },
};
</script>

<style>
</style>