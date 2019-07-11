/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

const extendQuasarConf = function (conf) {
  // make sure qautocomplete boot file is registered
  conf.boot.push('~@quasar/quasar-app-extension-qautocomplete/src/boot/qautocomplete.js')
  console.log(` App Extension (QAutocomplete) Info: 'Adding QAutocomplete boot reference to your quasar.conf.js'`)

  // make sure boot file transpiles
  conf.build.transpileDependencies.push(/quasar-app-extension-qautocomplete[\\/]src/)
}

module.exports = function (api) {
  // quasar compatibility check
  api.compatibleWith('@quasar/app', '^1.0.0')

  // register JSON api
  api.registerDescribeApi('QAutocomplete', './component/QAutocomplete.json')

  // extend quasar.conf
  api.extendQuasarConf(extendQuasarConf)
}