import QAutoComplete from '@quasar/quasar-app-extension-qautocomplete/src/component/QAutocomplete'

export default ({ Vue, ssrContext }) => {
  Vue.component('q-autocomplete', QAutoComplete(ssrContext))
}