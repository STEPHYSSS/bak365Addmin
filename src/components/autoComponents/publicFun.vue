<script>
export default {
  props: {
    defaultMode: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    // formAuto() {
    //   return this.defaultMode;
    // }
  },
  created() {
    if (JSON.stringify(this.defaultMode) !== "{}") {
      this.form = this.defaultMode;
      // console.log('-----'+ JSON.stringify(this.defaultMode) +'-----')
    }
  },
  mounted() {
    // if (JSON.stringify(this.defaultMode) !== "{}") {
    //   this.form = this.defaultMode;
    // }
  }
};
</script>