import { Button, Tooltip } from "antd"
import React from "react"
import { DownloadOutlined } from "@ant-design/icons"
import { getToken } from "@packages/api/lib/utils/TokenStore"

export function SectionRosterReport(props: { SectionID: number }) {
  return (
    <Tooltip title="Download section roster report">
      <Button
        icon={<DownloadOutlined />}
        style={{ marginRight: "5px" }}
        shape="circle"
        type="primary"
        onClick={() => {
          const urlParams =
            "/api/reportServlet?ReportName=section.EnrolledStudentForSection&DownloadType=attachment&token=" +
            getToken() +
            "&SectionID=" +
            props.SectionID
          window.open(urlParams)
        }}
      />
    </Tooltip>
  )
}
