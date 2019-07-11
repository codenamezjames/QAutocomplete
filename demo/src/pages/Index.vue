<template>
  <q-page class="flex flex-center">
    <q-autocomplete label="Provider" v-model="provider" multiple use-chips new-value :options="[
      {label: 'google', value:'goog'},
      {label: 'facebook', value:'fb'},
      {label: 'instagram', value:'ig'}
    ]" />

    <q-autocomplete label="Provider" v-model="provider" multiple use-chips new-value :options="[
      {label: 'google', value:'goog'},
      {label: 'facebook', value:'fb'},
      {label: 'instagram', value:'ig'}
    ]">
      <template v-slot:option="scope">
        <q-item v-bind="scope.itemProps" v-on="scope.itemEvents" >
          <q-item-section>
            <q-item-label v-html="scope.opt[scope.optionLabel]" />
          </q-item-section>
          <q-item-section avatar @click.native.stop="scope.removeOption(scope.opt)" v-if="scope.newValue">
            <q-btn icon="delete" size="sm" color="negative" dense flat/>
          </q-item-section>
        </q-item>
      </template>
    </q-autocomplete>
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
