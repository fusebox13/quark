export default {
  name: "multiselectable",
  data() {
    return { 
      selectedRowSet: new Set(),
      selectedRows: [],
      rowStateMap: {},
      model: [],
      multiSelectEnabled: true
    }
  },
  watch: {
    model(newValue) {
      this.createNewRowStateMap(newValue);
      this.appendBulkSelectField();
    }
  },
  methods: {
    createNewRowStateMap(model) {
      let newMap = {};
      for(let i = 0; i < model.length; i++) {
        newMap[i] = false;
      }
      this.rowStateMap = newMap;
    },
    appendBulkSelectField() {
      if(this.hasOwnProperty('fields') && Array.isArray(this.fields)) {
        this.fields.unshift({ key: 'bulk', label: '' });
      } else {
        throw new Error("Please specify fields data")
      }
    },
    onRowSelected(row){
      let isSelected = this.rowStateMap[row.index];
      if(isSelected) {
        this.selectedRowSet.add(row.item)
      } else {
        this.selectedRowSet.delete(row.item)
      }
      this.selectedRows = [...this.selectedRowSet]
    },
    onHeaderSelected(header) {
      this.toggleSelectAll(header.headerSelected);
    },
    toggleSelectAll(toggleState) {
      let totalKeys = Object.keys(this.rowStateMap).length;
      for (let i = 0; i < totalKeys; i++) {
        this.rowStateMap[i] = toggleState;
      }
      this.selectedRows = toggleState?this.model:[];
    },
  }
}