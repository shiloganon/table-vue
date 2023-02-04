<template>
  <main class="home-page-container">
    <div class="search-container">
      <h2>Search by order ID / order name</h2>
      <input class="input" type="text" @input="onSearch($event.target.value)" />
    </div>
    <OrdersTable
      v-if="filteredOrders.length"
      :orders="filteredOrders"
      :key="key"
      @removeOrder="removeOrder"
      @addOrder="addOrder"
    />
  </main>
  <div v-if="!this.filteredOrders.length" class="no-orders">There are no orders to display.</div>
</template>

<script>
import ordersService from "../services/orders-service";
import OrdersTable from "./OrdersTable.vue";

export default {
  data() {
    return {
      allOrders: [],
      filteredOrders: [],
      key: 1,
    };
  },
  mounted() {
    this.allOrders = ordersService.getOrders();
    this.filteredOrders = this.allOrders;
  },
  methods: {
    addOrder(newOrder) {
      this.filteredOrders.unshift(newOrder);
      this.key++;
    },
    removeOrder(orderToRemove) {
      this.filteredOrders = ordersService.removeOrder(this.filteredOrders, orderToRemove);
      this.key++;
    },
    onSearch(val) {
      this.filteredOrders = ordersService.getFilteredOrders(this.allOrders, val);
      this.key++;
    },
  },

  components: {
    OrdersTable,
  },
};
</script>
