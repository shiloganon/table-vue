<template>
  <div class="table-container" :style="{ pointerEvents: isModalShown ? 'none' : '' }">
    <table v-if="ordersToShow.length" class="table">
      <thead>
        <tr>
          <th />
          <th v-for="key in Object.keys(ordersToShow[0])" :key="key">
            <ThCell :thName="key" @sortBy="sortBy" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in ordersToShow" :key="order.order_ID" @click="updateOrder(order)">
          <td @click="removeOrder(order)">X</td>
          <td v-for="(key, index) in Object.keys(order)" :key="index">
            <TdCell :order="order" :orderKey="key" @onOpenLineItemsModal="onOpenLineItemsModal" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="pagination-and-add-order">
    <section>
      <img @click="previousPage()" src="../assets/imgs/minus.png" alt="" />
      <h1>{{ currPage }}</h1>
      <img @click="nextPage()" src="../assets/imgs/plus.png" alt="" />
    </section>

    <button @click="isModalShown = true" class="button is-success">add new order</button>
  </div>

  <PopUp
    v-if="isModalShown"
    @addOrder="addOrder"
    @closeModal="closeModal"
    :order="ordersToShow[0]"
    :orderToUpdate="orderToUpdate"
    :orderDetailsToDisplay="orderDetailsToDisplay"
  />
</template>

<script>
import ordersService from "../services/orders-service";
import PopUp from "./PopUp.vue";
import ThCell from "./ThCell.vue";
import TdCell from "./TdCell.vue";

export default {
  props: {
    orders: Array,
  },
  data() {
    return {
      ordersToShow: [],
      pages: 0,
      currPage: 1,
      sortOrder: 1,
      isModalShown: false,
      orderToUpdate: null,
      orderDetailsToDisplay: null,
    };
  },
  mounted() {
    this.ordersToShow = ordersService.getOrdersToShow(this.orders, this.currPage);
    this.pages = Math.ceil(this.orders.length / 10);
  },
  methods: {
    sortBy(key, symbol) {
      this.ordersToShow.sort((a, b) => {
        if (symbol === "plus") return ordersService.sortByBigToSmall(a, b, key);
        else return ordersService.sortBySmallToBig(a, b, key);
      });
    },
    nextPage() {
      if (this.currPage === this.pages) this.currPage = 1;
      else this.currPage++;

      this.ordersToShow = ordersService.getOrdersToShow(this.orders, this.currPage);
    },
    previousPage() {
      this.currPage--;
      this.ordersToShow = ordersService.getOrdersToShow(this.orders, this.currPage);
    },
    closeModal() {
      this.orderToUpdate = null;
      this.orderDetailsToDisplay = null;
      this.isModalShown = false;
    },
    onOpenLineItemsModal(order, key) {
      this.orderDetailsToDisplay = order[key];
      this.isModalShown = true;
    },
    addOrder(newOrder) {
      if (this.orderToUpdate) this.removeOrder(this.orderToUpdate);

      this.isModalShown = false;
      this.$emit("addOrder", newOrder);
    },
    removeOrder(order) {
      this.$emit("removeOrder", order);
    },
    updateOrder(order) {
      this.orderToUpdate = order;
      this.isModalShown = true;
    },
  },
  components: {
    PopUp,
    ThCell,
    TdCell,
  },
};
</script>
