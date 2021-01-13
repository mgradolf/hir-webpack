import React from "react"
import { Card, Col, Row } from "antd"

export type CardContents = {
  label: string
  value?: any
  jsx?: JSX.Element
  render?: (text: any) => string | JSX.Element
}

export type CardContainer = {
  title?: string
  contents?: CardContents[]
  cardActions?: JSX.Element[]
  groupedContents?: CardContainer[]
}

const DetailsCardContainer = (props: { card: CardContainer }) => {
  return (
    <Card title={props.card.title}>
      <Row justify="end" gutter={[8, 8]}>
        {props.card.cardActions && props.card.cardActions.map((x, i) => <Col key={i}>{x}</Col>)}
      </Row>
      <table className="dorakata-table">
        <tbody>
          {Array.isArray(props.card.contents)
            ? props.card.contents.map((y: CardContents, j: number) => (
                <tr key={j}>
                  <td>{y.label}</td>
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

export interface IDetailsSummary {
  summary: CardContainer[]
  actions?: JSX.Element[]
}
export const DetailsSummary = (props: IDetailsSummary) => {
  return (
    <>
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
        {props.summary.length > 0 &&
          props.summary.map((x: CardContainer, i) => (
            <Col key={i} xs={24} sm={24} md={12}>
              {Array.isArray(x.contents) ? (
                <DetailsCardContainer card={x} />
              ) : Array.isArray(x.groupedContents) ? (
                x.groupedContents.map((y: CardContainer, j: number) => (
                  <DetailsCardContainer key={`${i}${j * 100}`} card={y} />
                ))
              ) : null}
            </Col>
          ))}
      </Row>
    </>
  )
}
