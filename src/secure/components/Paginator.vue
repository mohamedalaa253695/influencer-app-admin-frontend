<template>
  <nav aria-label="...">
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" @click="prev" href="javascript:void(0)"
          >Previous</a
        >
      </li>
      <li class="page-item">
        <a class="page-link" @click="next" href="javascript:void(0)">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  name: "Paginator",
  emits: ["page-changed"],
  props: {
    lastPage: Number,
  },
  setup(props, { emit }) {
    const page = ref(1);
    const prev = async () => {
      if (page.value === 1) return;
      page.value--;
      emit("page-changed", page.value);
    };

    const next = async () => {
      if (page.value === props.lastPage) return;
      page.value++;
      emit("page-changed", page.value);
    };

    return {
      next,
      prev,
    };
  },
};
</script>
