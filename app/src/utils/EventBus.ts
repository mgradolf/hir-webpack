type fn = (param?: any) => void

class PageEventBus {
  eventListeners: { [key: string]: fn } = {}

  subscribe(listenerName: string, fn: fn) {
    if (!this.eventListeners[listenerName]) {
      this.eventListeners[listenerName] = fn
    }
  }

  unsubscribe(listenerName: string) {
    if (this.eventListeners[listenerName]) {
      delete this.eventListeners[listenerName]
    }
  }

  publish(listenerName: string, params?: any) {
    if (this.eventListeners[listenerName]) {
      this.eventListeners[listenerName](params)
    }
  }

  publishSimilarEvents(listenerNamePattern: RegExp) {
    const keys = Object.keys(this.eventListeners)
    keys.forEach((key) => {
      if (listenerNamePattern.test(key)) {
        this.eventListeners[key]()
      }
    })
  }
}

export default new PageEventBus()
