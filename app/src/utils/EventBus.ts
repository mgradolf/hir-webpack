export const REFRESH_OFFERING_PAGE = "REFRESH_OFFERING_PAGE"
export const REFRESH_OFFERING_DETAILS_PAGE = "REFRESH_OFFERING_DETAILS_PAGE"
export const REFRESH_OFFERING_FINANCIAL_PAGE = "REFRESH_OFFERING_FINANCIAL_PAGE"
export const REFRESH_OFFERING_APPROVAL_PAGE = "REFRESH_OFFERING_APPROVAL_PAGE"
export const REFRESH_OFFERING_TAG_PAGE = "REFRESH_OFFERING_TAG_PAGE"
export const REFRESH_OFFERING_REQUISITE_GROUP_PAGE = "REFRESH_OFFERING_REQUISITE_GROUP_PAGE"
export const REFRESH_OFFERING_QUALIFIED_INSTRUCTOR_PAGE = "REFRESH_OFFERING_QUALIFIED_INSTRUCTOR_PAGE"
export const REFRESH_FILTER_DATA_OF_PAGE = "REFRESH_FILTER_DATA_OF_PAGE"
export const REFRESH_SECTION_PAGE = "REFRESH_SECTION_PAGE"

export const REFRESH_SECTION_SEATGROUP_PAGE = "REFRESH_SECTION_SEATGROUP_PAGE"
export const REFRESH_SECTION_SCHEDULE_PAGE = "REFRESH_SECTION_SCHEDULE_PAGE"
export const REFRESH_SECTION_BUDGET_PAGE = "REFRESH_SECTION_BUDGET_PAGE"

export const REFRESH_SECTION_NOTIFICATION_PAGE = "REFRESH_SECTION_NOTIFICATION_PAGE"

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

export const eventBus = new PageEventBus()
