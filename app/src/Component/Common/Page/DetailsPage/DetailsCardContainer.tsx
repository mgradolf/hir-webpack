import React from "react"
import { Card } from "antd"
import { CardContainer, CardContents } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"

export const DetailsCardContainer = (props: { card: CardContainer; cardActions?: JSX.Element[] }) => {
  return (
    <Card title={props.card.title} extra={props.card.cardActions ? props.card.cardActions : props.cardActions}>
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
