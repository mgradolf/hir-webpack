import eventBus from '@packages/api/lib/utils/GlobalHttpErrorEventBus'
import { store } from '~/store'
import { showGLobalApiError } from '~/store/global_error/action'

export default function RegisteGlobalhttpErrorHandlerr() {
  eventBus.subscribe((error: any) => {
    store.dispatch(showGLobalApiError(error.error))
  })
}
