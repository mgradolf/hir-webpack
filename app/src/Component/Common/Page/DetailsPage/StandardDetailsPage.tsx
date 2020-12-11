import React, { useEffect, useState } from "react"
import { IProcessedApiError } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { Col, Row, Spin } from "antd"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import { DetailsCardContainerBlock } from "~/Component/Common/Page/DetailsPage/DetailsCardContainerBlock"
import { IStandardDetailsPage } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"

export function StandardDetailsPage(props: IStandardDetailsPage) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<IProcessedApiError>()
  const [blocks, setBlocks] = useState<any[]>(props.dataLoaded ? props.getDetailsMeta(props.dataLoaded) : [])

  const loadDetails = () => {
    if (props.getDetailsFunc) {
      setLoading(true)
      props.getDetailsFunc().then((x) => {
        setLoading(false)
        if (x.success) {
          setBlocks(props.getDetailsMeta(x.data))
        } else setError(x.error)
      })
    }
  }

  useEffect(() => {
    eventBus.subscribe(REFRESH_PAGE, loadDetails)
    eventBus.publish(REFRESH_PAGE)
    return () => {
      eventBus.unsubscribe(REFRESH_PAGE)
    }
    // eslint-disable-next-line
  }, [])

  const toRender = (
    <div className="site-layout-content">
      {Array.isArray(props.actions) && (
        <Row justify="end">
          {props.actions.map((x, key) => (
            <Col key={key} style={{ marginLeft: "10px", marginBottom: "10px" }}>
              {x}
            </Col>
          ))}
        </Row>
      )}
      <DetailsCardContainerBlock blocks={blocks} cardActions={props.cardActions ? props.cardActions : []} />
    </div>
  )

  return (
    <>
      {loading && (
        <Row justify="center" align="middle">
          <Spin size="large" />
        </Row>
      )}
      {!loading && error && <p>Not Found</p>}
      {!loading && !error && toRender}
    </>
  )
}
