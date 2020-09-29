import apiErroreEventBus from "@packages/api/lib/utils/GlobalHttpErrorEventBus"
import { store } from "~/Store"
import { showGLobalApiError } from "~/Store/GlobalError"
import { showLoginModal } from "~/Store/ModalState"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"

export default function RegisteGlobalhttpErrorHandlerr() {
  apiErroreEventBus.subscribe((errors: Array<ISimplifiedApiErrorMessage> | undefined) => {
    // console.log("RegisteGlobalhttpErrorHandlerr", errors)
    if (errors && Array.isArray(errors)) {
      errors.forEach((x) => {
        // console.log("RegisteGlobalhttpErrorHandlerr", x)
        if (x.code === 401 && store.getState().router.location.pathname !== "/login") {
          store.dispatch(showLoginModal({ value: true }))
        } else if (x.isGloabal) {
          store.dispatch(showGLobalApiError(x.message))
        }
      })
    } else {
      store.dispatch(showGLobalApiError(null))
    }
  })
}
