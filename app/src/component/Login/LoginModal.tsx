import Login from "~/Component/Login/Login"
import Modal from "~/Component/Modal"
import React, { useEffect } from "react"
import { Dispatch } from "redux"
import { connect } from "react-redux"
import { removeGLobalApiError } from "~/store/GlobalError"
import zIndexLevel from "~/utils/zIndex"

interface ILoginModalProps {
  removeGLobalApiError?: () => void
}

const LoginModal = (props: ILoginModalProps) => {
  useEffect(() => {
    if (props.removeGLobalApiError) {
      props.removeGLobalApiError()
    }
  }, [props])

  return (
    <Modal closable={false} showModal={true} children={<Login modal={true} />} zIndex={zIndexLevel.loginModal}></Modal>
  )
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return { removeGLobalApiError: () => dispatch(removeGLobalApiError()) }
}
export default connect(undefined, mapDispatchToProps)(LoginModal)
