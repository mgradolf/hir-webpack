import React from "react"
import { Breadcrumb as AntdBreadcrumb } from "antd"

export function Breadcrumb() {
  return (
    <AntdBreadcrumb style={{ margin: "16px 0" }}>
      <AntdBreadcrumb.Item>
        <a href="/">Home</a>
      </AntdBreadcrumb.Item>
      <AntdBreadcrumb.Item>
        <a href="/offering">Offering</a>
      </AntdBreadcrumb.Item>
      <AntdBreadcrumb.Item>Search</AntdBreadcrumb.Item>
    </AntdBreadcrumb>
  )
}
