import Login from "~/component/Login/Login"
import Modal from "~/component/Modal"
import React, { useEffect } from "react"
import { Dispatch } from "redux"
import { connect } from "react-redux"
import { removeGLobalApiError } from "~/store/GlobalError"

interface ILoginModalProps {
  removeGLobalApiError?: () => void
}

const LoginModal = (props: ILoginModalProps) => {
  useEffect(() => {
    console.log("calling removeGLobalApiError", props.removeGLobalApiError)
    if (props.removeGLobalApiError) {
      props.removeGLobalApiError()
    }
  }, [props])

  return (
    <Modal>
      <Login modal={true} />
    </Modal>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { removeGLobalApiError: () => dispatch(removeGLobalApiError()) }
}
export default connect(() => ({}), mapDispatchToProps)(LoginModal)
