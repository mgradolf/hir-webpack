import React, { useState } from "react"
import style from "~/component/Modal/modal.module.scss"

interface IModalProp {
  closable: boolean
  showModal: boolean
  children: JSX.Element
}
export default function ({ closable, showModal, children }: IModalProp) {
  const [visibility, setvisibility] = useState(true)
  const closeOnClickOutside = () => {
    if (closable) {
      setvisibility(false)
    }
  }
  return (
    <>
      {showModal && visibility && (
        <>
          <div id={style.myModal} className={style.modal} onClick={closeOnClickOutside}></div>
          <div className={style.modal_content} onClick={() => console.log("inside")}>
            {closable && (
              <span className={style.modal__close} onClick={() => setvisibility(false)}>
                &times;
              </span>
            )}
            {children}
          </div>
        </>
      )}
    </>
  )
}
