import React, { useEffect } from "react"
import style from "~/Component/Common/Modal/modal.module.scss"
import { Row, Col, Spin, Card } from "antd"
import zIndexLevel from "~/utils/zIndex"
import FocusTrap from "focus-trap-react"
import { Options as FocusTrapOptions } from "focus-trap"
import ReactDOM from "react-dom"

interface IModalProp {
  children: JSX.Element
  width?: string
  zIndex?: number
  loading?: boolean
  loadingTip?: string
  apiCallInProgress?: boolean
}
export default function ({
  children,
  width = "200px",
  zIndex = zIndexLevel.defaultModal,
  loading = false,
  loadingTip = "Loading...",
  apiCallInProgress = false
}: IModalProp) {
  const focusTrapOption = {
    allowOutsideClick: () => true,
    fallbackFocus: () => document.getElementById("modalContainer")
  } as FocusTrapOptions

  useEffect(() => {
    document.documentElement.style.height = "100vh"
    document.documentElement.style.overflow = "hidden"
    return () => {
      document.documentElement.style.height = ""
      document.documentElement.style.overflow = ""
    }
  }, [])
  return ReactDOM.createPortal(
    <>
      <FocusTrap
        focusTrapOptions={focusTrapOption}
        children={
          <div id="modalContainer" tabIndex={-1}>
            <div className={style.modal} style={{ zIndex }}></div>
            <Row className={style.modal_content} style={{ zIndex: zIndex + 1 }}>
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
        }
      ></FocusTrap>
    </>,
    document.getElementById("modal-container") as HTMLElement
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
