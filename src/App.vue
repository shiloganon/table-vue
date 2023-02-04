<template>
  <HomePage v-if="isAccess" />
  <div v-else class="renovations">
    <h2>The website is undergoing renovations.</h2>
    <img src="./assets/imgs/renovation.jpg" alt="" />
  </div>
</template>

<script>
import HomePage from "./components/HomePage.vue";
import ordersService from "./services/orders-service";

export default {
  name: "App",
  data() {
    return {
      isAccess: true,
    };
  },
  async mounted() {
    this.isAccess = await ordersService.checkAccess();
  },
  components: {
    HomePage,
  },
};
</script>
