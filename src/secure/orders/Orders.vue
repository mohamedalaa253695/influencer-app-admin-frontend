<template>
  <div class="d-flex justify-content-between my-3">
    <h2>Users</h2>
    <a
      to="orders/export"
      href="javascript:void(0)"
      @click="exportFile"
      class="btn btn-primary"
      >Export</a
    >
  </div>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Total</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.first_name }} {{ order.last_name }}</td>
          <td>{{ order.email }}</td>
          <td>{{ order.total }}</td>
          <td>Action</td>
          <td>
            <div class="btn-group mr-2">
              <router-link
                :to="`/orders/${order.id}`"
                class="btn btn-sm btn-outline-secondary"
                >View
              </router-link>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Paginator :last-page="lastPage" @page-changed="load($event)"></Paginator>
</template>

<script>
import axios from "axios";
import Paginator from "../components/Paginator.vue";
import { ref, onMounted } from "vue";
export default {
  name: "Orders",
  components: { Paginator },
  setup() {
    const orders = ref([]);
    const lastPage = ref(0);

    const load = async (page = 1) => {
      const response = await axios.get(`orders?page=${page}`);
      orders.value = response.data.data;
      lastPage.value = response.data.meta.last_page;
    };
    onMounted(load);

    const exportFile = async () => {
      const response = await axios.get("orders/export", {
        responseType: "blob",
      });
      const blob = new Blob([response.data], { type: "text/csv" });
      const downloadUrl = window.URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "orders.csv";
      link.click();
    };
    return {
      orders,
      lastPage,
      load,
      exportFile,
    };
  },
};
</script>

<style></style>
