<template>
<div class="container mt-3">
  <form @submit.prevent="submit">
    <div class="mb-3">
      <label class="form-label">Title</label>
      <input type="text" class="form-control" name="title" v-model="title" />
    </div>
    <div class="mb-3">
      <label class="form-label">Description</label>
      <textarea
        class="form-control"
        name="description"
        v-model="description"
      ></textarea>
    </div>
    <div class="mb-3">
      <label class="form-label">Image</label>
      <div class="input-group-append d-flex">
        <input type="text" class="form-control" name="Image" v-model="image" />
        <ImageUpload @file-uploaded="image = $event" />
      </div>
    </div>
    <div class="mb-3">
      <label class="form-label">Price</label>
      <input type="number" class="form-control" name="price" v-model="price" />
    </div>
    <button class="btn btn-primary ">Save</button>
  </form>
</div>
</template>

<script lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import ImageUpload from "@/secure/components/ImageUpload.vue";
export default {
  name: "ProductsCreate",
  components: { ImageUpload },
  setup() {
    const title = ref("");
    const description = ref("");
    const image = ref("");
    const price = ref(0);
    const router = useRouter();
    const submit = async () => {
      await axios.post(`${process.env.VUE_APP_BASE_URL}/products`, {
        title: title.value,
        description: description.value,
        image: image.value,
        price: price.value,
      });
      await router.push("/products");
    };
    return {
      title,
      description,
      image,
      price,
      submit,
    };
  },
};
</script>
