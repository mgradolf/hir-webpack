type fn = (param?: any) => void

class EventBus {
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
}

export default new EventBus()
