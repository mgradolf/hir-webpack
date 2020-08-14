import React from "react"
import { Breadcrumb as AntdBreadcrumb } from "antd"
import { Link } from "react-router-dom"

const routeLabelMap = {
  "/": "Home",
  offering: "Offering",
  financial: "Financial",
  search: "Search",
  catalog: "Catalog"
}

function isDefinedRoute(route: string): route is keyof typeof routeLabelMap {
  return routeLabelMap[route as keyof typeof routeLabelMap] !== undefined
}
interface IBreadcrumbPath {
  label: string
  path: string
}

const generateBreadcrumbPath = (path: string): IBreadcrumbPath[] => {
  const breadcrumbPath = [{ path: "/", label: routeLabelMap["/"] }]
  const routesFollowingHome = path.split("/").slice(1)

  routesFollowingHome.reduce((path, route) => {
    if (path === breadcrumbPath[0].path) {
      path += route
    } else {
      path = `${path}/${route}`
    }

    breadcrumbPath.push({ path, label: isDefinedRoute(route) ? routeLabelMap[route] : route })
    return path
  }, breadcrumbPath[0].path)

  return breadcrumbPath
}

export function Breadcrumb(props: { path: string }) {
  const breadcrumbPath = generateBreadcrumbPath(props.path)

  return (
    <AntdBreadcrumb style={{ margin: "16px 0" }}>
      {breadcrumbPath.map((item, i) => (
        <AntdBreadcrumb.Item key={i}>
          <Link to={item.path}>{item.label}</Link>
        </AntdBreadcrumb.Item>
      ))}
    </AntdBreadcrumb>
  )
}
