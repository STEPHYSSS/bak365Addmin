<template>
  <header class="app-header navbar">
    <slot></slot>
  </header>
</template>
<script>
export default {
  created () {
    this._navbar = true
  }
}
</script>
