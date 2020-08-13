import React from "react"
import { Breadcrumb as AntdBreadcrumb } from "antd"
import { Link } from "react-router-dom"

type IBreadcrumbItem = {
  route?: string
  label: string
}

interface IBreadcrumbProps {
  items: IBreadcrumbItem[]
}

export function Breadcrumb(props: IBreadcrumbProps) {
  return (
    <AntdBreadcrumb style={{ margin: "16px 0" }}>
      {props.items.map((item, i) =>
        item.route ? (
          <AntdBreadcrumb.Item key={i}>
            <Link to={item.route}>{item.label}</Link>
          </AntdBreadcrumb.Item>
        ) : (
          <AntdBreadcrumb.Item key={i}>{item.label}</AntdBreadcrumb.Item>
        )
      )}
    </AntdBreadcrumb>
  )
}
