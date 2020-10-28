import React from "react"
import Menu from "antd/lib/menu"
import { Layout } from "antd"
import { Link } from "react-router-dom"
import { logout } from "~/ApiServices/Login"
import styles from "~/Layout/DefaultLayout.module.scss"
import { sidebarMenus } from "~/Component/Layout/SidebarMenus"

export default function Sidebar(props: { collapsed: boolean }) {
  return (
    <Layout.Sider
      style={{ minHeight: "100vh" }}
      breakpoint="xs"
      collapsedWidth={0}
      trigger={null}
      collapsible
      collapsed={props.collapsed}
    >
      <div className={[styles.expanded, props.collapsed ? styles.collapsed : null].join(" ")}></div>
      <Menu theme="dark" mode="inline">
        {/* {sidebarMenus.map((x, i) => (
          <SidebarMenuRenderer sidebarMenu={x} keyprefix={i} />
        ))} */}
        {sidebarMenus.map((x, i) => {
          if (x.submenu && x.submenu?.length > 0) {
            return (
              <Menu.SubMenu key={i} title={x.title}>
                {x.submenu.map((y, j) => {
                  if (y.submenu.length > 0) {
                    return (
                      <Menu.SubMenu key={i + " " + j} title={y.title}>
                        {y.submenu.map((z, k) => (
                          <Menu.Item key={j + " " + i + " " + k}>
                            <Link to={z.url || "#"}>{z.title}</Link>
                          </Menu.Item>
                        ))}
                      </Menu.SubMenu>
                    )
                  }
                  return (
                    <Menu.Item key={j + " " + i}>
                      <Link to={y.url || "#"}>{y.title}</Link>
                    </Menu.Item>
                  )
                })}
              </Menu.SubMenu>
            )
          } else {
            return (
              <Menu.Item key={i}>
                <Link to={x.url || "#"}>{x.title}</Link>
              </Menu.Item>
            )
          }
        })}
        <Menu.Item key="2" onClick={logout}>
          Logout
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  )
}

// function SidebarMenuRenderer(props: { sidebarMenu: ISidebarMenu; keyprefix: number }) {
// if (props.sidebarMenu.submenu.length > 0) {
//   return (
//     <Menu.SubMenu key={props.keyprefix} title={props.sidebarMenu.title}>
//       {props.sidebarMenu.submenu.map((x, i) => {
//         return <>{x.submenu.length > 0 && <SidebarMenuRenderer sidebarMenu={x} keyprefix={i} />}</>
//       })}
//     </Menu.SubMenu>
//   )
// }
//   return (
//     <Menu.Item>
//       <Link to={props.sidebarMenu.url || "#"}>{props.sidebarMenu.title}</Link>
//     </Menu.Item>
//   )
// }
