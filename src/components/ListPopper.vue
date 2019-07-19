<template>
  <div class="list-popper">
    <b-button variant="danger" @click="pop">Pop</b-button>
    <b-button variant="success" @click="restore">Restore</b-button>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash';
export default {
  name: 'ListPopper',
  props: {
    text: String,
    value: Array
  },
  data() {
    return {
      set: false,
      originalValue: []
    }
  },
  created() {
    let unwatch = this.$watch(
      'value',
      function () {
        if (unwatch) {
          unwatch()
        }
        if(!this.set) {
          this.originalValue = cloneDeep(this.value)
          this.currentValue = cloneDeep(this.value)
          this.set = true;
        }
      },
      { immediate: true }
    )
  },
  methods: {
    pop() {
      this.currentValue.pop();
      this.$emit('input', this.currentValue)
    },
    restore() {
      this.currentValue = cloneDeep(this.originalValue)
      this.$emit('input', this.currentValue)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
