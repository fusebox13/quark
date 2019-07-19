import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en_us from './en_us'
import de_de from './de_de'
import fr_fr from './fr_fr'

Vue.use(VueI18n)

const messages = {
  en_us,
  de_de,
  fr_fr
}

export default new VueI18n({
  locale: 'en_us',
  messages 
})

export { messages }



