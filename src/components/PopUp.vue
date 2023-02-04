<template>
  <div class="modal-card modal-container">
    <header class="modal-card-head">
      <p class="modal-card-title">Modal title</p>
      <button class="delete" aria-label="close" @click="closeModal" />
    </header>
    <div class="modal-card-body">
      <section v-if="orderDetailsToDisplay">
        <section v-for="item in orderDetailsToDisplay" :key="item">
          <section v-for="key in Object.keys(item)" :key="key">{{ key }} - {{ item[key] }}</section>
        </section>
      </section>

      <section v-else v-for="(key, index) in Object.keys(newOrder)" :key="index">
        <section>{{ key }} : </section>
        <input class="input" @input="onInputChange($event.target.value, key)" type="text" :value="newOrder[key]" />
      </section>
    </div>
    <footer class="modal-card-foot">
      <button v-if="!orderDetailsToDisplay" class="button success" @click="saveOrder">Save changes</button>
      <button class="button close" @click="closeModal">Cancel</button>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    order: Object,
    orderToUpdate: Object,
    orderDetailsToDisplay: Object,
  },
  data() {
    return {
      newOrder: {},
    };
  },
  mounted() {
    this.createEmptyOrder();
  },
  methods: {
    createEmptyOrder() {
      this.newOrder = {};
      if (this.orderToUpdate) {
        this.newOrder = { ...this.orderToUpdate };
      } else {
        Object.keys(this.order).forEach((key) => (this.newOrder[key] = "-"));
      }
    },
    onInputChange(val, key) {
      this.newOrder[key] = val;
    },
    closeModal() {
      this.$emit("closeModal");
    },
    saveOrder() {
      this.$emit("addOrder", this.newOrder);
    },
  },
};
</script>
