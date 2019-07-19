<template>
  <div>
    <div id="cog"><font-awesome icon="cog" size="lg" /></div>
    <b-popover id="configurer" target="cog" triggers="click blur">
      <template slot="title">Show/Hide</template>
        <b-form-group>
          <b-form-checkbox-group
            id="checkbox-group-1"
            v-model="selected"
            :options="options"
            @input="onInput"
            name="flavour-1"
            stacked
          ></b-form-checkbox-group>
        </b-form-group>
    </b-popover>
  </div>
</template>

<script>
export default {
  name: 'TableConfigurer',
  props: {
    value: Array,
    fields: Array
  },
  data() {
    return {
      selected: [], // Must be an array reference!
      options: []
    }
  },
  created() {
    this.fields.forEach(field => {
      if(field.label.length > 0) {
        let option = {text: field.label.charAt(0).toUpperCase() + field.label.slice(1), value: field}
        this.options.push(option);
      }
    });
    this.selected = this.value;
  },
  methods: {
    onInput(value){
      let actionsIndex = this.selected.findIndex(element => {
        return typeof element === 'object' && element.key === "actions"
      });
      let temp = value[value.length - 1]
      value[value.length - 1] = this.selected[actionsIndex];
      value[actionsIndex] = temp;
      console.log(value);
      this.$emit('input', value);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#cog {
    color: lightgrey;
    cursor: pointer;
    &:hover {
      color: darkgrey;
    }
  }

</style>
