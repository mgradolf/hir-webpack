import { IProcessedApiError } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { Card, Spin } from "antd"
import React, { useEffect, useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import { getEntityById } from "~/ApiServices/Service/EntityService"

export default function AccountDetailsPage(props: RouteComponentProps<{ accountID: string }>) {
  const AccountID = Number(props?.match?.params?.accountID)
  const [account, setAccount] = useState<{ [key: string]: any }>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<IProcessedApiError>()
  useEffect(() => {
    setLoading(true)
    getEntityById("Account", AccountID).then((x) => {
      setLoading(false)
      if (x.success) setAccount(x.data)
      else setError(x.error)
    })
  }, [AccountID])
  if (loading) return <Spin spinning={true} size="large" />
  if (error) return <p>Couldn't found any account with account id {AccountID}</p>
  return (
    <div className="site-layout-content">
      <Card title="Account Details">
        <table>
          <tbody>
            {Object.keys(account).map((key, index) => {
              if (!account[key]) return null
              return (
                <tr>
                  <td width={200}>{key}</td>
                  <td>{String(account[key])}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
