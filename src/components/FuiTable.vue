<script>
import { BTable } from 'bootstrap-vue'
export default {
  name: "FuiTable",
  extends: BTable,
  computed: {
    computedItems() {
      // Fallback if various mixins not provided
      return (
        this.sortedItems ||
        this.filteredItems ||
        this.localItems ||
        []
      ).slice()
    },
  }
}
</script>