import React from "react"
import { Col, Row } from "antd"
import { DetailsCardContainer } from "~/Component/Common/Page/DetailsPage/DetailsCardContainer"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"

export const DetailsCardContainerBlock = (props: { blocks: CardContainer[] }) => {
  return (
    <Row>
      {props.blocks.map((x: CardContainer, i) => (
        <Col key={i} xs={24} sm={24} md={12}>
          {Array.isArray(x.contents) ? (
            <DetailsCardContainer card={x} />
          ) : Array.isArray(x.groupedContents) ? (
            x.groupedContents.map((y: CardContainer, j: number) => <DetailsCardContainer card={y} key={j} />)
          ) : null}
        </Col>
      ))}
    </Row>
  )
}
