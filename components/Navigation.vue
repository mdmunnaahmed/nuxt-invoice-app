<template>
  <div style="background: #1e2139">
    <header class="flex">
      <div class="branding flex">
        <img src="../assets/file-invoice-dollar-solid.png" alt="jai na" />
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "navigation",
};
</script>

<style lang="scss" scoped>
header {
  position: relative;
  z-index: 99;
  flex-direction: row;
  background: #1e2139;
}
.branding {
  border-radius: 0 10px 10px 0;
  background: #7c5dfa;
  justify-content: center;
  padding: 18px 22px;
  img {
    width: 32px;
    height: auto;
  }
}
</style>