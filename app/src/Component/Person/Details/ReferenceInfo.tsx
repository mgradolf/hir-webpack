import { Card } from "antd"
import React, { useEffect, useState } from "react"

export function ReferenceInfo({ person }: { person: { [key: string]: any } }) {
  const [state, setState] = useState<{ [key: string]: any }>({})
  useEffect(() => {
    setState({
      "Can Defer Payment": person.CanDeferPayment ? "Yes" : "No",
      GovID: person.GovID,
      ERPID: person.ERPID,
      "Creator Account ID": person.CreatorAccountID
    })
  }, [person])
  return (
    <Card title="Reference Info">
      <table style={{ width: "400px" }}>
        <tbody>
          {Object.keys(state).map((key, i) => (
            <tr>
              <td>{key}</td>
              <td>{state[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}
