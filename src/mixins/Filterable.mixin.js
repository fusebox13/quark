import { groupBy } from 'lodash'

export default {
  name: "filterable",
  data() {
    return {
      filter: null,
      filters: {},
      totalRows: 0
    }
  },
  methods: {
    filterFunction(row, filterMethod) {
      let additiveResults = [];
      let subtractiveResults = [];

      //Map Filters so they can be grouped
      //TODO: Mapping must not be by type.  Name or random hash possibly?
      this.filters[filterMethod.type] = filterMethod;

      //Extracts all filters and groups them
      let filterGroup = groupBy(this.filters, 'type');

      //Filter Additive types First - Build the list
      if(filterGroup.hasOwnProperty('additive')) {
        filterGroup.additive.forEach(filter => {
          additiveResults.push(filter.apply(row))
        })
      }

      //Filter Subtractive types Second - Reduce the list
      if(filterGroup.hasOwnProperty('subtractive')) {
        filterGroup.subtractive.forEach(filter => {
          subtractiveResults.push(filter.apply(row))   
        })
      }
      return (additiveResults.includes(true) || additiveResults.length == 0) && !subtractiveResults.includes(false);
    },
    onFiltered(filtered, total) {
      this.totalRows = total;
    },
  }
} 