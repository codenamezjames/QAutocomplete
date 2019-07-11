<template>
  <q-page class="flex flex-center">
    <q-autocomplete label="Provider" v-model="provider" multiple use-chips new-value :options="[
      {label: 'google', value:'goog'},
      {label: 'facebook', value:'fb'},
      {label: 'instagram', value:'ig'}
    ]" />
  </q-page>
</template>

<style>
</style>

<script>
export default {
  data () {
    return {
      provider: []
    }
  }
}
</script>
