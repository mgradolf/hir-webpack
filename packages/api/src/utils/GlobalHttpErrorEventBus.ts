type fn = (param: any) => void

class GlobalHttpErrorEventBus {
  callback: null | fn
  subscribe(fn: fn) {
    if (!this.callback) {
      this.callback = fn
      return true
    } else {
      return false
    }
  }
  publish(err: any) {
    if (this.callback) {
      this.callback(err)
      return true
    }
    return false
  }
}

export default new GlobalHttpErrorEventBus()
