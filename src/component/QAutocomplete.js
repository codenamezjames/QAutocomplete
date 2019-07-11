import Vue from 'vue'
import findIndex from 'lodash/findIndex'
import includes from 'lodash/includes'

import { QSelect, QItem, QItemSection, QItemLabel, QBtn } from 'quasar'

export default function(ssrContext) {
  return Vue.extend({
    name: 'QAutocomplete',
    created() {
      this.filteredOptions = this.opts
    },
    data() {
      return {
        inputModel: '',
        opts:
          typeof this.options[0] === 'string'
            ? this.options.map(o => ({
                [this.optionLabel]: o,
                [this.optionValue]: o
              }))
            : this.options,
        model: Array.isArray(this.value) ? [] : null,
        filteredOptions: []
      }
    },
    props: {
      dark: {
        type: Boolean,
        default: () => false
      },
      inputDebounce: {
        type: [String, Number],
        default: () => 0
      },
      optionValue: {
        type: String,
        default: 'value'
      },
      optionLabel: {
        type: String,
        default: 'label'
      },
      newValue: {
        type: Boolean,
        default: () => false
      },
      borderless: {
        type: Boolean,
        default: () => false
      },
      expand: {
        type: Boolean,
        default: () => false
      },
      dense: {
        type: Boolean,
        default: () => false
      },
      outlined: {
        type: Boolean,
        default: () => false
      },
      label: {
        type: String,
        required: true
      },
      multiple: {
        type: Boolean,
        default: () => false
      },
      useChips: {
        type: Boolean,
        default: () => false
      },
      options: {
        type: Array,
        default: () => []
      },
      value: {
        required: true
      }
    },
    watch: {
      value(val) {
        this.model = val
      },
      model: {
        handler(val) {
          this.$nextTick(() => {
            this.$refs.autocomplete.updateInputValue('')
          })
          this.$emit('input', val)
        },
        deep: true
      }
    },
    methods: {
      blur() {
        this.$nextTick(() => {
          this.$refs.autocomplete.updateInputValue('')
        })
        if (!this.inputModel || !this.newValue) return
        this.$refs.autocomplete.add(this.inputModel)
        this.opts.push({
          [this.optionValue]: this.inputModel,
          [this.optionLabel]: this.inputModel
        })
        this.$emit('add-option', this.inputModel)
      },
      createValue(val, done) {
        if (val.length > 0 && this.newValue) {
          if (!includes(this.opts, val)) {
            this.opts.push({
              [this.optionValue]: val,
              [this.optionLabel]: val
            })
            this.$emit('add-option', val)
          }
          done(val, 'toggle')
        }
      },
      filterFn(val, update, abort) {
        this.inputModel = val
        update(() => {
          const needle = val.toLowerCase()
          this.filteredOptions = this.opts.filter(
            v =>
              v[this.optionLabel] &&
              v[this.optionLabel].toLowerCase().indexOf(needle) > -1
          )
        })
      },
      removeFromSelect(opt) {
        const index = findIndex(this.opts, opt)
        if (index > -1) {
          this.opts.splice(index, 1)
        }
        this.$refs.autocomplete.filter(this.inputModel)
      },
      __removeItem(h, scope){
        if (!this.newValue) return
        return h(QItemSection,
            {
              attrs: { avatar: '' },
              nativeOn: {
                click: ($event) => {
                  $event.stopPropagation()
                  return this.removeFromSelect(scope.opt)
                }
              }
            },
            [
              h(QBtn, {
                attrs: { icon: 'close', size: 'sm', round: '', flat: '' }
              })
            ]
          )
      },
      __label (h, scope) {
        return h(QItemSection,
            [
              h(QItemLabel, {
                domProps: {
                  innerHTML: this._s(scope.opt[this.optionLabel])
                }
              })
            ]
          )
      },
      __item (h, scope) {
        return h(QItem,
          this._g(
            this._b({}, QItem, scope.itemProps),
            scope.itemEvents
          ),
          [ this.__label(h, scope),
            this.__removeItem(h, scope)
          ]
        )
      },
      __option(h) {
        return {
          key: 'option',
          fn: (scope) => {
            return [this.__item(h, scope)]
          }
        }
      }
    },
    render(h) {
      // const _vm = this
      const renderMe = h(
        QSelect,
        this._b(
          {
            ref: 'autocomplete',
            style: this.expand ? 'margin: 0 -16px;' : '',
            attrs: {
              useInput: true,
              fillInput: true,
              clearable: true,
              options: this.filteredOptions,
              ...this.$attrs
            },
            on: {
              'new-value': this.createValue,
              blur: this.blur,
              filter: this.filterFn,
              ...this.$listeners,
            },
            scopedSlots: this._u([this.__option(h)]),
            model: {
              value: this.model,
              callback: ($$v) => this.model = $$v
            }
          },
          QSelect,
          this.$props
        )
      )
      return renderMe
    }
  })
}
