export default {
  name: "paginated",
  data() {
    return {
      totalRows: 0,
      perPage: 5,
      currentPage: 1,
    }
  },
  methods: {
    setPerPage(value) {
      this.perPage = value;
    },
    goto(page) {
      this.currentPage = page;
    }
  },
  created(){
    if(this.hasOwnProperty('items') && Array.isArray(this.items)) {
      this.totalRows = this.items.length;
    } else {
      throw new Error('{ items: Array } must be present in the data')
    }
  }
}