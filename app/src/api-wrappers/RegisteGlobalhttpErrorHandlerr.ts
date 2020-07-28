import eventBus from '@packages/api/lib/utils/GlobalHttpErrorEventBus'
import { store } from '~/store'
import { showGLobalApiError } from '~/store/global_error/action'

export default function RegisteGlobalhttpErrorHandlerr() {
  eventBus.subscribe((error: any) => {
    console.log('inside event subscribe callback')
    store.dispatch(showGLobalApiError(error.error))
    console.log(error)
  })
}
