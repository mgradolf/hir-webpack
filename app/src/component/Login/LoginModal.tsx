import Login from "~/component/Login/Login"
import Modal from "~/component/Modal"
import React from "react"

const LoginModal = () => {
  return (
    <Modal>
      <Login modal={true} />
    </Modal>
  )
}

export default LoginModal
