import React from "react"
import Menu from "antd/lib/menu"
import { Layout } from "antd"
import { Link } from "react-router-dom"
import { logout } from "~/ApiServices/Login"
import styles from "~/Layout/DefaultLayout.module.scss"
import { sidebarMenus } from "~/Component/Layout/SidebarMenus"

export default function Sidebar(props: { collapsed: boolean }) {
  let counter = 0
  return (
    <Layout.Sider width={250} breakpoint="xs" collapsedWidth={0} trigger={null} collapsible collapsed={props.collapsed}>
      <Link to="/">
        <div className={[styles.expanded, props.collapsed ? styles.collapsed : null].join(" ")}></div>
      </Link>
      <Menu theme="dark" mode="inline" style={{ overflow: "scroll", height: "100vh" }}>
        {sidebarMenus.map((x, i) => {
          if (x.submenu && x.submenu?.length > 0) {
            return (
              <Menu.SubMenu key={counter++} title={x.title}>
                {x.submenu.map((y, j) => {
                  if (y.submenu.length > 0) {
                    return (
                      <Menu.SubMenu key={counter++} title={y.title}>
                        {
                          // eslint-disable-next-line
                          y.submenu.map((z, k) => {
                            if (z.submenu.length > 0) {
                              return (
                                // eslint-disable-next-line
                                <Menu.SubMenu key={counter++} title={z.title}>
                                  {z.submenu.map((w, m) => {
                                    return (
                                      <Menu.Item className={w.url === "" ? "disabled-link" : ""} key={counter++}>
                                        <Link to={w.url || "#"}>{w.title}</Link>
                                      </Menu.Item>
                                    )
                                  })}
                                </Menu.SubMenu>
                              )
                            }
                            return (
                              <Menu.Item className={z.url === "" ? "disabled-link" : ""} key={counter++}>
                                <Link to={z.url || "#"}>{z.title}</Link>
                              </Menu.Item>
                            )
                          })
                        }
                      </Menu.SubMenu>
                    )
                  }
                  return (
                    <Menu.Item className={y.url === "" ? "disabled-link" : ""} key={counter++}>
                      <Link to={y.url || "#"}>{y.title}</Link>
                    </Menu.Item>
                  )
                })}
              </Menu.SubMenu>
            )
          } else {
            return (
              <Menu.Item key={counter++}>
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

// function FourthLevel(props: { submenu: ISidebarMenu[]; keyprefix: number }) {
//   return (
//     <>
//       {props.submenu.map((x, i) => {
//         // if (x.submenu.length > 0) {
//         //   return (
//         //     <Menu.SubMenu title={x.title} key={props.keyprefix + " " + i}>
//         //       <FirstLevel submenu={x.submenu} keyprefix={i}/>
//         //     </Menu.SubMenu>
//         //   )
//         // }
//         return (
//           <Menu.Item key={props.keyprefix + " " + i}>
//             <Link to={x.url || "#"}>{x.title}</Link>
//           </Menu.Item>
//         )
//       })}
//     </>
//   )
// }
// function ThirdLevel(props: { submenu: ISidebarMenu[]; keyprefix: number }) {
//   return (
//     <>
//       {props.submenu.map((x, i) => {
//         if (x.submenu.length > 0) {
//           return (
//             <Menu.SubMenu title={x.title} key={props.keyprefix + " " + i}>
//               <FourthLevel submenu={x.submenu} keyprefix={i} />
//             </Menu.SubMenu>
//           )
//         }
//         return (
//           <Menu.Item key={props.keyprefix + " " + i}>
//             <Link to={x.url || "#"}>{x.title}</Link>
//           </Menu.Item>
//         )
//       })}
//     </>
//   )
// }
// function SecondLevel(props: { submenu: ISidebarMenu[]; keyprefix: number }) {
//   return (
//     <>
//       {props.submenu.map((x, i) => {
//         if (x.submenu.length > 0) {
//           return (
//             <Menu.SubMenu title={x.title} key={props.keyprefix + " " + i}>
//               <ThirdLevel submenu={x.submenu} keyprefix={i} />
//             </Menu.SubMenu>
//           )
//         }
//         return (
//           <Menu.Item key={props.keyprefix + " " + i}>
//             <Link to={x.url || "#"}>{x.title}</Link>
//           </Menu.Item>
//         )
//       })}
//     </>
//   )
// }
// function FirstLevel(props: { menu: ISidebarMenu; keyprefix: any }) {
//   if (props.menu.submenu.length > 0) {
//     return (
//       <>
//         <Menu.SubMenu title={props.menu.title} key={props.keyprefix}>
//           {props.menu.submenu.map((x, i) => (
//             <FirstLevel menu={x} keyprefix={props.keyprefix + " " + i}/>
//           ))}
//         </Menu.SubMenu>
//         )
//       </>
//     )
//   }
//   return (
//     <Menu.Item key={props.keyprefix}>
//       <Link to={props.menu.url || "#"}>{props.menu.title}</Link>
//     </Menu.Item>
//   )
// }
// export default function Sidebar(props: { collapsed: boolean }) {
//   return (
//     <Layout.Sider
//       style={{ minHeight: "100vh" }}
//       breakpoint="xs"
//       collapsedWidth={0}
//       trigger={null}
//       collapsible
//       collapsed={props.collapsed}
//     >
//       <div className={[styles.expanded, props.collapsed ? styles.collapsed : null].join(" ")}></div>
//       <Menu theme="dark" mode="inline">
//         {sidebarMenus.map((x, i) => (
//           <FirstLevel menu={x} keyprefix={0} />
//         ))}
//         <Menu.Item key="1000000" onClick={logout}>
//           Logout
//         </Menu.Item>
//       </Menu>
//     </Layout.Sider>
//   )
// }

// function SidebarMenuRenderer(props: { sidebarMenu: ISidebarMenu; keyprefix: number }) {
//   if (props.sidebarMenu.submenu.length === 0) {
//     return (
//       <Menu.Item key={props.keyprefix}>
//         <Link to={props.sidebarMenu.url || "#"}>{props.sidebarMenu.title}</Link>
//       </Menu.Item>
//     )
//   }
//   return (
//     <>
//       <Menu.SubMenu key={props.keyprefix} title={props.sidebarMenu.title}>
//         {props.sidebarMenu.submenu.map((x, i) => {
//           return <SidebarMenuRenderer sidebarMenu={x} keyprefix={i} />
//         })}
//       </Menu.SubMenu>
//     </>
//   )
// }
