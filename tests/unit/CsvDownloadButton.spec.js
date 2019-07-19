import Vue from 'vue'
import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import CsvDownloadButton from '@/components/CsvDownloadButton.vue'

describe('CsvDownloadButton.vue', () => {

  const testCases = [
    {
      data: [
        {name: 'Dan', city: 'Ann Arbor', state: 'MI'},
        {name: 'James', city: 'Fenton', state: 'MI'}    
      ],
      expectedHref: encodeURI("data:text/csv;charset=utf-8,name,city,state\nDan,Ann Arbor,MI\nJames,Fenton,MI\n")
    },
    {
      data: [
        {name: 'Dan', city: 'Ann Arbor', state: 'MI'},
        {name: 'James', city: 'Fenton'}    
      ],
      expectedHref: encodeURI("data:text/csv;charset=utf-8,name,city,state\nDan,Ann Arbor,MI\nJames,Fenton\n")
    }
  ];



  async function mountComponent(options = {}) {
    return mount(CsvDownloadButton, {
      propsData: {
        data: options.data
      }
    });
  }

  context('on mount', () => {

    it('should show a button', async () =>{
      let subject = await mountComponent({data: testCases[0].data});
      let button = subject.find('[data-qa="csv-download-button"]');
      await Vue.nextTick();
      expect(button.exists()).to.be.true;
    });

    it('should encode the CSV data into the href', async () => {
      for(let i = 0; i < testCases.length; i++) {
        let subject = await mountComponent({data: testCases[i].data});
        let button = subject.find('[data-qa="csv-download-button"]');
        expect(button.element.getAttribute('href')).to.equal(testCases[i].expectedHref);
      }
    })
  })
})
