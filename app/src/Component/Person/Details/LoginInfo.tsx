import { Card } from "antd"
import React, { useEffect, useState } from "react"

export function LoginInfo({ login }: { login: { [key: string]: any } }) {
  const [state, setState] = useState<{ [key: string]: any }>({})
  useEffect(() => {
    setState({
      "Person ID": login.PersonID,
      "Secret Answer": login.SecretAnswer,
      "Secret Question": login.SecretQuestion,
      "User Login": login.UserLogin
    })
  }, [login])
  return (
    <Card title="Login Info">
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
