<template>
  <div class="Child">
    Child
  </div>
</template>

<script>
import Parent from './Parent'
export default {
  name: 'Child',
  extends: Parent,
  created() {
    console.log("Child Created");
  },
  methods: {
    print() {
      console.log("Child");
    }
  }
}
</script>
