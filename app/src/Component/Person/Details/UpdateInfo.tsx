import { Card } from "antd"
import React from "react"

export function UpdateInfo({ person }: { person: { [key: string]: any } }) {
  return (
    <Card title="Update Info">
      <table style={{ width: "400px" }}>
        <tbody>
          <tr>Name</tr>
          <tr>{person.FormattedName}</tr>
        </tbody>
      </table>
    </Card>
  )
}
