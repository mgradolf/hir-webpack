import apiErroreEventBus from "@packages/api/lib/utils/GlobalHttpErrorEventBus"
import { store } from "~/store"
import { showGLobalApiError } from "~/store/GlobalError"
import { showLoginModal } from "~/store/ModalState"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export default function RegisteGlobalhttpErrorHandlerr() {
  apiErroreEventBus.subscribe((error: IApiResponse | null) => {
    if (error && error.errorMessage) {
      store.dispatch(showGLobalApiError(error.errorMessage))

      if (error.code === 401 && store.getState().router.location.pathname !== "/login") {
        store.dispatch(showLoginModal(true))
      }
    } else {
      store.dispatch(showGLobalApiError(null))
    }
  })
}
