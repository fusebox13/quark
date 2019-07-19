<template>
  <div class="parent">
    Parent
  </div>
</template>

<script>
export default {
  name: 'Parent',
  created() {
    this.doSomething()
  },
  methods: {
    print() {
      console.log("Parent")
    },
    doSomething() {
      this.print()
    }
  }
}
</script>
