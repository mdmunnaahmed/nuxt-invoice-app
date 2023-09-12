<template>
  <div>
    <div v-if="!mobile" class="app flex">
      <navigation></navigation>
      <div class="app-content flex flex-column">
        <InvoiceModal />
        <slot />
      </div>
    </div>
    <div v-else class="mobile-message flex flex-column">
      <h2>Sorry, this app is not supported on Mobile Devices</h2>
      <p>to use this app please use a computer</p>
    </div>
  </div>
</template>

<script>
import Navigation from "~/components/Navigation.vue";
export default {
  components: { Navigation },

  data() {
    return {
      mobile: null,
    };
  },
  methods: {
    checkScreen() {
      const windowWidth = window.innerWidth;
      if (windowWidth <= 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
    },
  },
  computed: {},
  mounted() {
    this.checkScreen();
    window.addEventListener("resize", this.checkScreen);
  },
};
</script>