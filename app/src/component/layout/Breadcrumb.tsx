import React from "react"
import { Breadcrumb as AntdBreadcrumb } from "antd"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { AppState } from "~/store"

function transformRouteToLabel(route: string): string {
  return route.replace(/\w/, (str) => str.toUpperCase()).replace(/\W/g, " ")
}

interface IBreadcrumbPath {
  label: string
  path: string
}

const generateBreadcrumbPath = (path: string): IBreadcrumbPath[] => {
  const breadcrumbPath = [{ path: "/", label: "Home" }]
  const routesFollowingHome = path.split("/").slice(1)

  routesFollowingHome.reduce((path, route) => {
    if (path === breadcrumbPath[0].path) {
      path += route
    } else {
      path = `${path}/${route}`
    }

    breadcrumbPath.push({ path, label: transformRouteToLabel(route) })
    return path
  }, breadcrumbPath[0].path)

  return breadcrumbPath
}

export function Breadcrumb() {
  const { location } = useSelector((state: AppState) => state.router)
  const breadcrumbPath = generateBreadcrumbPath(location.pathname)

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
