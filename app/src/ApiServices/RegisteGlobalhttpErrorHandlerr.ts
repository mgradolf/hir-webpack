import eventBus from "@packages/api/lib/utils/GlobalHttpErrorEventBus"
import { store } from "~/store"
import { showGLobalApiError } from "~/store/GlobalError"
import { setLoginRequired } from "~/store/Authentication"
import { ErrorSchema } from "@packages/api/lib/utils/Interfaces"

export default function RegisteGlobalhttpErrorHandlerr() {
  eventBus.subscribe((error: ErrorSchema) => {
    store.dispatch(showGLobalApiError(error.error))

    if (error.code === 401 && store.getState().router.location.pathname !== "/login") {
      store.dispatch(setLoginRequired(true))
    }
  })
}
