<template>
  <div class="list-popper">
    <b-form-input
      id="search"
      aria-describedby="search-table"
      placeholder="Search..."
      @input="onInput"
      trim
    ></b-form-input>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    value: Object
  },
  data() {
    return {
      searchKey: ''
    }
  },
  methods: {
    onInput(value){
      const filter = {
        type: 'subtractive',
        apply: this.search
      }
      this.searchKey = value.toLowerCase().trim();
      this.$emit('input', filter);
    },
    search(row) {
      return Object
              .values(row)
              .join()
              .toLowerCase()
              .trim().
              includes(this.searchKey)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
