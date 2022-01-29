<template>
  <div class="d-flex justify-content-between my-3">
    <h2>Users</h2>
    <a to="orders/export" href="javascript:void(0)" class="btn btn-primary"
      >Export</a
    >
  </div>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Product Title</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orderItems" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.product_title }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.quantity }}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
export default {
  name: "OrderItems",
  setup() {
    const orderItems = ref([]);
    const { params } = useRoute();
    onMounted(async () => {
      const response = await axios.get(`orders/${params.id}`);
      orderItems.value = response.data.data.order_items;
    });
    return {
      orderItems,
    };
  },
};
</script>

<style></style>
