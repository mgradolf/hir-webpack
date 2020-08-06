import eventBus from "@packages/api/lib/utils/GlobalHttpErrorEventBus"
import { AppStore } from "~/store"
import { showGLobalApiError } from "~/store/GlobalError"

export default function RegisteGlobalhttpErrorHandlerr(store: AppStore) {
  eventBus.subscribe((error: any) => {
    store.dispatch(showGLobalApiError(error.error))
  })
}
