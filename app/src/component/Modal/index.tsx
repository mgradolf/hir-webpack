import React, { useState } from "react"
import style from "~/component/Modal/modal.module.scss"
import { Row, Col } from "antd"
import zIndexLevel from "~/utils/zIndex"

interface IModalProp {
  closable?: boolean
  showModal: boolean
  children: JSX.Element
  width?: string
  zIndex?: number
}
export default function ({
  closable = false,
  showModal,
  children,
  width = "200px",
  zIndex = zIndexLevel.defaultModal
}: IModalProp) {
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
          <div id={style.myModal} className={style.modal} style={{ zIndex }} onClick={closeOnClickOutside}></div>
          <div className={style.modal_content} style={{ zIndex: zIndex + 1 }}>
            {closable && (
              <span className={style.modal__close} onClick={() => setvisibility(false)}>
                &times;
              </span>
            )}
            <Row>
              <Col flex="auto"></Col>
              <Col flex={width}>{children}</Col>
              <Col flex="auto"></Col>
            </Row>
          </div>
        </>
      )}
    </>
  )
}
