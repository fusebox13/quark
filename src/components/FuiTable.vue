<script>
import { BTable } from 'bootstrap-vue'
export default {
  name: "FuiTable",
  extends: BTable,
  computed: {
    computedItems() {
      // Fallback if various mixins not provided
      let nonPaginatedItems = (
        this.sortedItems ||
        this.filteredItems ||
        this.localItems ||
        []
      ).slice()
      this.$emit('transformed', nonPaginatedItems)
      return (
        this.paginatedItems ||
        this.sortedItems ||
        this.filteredItems ||
        this.localItems ||
        []
      ).slice()
    }
  }
}
</script>