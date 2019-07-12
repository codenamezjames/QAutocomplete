<template>
  <q-page>
    <section class="page-header text-center q-py-xl bg-primary text-white">
      <h1 class="text-h3">QAutocomplete</h1>
    </section>
    <main>
      <q-card style="max-width: 850px; margin: 40px auto 0;">
        <q-card-section>
          <p class="text-body1">
            The QAutocomplete extension is designed to satisfy a common use case for the QSelect componenet.
            <br>
            With this component you can add and remove items using the keyboard from an auto complete select with input.
          </p>
        </q-card-section>
        <q-card-section>
            <div class="q-mb-xl">
              <pre><code>&lt;q-autocomplete label=&quot;Provider 1&quot; v-model=&quot;provider&quot; multiple use-chips new-value :options=&quot;options&quot; /&gt;</code></pre>
              <q-autocomplete label="Provider 1" v-model="provider" multiple use-chips new-value :options="[
                {label: 'google', value:'goog'},
                {label: 'facebook', value:'fb'},
                {label: 'instagram', value:'ig'}
              ]" />
            </div>

            <div class="q-mb-lg">
              <q-autocomplete label="Provider 2" v-model="provider1" use-chips new-value :options="[
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
            </div>
        </q-card-section>
      </q-card>
    </main>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  data () {
    return {
      provider: [],
      provider1: null
    }
  }
}
</script>
