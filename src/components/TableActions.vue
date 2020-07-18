<template>
  <div>
    <b-dropdown size="lg"  variant="link" toggle-class="text-decoration-none" no-caret>
      <template v-slot:button-content>
        <div id="actions"><font-awesome icon="ellipsis-v" /></div>
      </template>
      <b-dropdown-item 
        v-for="(action,index) in actions" 
        :key="index" @click="doAction(action)">{{action.name}}</b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
export default {
  name: 'TableActions',
  props: {
    actions: {
      type: Array,
    },
    item: {
      type: Object
    }
  },
  methods: {
    doAction(action) {
      action.callback(this.item);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
