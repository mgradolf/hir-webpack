import React, { useEffect, useState } from "react"
import { Breadcrumb as AntdBreadcrumb } from "antd"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { AppState } from "~/Store"
import { getEntityById } from "~/ApiServices/Service/EntityService"
import { PARAM_TYPE_REQUEST } from "~/utils/Constants"

function transformRouteToLabel(route: string | number): string | number {
  if (typeof route === "number") return route
  return route.replace(/\w/, (str) => str.toUpperCase()).replace(/\W/g, " ")
}

interface IBreadcrumbPath {
  label: string | number
  path: string
}

const cache: any = {}
const transformIdToName = async (paths: Array<any>): Promise<Array<any>> => {
  let previousPath: any = {}
  for (const x of paths) {
    if (typeof x.label === "number" && !cache[x.path]) {
      if (previousPath.label !== PARAM_TYPE_REQUEST) {
        const result: any = await getEntityById(previousPath.label, x.label)
        if (result.success && result.data) {
          x.label = result.data.Name || result.data.SectionNumber
          cache[x.path] = x
        }
      }
    } else if (cache[x.path]) {
      x.label = cache[x.path].label
    }
    previousPath = x
  }
  return paths
}

const generateBreadcrumbPath = (path: string): IBreadcrumbPath[] => {
  const breadcrumbPaths: Array<IBreadcrumbPath> = [{ path: "/", label: "Home" }]
  if (path === "/") return breadcrumbPaths

  const routesFollowingHome = path.split("/").slice(1)
  routesFollowingHome.reduce((path, route) => {
    let convertedRoute: string | number = route
    if (!isNaN(Number(route))) {
      convertedRoute = Number(route)
    }
    if (path === breadcrumbPaths[0].path) {
      path += route
    } else {
      path = `${path}/${route}`
    }

    breadcrumbPaths.push({ path, label: transformRouteToLabel(convertedRoute) })
    return path
  }, breadcrumbPaths[0].path)

  return breadcrumbPaths
}

export function Breadcrumb() {
  const { location } = useSelector((state: AppState) => state.router)
  const [breadcrumbPaths, setBreadcrumbPaths] = useState<Array<IBreadcrumbPath>>([])
  useEffect(() => {
    ;(async () => {
      let tempBreadcrumbPaths = generateBreadcrumbPath(location.pathname)
      tempBreadcrumbPaths = await transformIdToName(tempBreadcrumbPaths)
      setBreadcrumbPaths(tempBreadcrumbPaths)
    })()
  }, [location.pathname])

  return (
    <AntdBreadcrumb style={{ margin: "16px 0" }}>
      {breadcrumbPaths.map((item, i) => (
        <AntdBreadcrumb.Item key={i}>
          <Link to={item.path}>{item.label}</Link>
        </AntdBreadcrumb.Item>
      ))}
    </AntdBreadcrumb>
  )
}
