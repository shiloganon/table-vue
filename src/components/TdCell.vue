<template>
  <span
    v-if="orderKey === 'line_items' || orderKey === 'transactions'"
    @click="onOpenLineItemsModal($event, order, orderKey)"
    class="line-items-td"
    >Click to reveal additional details</span
  >
  <span v-else>{{ formatCell(order[orderKey]) }}</span>
</template>

<script>
import utilService from "../services/util-service";

export default {
  props: {
    orderKey: String,
    order: Object,
  },
  mounted() {},
  methods: {
    formatCell(val) {
      return utilService.formatCell(val, "td");
    },
    onOpenLineItemsModal(ev, order, orderKey) {
      ev.stopPropagation();
      this.$emit("onOpenLineItemsModal", order, orderKey);
    },
  },
};
</script>
