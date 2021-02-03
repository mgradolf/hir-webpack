import { Collapse, Row, Spin } from "antd"
import React, { useEffect, useState } from "react"
import { getReportList } from "~/ApiServices/Service/ReportService"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"

export default function ReportPage() {
  const [reports, setReports] = useState<{ [key: string]: any }>({})
  const [loading, setLoading] = useState(false)
  const loadReportList = () => {
    setLoading(true)
    getReportList({}).then((x) => {
      if (x.success && x.data && Array.isArray(x.data.Reports)) {
        const ReportsWithFolderNameAsKeys: { [key: string]: any[] } = {}
        x.data.Reports.forEach((y: any) => {
          if (!ReportsWithFolderNameAsKeys[y.Folder]) {
            ReportsWithFolderNameAsKeys[y.Folder] = []
          }
          ReportsWithFolderNameAsKeys[y.Folder].push(y)
        })
        console.log(ReportsWithFolderNameAsKeys)
        setReports(ReportsWithFolderNameAsKeys)
      }
      setLoading(false)
    })
  }
  useEffect(() => {
    eventBus.subscribe(REFRESH_PAGE, loadReportList)
    eventBus.publish(REFRESH_PAGE)
    return () => {
      eventBus.unsubscribe(REFRESH_PAGE)
    }
  }, [])

  const toRender = loading ? (
    <Row align="middle" justify="center">
      <Spin size="large" />
    </Row>
  ) : (
    <Collapse>
      {Object.keys(reports).map((key, i) => (
        <Collapse.Panel header={key} key={i}>
          <table className="dorakata-table">
            <thead>
              <tr>
                <th>Report Name</th>
                <th></th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {reports[key].map((report: any, i: number) => (
                <tr key={i}>
                  <td>{report.ReportLabel || report.ReportName}</td>
                  <td style={{ width: "30px" }}></td>
                  <td>
                    <p dangerouslySetInnerHTML={{ __html: report.ReportDescription }}></p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Collapse.Panel>
      ))}
    </Collapse>
  )
  return toRender
}
