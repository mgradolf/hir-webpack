import { Card } from "antd"
import React from "react"

export function ReferenceInfo({ person }: { person: { [key: string]: any } }) {
  return (
    <Card title="Reference Info">
      <table style={{ width: "400px" }}>
        <tbody>
          <tr>Name</tr>
          <tr>{person.FormattedName}</tr>
        </tbody>
      </table>
    </Card>
  )
}
