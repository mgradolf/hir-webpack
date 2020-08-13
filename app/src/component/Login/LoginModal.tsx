import Login from "~/component/Login/Login"
import Modal from "~/component/Modal"
import React, { useEffect } from "react"
import { Dispatch } from "redux"
import { connect } from "react-redux"
import { removeGLobalApiError } from "~/store/GlobalError"
import { AppState } from "~/store"

interface ILoginModalProps {
  removeGLobalApiError?: () => void
  loginModalRequired?: boolean
}

const LoginModal = (props: ILoginModalProps) => {
  useEffect(() => {
    console.log("calling removeGLobalApiError", props.removeGLobalApiError)
    if (props.removeGLobalApiError) {
      props.removeGLobalApiError()
    }
  }, [props])

  return <Modal closable={false} showModal={!!props.loginModalRequired} children={<Login modal={true} />}></Modal>
}

const mapStateToProps = (state: AppState) => {
  return { loginModalRequired: state.authentication.loginModalRequired }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return { removeGLobalApiError: () => dispatch(removeGLobalApiError()) }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginModal)
