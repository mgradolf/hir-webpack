import { Collapse } from "antd"
import React from "react"
import { Link } from "react-router-dom"

export default function ReportPage() {
  const reports: { header: string; reports: { title: string; url: string }[] }[] = [
    {
      header: "Course",
      reports: [
        { title: "Catalog Design Information", url: "#" },
        { title: "Offering Seat Capacity Utilization", url: "#" }
      ]
    },
    {
      header: "Financial",
      reports: [{ title: "Purchase Order", url: "/report/financial/purchase-order" }]
    },
    { header: "Instructor", reports: [] },
    { header: "Membership", reports: [] },
    { header: "Product", reports: [] },
    { header: "Program", reports: [] },
    { header: "Registration", reports: [] },
    { header: "Section", reports: [] },
    { header: "Student", reports: [] }
  ]
  return (
    <>
      {reports.map((item, i) => (
        <Collapse defaultActiveKey={[i]} accordion>
          <Collapse.Panel header={item.header} key="0">
            <ul>
              {item.reports.map((report) => (
                <li>
                  <Link to={report.url}>{report.title} </Link>
                </li>
              ))}
            </ul>
          </Collapse.Panel>
        </Collapse>
      ))}
    </>
  )
}
