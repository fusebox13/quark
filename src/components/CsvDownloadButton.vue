<template>
  <a class="btn btn-outline-primary" role="button" data-qa="csv-download-button" :download="download" :href="href">{{download}}</a>
</template>

<script>
export default {
  name: 'CsvDownloadButton',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      contentType: 'data:text/csv;charset=utf-8,',
      download: 'people.csv'
    }
  },
  computed: {
    href() {
      // let csvData = "name,city,state\ndan,annarbor,mi\n"

      let csvData = '';
      csvData += Object.keys(this.data[0]).join(',') + '\n';

      for(let i= 0; i < this.data.length; i++) {
        csvData += Object.values(this.data[i]).join(',') + '\n';
      }

      return encodeURI(this.contentType + csvData)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
