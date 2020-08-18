import React, { useState } from "react"
import style from "~/component/Modal/modal.module.scss"
import { Row, Col, Spin, Card } from "antd"
import zIndexLevel from "~/utils/zIndex"

interface IModalProp {
  closable?: boolean
  showModal: boolean
  children: JSX.Element
  width?: string
  zIndex?: number
  loading?: boolean
  loadingTip?: string
}
export default function ({
  closable = false,
  showModal,
  children,
  width = "200px",
  zIndex = zIndexLevel.defaultModal,
  loading = false,
  loadingTip = "Loading..."
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
              {loading && <ModalLoading {...{ width, loadingTip }} />}
              {!loading && <Col flex={width}>{children}</Col>}
              <Col flex="auto"></Col>
            </Row>
          </div>
        </>
      )}
    </>
  )
}

interface IModalLoading {
  width: string
  loadingTip: string
}
function ModalLoading(props: IModalLoading) {
  return (
    <Col flex={props.width}>
      <Card>
        <Row justify="center" align="middle">
          <Col flex="none">
            <Spin tip={props.loadingTip} />
          </Col>
        </Row>
      </Card>
    </Col>
  )
}
