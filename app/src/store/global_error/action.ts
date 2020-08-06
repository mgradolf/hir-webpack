import {
  SHOW_GLOBAL_API_ERROR,
  REMOVE_GLOBAL_API_ERROR
} from '~/store/action_types'

export const showGLobalApiError = (message: string) => ({
  type: SHOW_GLOBAL_API_ERROR,
  payload: { message }
})

export const removeGLobalApiError = () => ({
  type: REMOVE_GLOBAL_API_ERROR
})
