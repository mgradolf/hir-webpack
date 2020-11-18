import { Card } from "antd"
import React, { useEffect, useState } from "react"

export function LoginInfo({ login }: { login: { [key: string]: any } }) {
  const [state, setState] = useState<{ [key: string]: any }>({})
  useEffect(() => {
    setState({
      "User Login": login.UserLogin,
      "Secret Question": login.SecretQuestion,
      "Secret Answer": login.SecretAnswer
    })
  }, [login])
  return (
    <Card title="Web Login">
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
