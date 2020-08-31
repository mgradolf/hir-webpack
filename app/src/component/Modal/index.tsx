import React, { useState, useEffect } from "react"
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
  apiCallInProgress?: boolean
}
export default function ({
  closable = false,
  showModal,
  children,
  width = "200px",
  zIndex = zIndexLevel.defaultModal,
  loading = false,
  loadingTip = "Loading...",
  apiCallInProgress = false
}: IModalProp) {
  const [visibility, setvisibility] = useState(true)
  const closeOnClickOutside = () => {
    if (closable) {
      setvisibility(false)
    }
  }

  useEffect(() => {
    document.documentElement.style.height = "100vh"
    document.documentElement.style.overflow = "hidden"
    return () => {
      document.documentElement.style.height = ""
      document.documentElement.style.overflow = ""
    }
  }, [])
  return (
    <>
      {showModal && visibility && (
        <>
          <div className={style.modal} style={{ zIndex }} onClick={closeOnClickOutside}></div>
          <div className={style.modal_content} style={{ zIndex: zIndex + 1 }}>
            {closable && (
              <span className={style.modal__close} onClick={() => setvisibility(false)}>
                &times;
              </span>
            )}
            <Row>
              <Col flex="auto"></Col>
              {loading && <ModalLoading {...{ width, loadingTip }} />}
              {!loading && (
                <Col flex={width}>
                  {children}
                  {apiCallInProgress && (
                    <div className={style.modal_api_in_progress}>
                      <div className={style.modal_api_in_progress__spinner}>
                        <Spin size="large" />
                      </div>
                    </div>
                  )}
                </Col>
              )}
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
  loadingTip?: string
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
