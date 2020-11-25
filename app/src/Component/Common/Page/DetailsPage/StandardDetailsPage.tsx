import React, { useEffect, useState } from "react"
import { IProcessedApiError } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { Card, Col, Row, Spin } from "antd"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"

export type CardContents = {
  label: string
  value?: any
  jsx?: JSX.Element
  render?: (text: any) => string
}

export type CardContainer = {
  title?: string
  contents?: CardContents[]
  groupedContents?: CardContainer[]
}

export interface IStandardDetailsPage {
  getDetailsMeta: (Params: any) => CardContainer[]
  getDetailsFunc: () => Promise<IApiResponse>
  actions?: JSX.Element[]
}
export function StandardDetailsPage(props: IStandardDetailsPage) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<IProcessedApiError>()
  const [blocks, setBlocks] = useState<any[]>([])
  const loadDetails = () => {
    setLoading(true)
    props.getDetailsFunc().then((x) => {
      setLoading(false)
      if (x.success) {
        console.log(x.data)
        setBlocks(props.getDetailsMeta(x.data))
      } else setError(x.error)
    })
  }
  useEffect(() => {
    eventBus.subscribe(REFRESH_PAGE, loadDetails)
    eventBus.publish(REFRESH_PAGE)
    return () => {
      eventBus.unsubscribe(REFRESH_PAGE)
    }
    // eslint-disable-next-line
  }, [])

  const CardContainerRender = (card: CardContainer, key?: number) => {
    return (
      <Card key={key} title={card.title}>
        <table>
          <tbody>
            {Array.isArray(card.contents)
              ? card.contents.map((y: CardContents, j: number) => (
                  <tr key={j}>
                    <td style={{ width: "200px" }}>{y.label}</td>
                    <td style={{ width: "30px" }}></td>
                    <td>{y.jsx ? y.jsx : y.render ? y.render(y.value) : y.value}</td>
                  </tr>
                ))
              : []}
          </tbody>
        </table>
      </Card>
    )
  }

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
      <Row>
        {blocks.map((x: CardContainer, i) => (
          <Col key={i} xs={24} sm={24} md={12}>
            {Array.isArray(x.contents)
              ? CardContainerRender(x)
              : Array.isArray(x.groupedContents)
              ? x.groupedContents.map((y: CardContainer, j: number) => CardContainerRender(y, j))
              : null}
          </Col>
        ))}
      </Row>
    </div>
  )

  if (loading)
    return (
      <Row justify="center" align="middle">
        <Spin size="large" />
      </Row>
    )
  if (error) return <p>Not Found</p>
  return toRender
}
