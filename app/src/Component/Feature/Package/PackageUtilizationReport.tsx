import React, { useEffect, useState } from "react"
import { Button, Tooltip } from "antd"
import { DownloadOutlined } from "@ant-design/icons"
import { getPackageReport } from "~/ApiServices/Service/PackageService"

interface IPackageUtilizationReportProps {
  PackageID: number
}

export default function PackageUtilizationReport(props: IPackageUtilizationReportProps) {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async function () {
      setLoading(true)
      const result = await getPackageReport({ PackageID: props.PackageID })
      if (result.success && result.data) {
        setLoading(false)
        setMessage(result.data.Message)
      }
    })()
    // eslint-disable-next-line
  }, [])

  return (
    <Tooltip title="Download utilization report">
      <Button
        loading={loading}
        icon={<DownloadOutlined />}
        style={{ marginRight: "5px" }}
        shape="circle"
        type="primary"
        onClick={() => {
          const newWin: any = window.open("url", `Utilization report`, "height=800,width=700")
          newWin.document.write(message)
        }}
      />
    </Tooltip>
  )
}
