<template>
  <span class="th-container">
    <img @click="sortBy(thName, 'minus')" src="../assets/imgs/arrow-down.png" class="sort-arrow" alt="" />
    <span> {{ formatCell(thName) }}</span>
    <img @click="sortBy(thName, 'plus')" src="../assets/imgs/arrow-up.png" class="sort-arrow" alt="" />
  </span>
</template>

<script>
import utilService from "../services/util-service";

export default {
  props: {
    thName: String,
  },

  methods: {
    formatCell(val) {
      return utilService.formatCell(val, "th");
    },
    sortBy(thName, symbol) {
      this.$emit("sortBy", thName, symbol);
    },
  },
};
</script>
