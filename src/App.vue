<template>
  <div id="app">
    <nav class="table-controls">
      <Search v-model="filter"/>
      <DataFilter v-model="filter" :data="items"/>
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </nav>
    <section id="table"> 
      <b-table
        v-model="model"
        ref="table" 
        hover 
        responsive
        id="my-table"
        :fixed="false"
        selectedVariant="secondary"
        :per-page="perPage"
        :current-page="currentPage" 
        :fields="fields"
        :items="items" 
        :filter="filter"
        :filter-function="filterFunction"
        @filtered="onFiltered"
      >
      <template slot="HEAD_bulk" slot-scope="header" v-if="hasMixin('multiselectable')">
        <b-form-checkbox
          v-model="header.headerSelected"
          @input="onHeaderSelected(header)"
          :unchecked-value="false"
        ></b-form-checkbox>
      </template>

      <template slot="bulk" slot-scope="row" v-if="hasMixin('multiselectable')">
        <b-form-checkbox
          v-model="rowStateMap[row.index]"
          @input="onRowSelected(row)"
          :unchecked-value="false"
        ></b-form-checkbox>
      </template>

      <template slot="HEAD_actions" v-if="hasMixin('actionable')">
        <TableConfigurer id="cog-component" v-model="fields" :fields="fields"/> 
      </template>

      <template slot="actions" slot-scope="row" v-if="hasMixin('actionable')">
        <TableActions :item="row.item" :actions="actions"></TableActions>
      </template>
      </b-table>          
    </section>
    <router-view/>
  </div>
</template>

<script>
import Search from '@/components/Search'
import DataFilter from '@/components/DataFilter'
import FuiTable from '@/components/FuiTable'
import TableConfigurer from '@/components/TableConfigurer'
import TableActions from '@/components/TableActions'
import Child from '@/components/Child';
import Parent from '@/components/Parent';
import Filterable from '@/mixins/Filterable.mixin';
import Pageable from '@/mixins/Pageable.mixin';
import MultiSelectable from '@/mixins/MultiSelectable.mixin';
import Actionable from '@/mixins/Actionable.mixin';
import Vue from 'vue';

export default {
  name: 'app',
  mixins: [ Filterable, Pageable, MultiSelectable, Actionable ],
  components: {
    Search,
    FuiTable,
    DataFilter,
    TableConfigurer,
    TableActions,
    Child,
    Parent
  },
  data() {
    return {
      actions: [
        {name: 'Log', callback: (item) => console.log(item) },
        {name: 'Alert', callback: (item) => alert(item.name) }, 
      ],
      fields: [
        { key: 'name', label: 'name', sortable: true },
        { key: 'city', label: 'city', sortable: true },
        { key: 'state', label: 'state', sortable: true },
        { key: 'country', label: 'country', sortable: true },
        { key: 'color', label: 'color', sortable: true },
        { key: 'food', label: 'food', sortable: true },
        { key: 'movie', label: 'movie', sortable: true },
        { key: 'address', label: 'address', sortable: true },
        { key: 'actions', label: '', class: 'actions' }
      ],
      items: [
        {name: 'Dan', city: 'Ann Arbor', state: 'MI', country: 'USA', color: 'blue', food: 'tacos', movie: 'Forest Gump', address: 'No. 189, Grove St, Los Angeles'},
        {name: 'James', city: 'Fenton', state: 'MI', country: 'USA', color: 'blue', food: 'tacos', movie: 'Comic Book Movie', address: 'No. 189, Grove St, Los Angeles'},
        {name: 'Bill', city: 'Dearborn', state: 'MI', country: 'USA', color: 'blue', food: 'pizza', movie: 'Comic Book Movie', address: 'No. 189, Grove St, Los Angeles'},
        {name: 'Anita', city: 'Detroit', state: 'MI', country: 'USA', color: 'red', food: 'tacos', movie: 'Robot Movie', address: 'No. 189, Grove St, Los Angeles'},
        {name: 'Barbara', city: 'Novi', state: 'MI', country: 'USA', color: 'red', food: 'pizza', movie: 'Robot Movie', address: 'No. 189, Grove St, Los Angeles'},
        {name: 'Joe', city: 'Canton', state: 'MI', country: 'USA', color: 'red', food: 'tacos', movie: 'Forest Gump', address: 'No. 189, Grove St, Los Angeles'},
        {name: 'Susan', city: 'Royal Oak', state: 'MI', country: 'USA', color: 'green', food: 'pizza', movie: 'Forest Gump', address: 'No. 189, Grove St, Los Angeles'},
        {name: 'Jim', city: 'Belleville', state: 'MI', country: 'USA', color: 'green', food: 'tacos', movie: 'Forest Gump', address: 'No. 189, Grove St, Los Angeles'},
        {name: 'Janet', city: 'Belleville', state: 'MI', country: 'USA', color: 'green', food: 'pizza', movie: 'Forest Gump', address: 'No. 189, Grove St, Los Angeles'},    
      ],
      registeredMixins: [],
      model: [],
      model2: []
    }
  },
  created() {
    this.registerMixins();
  },
  mounted() {
    console.log(this.$refs.table)
  },
  computed: {
    allFields() {
      if(this.items.length > 0) {
        return Object.keys(this.items[0])
      }
      return [];
    },
  },
  methods: {
    onShowActions(){
      console.log("Clicked");
    },
    onTransformed(value) {
      console.log("Transformed Data", value);
    },
    registerMixins() {
      this.registeredMixins = this.$options.mixins.map(mixin => mixin.name);
    },
    hasMixin(mixin) {
      if (this.registeredMixins.length > 0) {
        return this.registeredMixins.includes(mixin)
      }
      return false;
    }
  }
}
</script>


<style lang="scss">
th[aria-sort="ascending"] {
    opacity: 1;
    content: "\25BC";
}
#app {
  padding: 3em;
  nav {
    display: flex;
    justify-content: space-between;
  }
  section#table {
    position: relative;
    .actions {
      display: flex;
      justify-content: center;
    }
    [data-icon="ellipsis-v"] {
      color: grey;
      align-content: center;
    }
  }
}
</style>
