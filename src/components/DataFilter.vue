<template>
  <div class="data-filter">
    <b-form-select v-model="selected" @input="onInput" multiple class="mb-3">
      <option :value="null">Please select an option</option>
      <optgroup v-for="(group, index) in filterGroups" :label="group.name" :key="index">
        <option v-for="(filter, index) in group.filters" :key="index" :value="filter">{{filter}}</option>
      </optgroup>
    </b-form-select>
  </div>
</template>

<script>

export default {
  name: 'DataFilter',
  props: {
    value: Object,
    data: Array
  },
  data() {
    return {
      set: false,
      originalValue: [],
      selected: [],
      filterGroups: []
    }
  },
  created() {
    this.filterGroups = this.extractFilterGroups(this.data)
  },
  methods: {
    //Init
    extractFilterGroups(value) {
      let filterGroups = []
      let keys = Object.keys(value[0])
      
      keys.forEach(key => {
        let group = {name: key, filters: new Set()}
        value.forEach(item => {
          group.filters.add(item[key])
        })
        filterGroups.push(group)
      });

      return filterGroups
    },
    //Filter Methods
    filter(row) {
      let remove = false;

      this.selected.forEach(option => {
        if(Object.values(row).join('').toLowerCase().trim().includes(option.toLowerCase().trim())){
          remove = true;
        }
      });
    
      return remove;
    },
    clear() {
      return true;
    },
    //Event Callbacks
    onInput(value) {
      const filter = {
        type: 'additive',
        apply: value.includes(null)?this.clear:this.filter
      }
      this.$emit('input', filter);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
