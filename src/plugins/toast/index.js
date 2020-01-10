import Vue from 'vue'
import ToastComponent from './toast.vue'
const ToastConstructor = Vue.extend(ToastComponent)
let toastPool = []

let getAnInstance = () => {
  if (toastPool.length > 0) {
    let instance = toastPool[0]
    toastPool.splice(0, 1)
    return instance
  }
  return new ToastConstructor({
    el: document.createElement('div')
  })
}

let removeDom = event => {
  if (event.target.parentNode) {
    event.target.parentNode.removeChild(event.target)
  }
}

ToastConstructor.prototype.close = function () {
  this.visible = false
  this.$el.addEventListener('transitionend', removeDom)
}

let Toast = (options = {}) => {
  // 添加回调函数
  let callBackFn = options.callBackFn
  let duration = options.duration || 1500
  let instance = getAnInstance()
  clearTimeout(instance.timer)
  instance.show = options.show || ''
  instance.className = options.className || ''
  instance.message = typeof options === 'string' ? options : options.message
  document.body.appendChild(instance.$el)
  Vue.nextTick(function () {
    instance.visible = true
    instance.$el.removeEventListener('transitionend', removeDom)
    instance.timer = setTimeout(function () {
      instance.close()
      if (typeof callBackFn === 'function') {
        callBackFn()
      }
    }, duration)
  })
  return instance
}

export default {
  install (Vue) {
    Vue.prototype.$toast = Toast
  }
}
