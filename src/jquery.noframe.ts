import noframe from './noframe'

declare global {
  interface Window {
    $: any
    jQuery: any
    Zepto: any
  }
}

if (typeof window !== 'undefined') {
  const plugin = window.$ || window.jQuery || window.Zepto
  if (plugin) {
    plugin.fn.noframe = function noframePlugin(cName) {
      noframe(this, cName)
    }
  }
}
