import { Dispatch } from "redux"
import { push, RouterAction } from "connected-react-router"

export const redirect = (url: string): void | any => {
  return (dispatch: Dispatch<RouterAction>) => {
    dispatch(push(url))
  }
}
