import React, { useEffect, useState } from "react"
import { Tabs } from "antd"
import { DetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import DetailsSearchTab, { IDetailsSearchTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsSearchTab"
import DetailsTableTab, { IDetailsTableTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsTableTab"
import DetailsCustomTab, { IDetailsCustomTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsCustomTab"
import { IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { objectToQueryString } from "~/utils/ObjectToQueryStringConverter"
import { querystringToObject } from "~/utils/QueryStringToObjectConverter"
import { IDetailsSummary } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"

export interface IDetailsPageSubTab {
  meta: IDetailsTabMeta
  actions?: JSX.Element[]
}

export function DetailsPageSubTabSwitch(props: {
  meta?: IDetailsTabMeta[]
  child: any
  actions?: JSX.Element[]
  tabLevel: number
}) {
  const [activeTabKey, setActiveTabKey] = useState("1")

  const changeActiveTabkey = (key: string) => {
    setActiveTabKey(key)

    const activeTabKesFromQueryParams: any = querystringToObject()
    if (activeTabKesFromQueryParams && activeTabKesFromQueryParams["activeTabKey"]) {
      const __activeTabKesFromQueryParams = activeTabKesFromQueryParams["activeTabKey"].toString().split("")
      __activeTabKesFromQueryParams[props.tabLevel] = key
      activeTabKesFromQueryParams["activeTabKey"] = __activeTabKesFromQueryParams.slice(0, props.tabLevel + 1).join("")
      const _queryString = objectToQueryString(activeTabKesFromQueryParams)
      window.history && window.history.pushState({}, "", _queryString)
    }
  }

  useEffect(() => {
    const activeTabKesFromQueryParams: { [key: string]: any } = querystringToObject()
    if (activeTabKesFromQueryParams && activeTabKesFromQueryParams["activeTabKey"]) {
      const currentActiveTabkey = activeTabKesFromQueryParams["activeTabKey"].toString().split("")[props.tabLevel]
      setActiveTabKey(currentActiveTabkey)
    }
  }, [props.tabLevel])
  return (
    <>
      {props.meta && props.meta.length > 0 ? (
        <Tabs
          activeKey={activeTabKey}
          onChange={changeActiveTabkey}
          type="card"
          size="large"
          tabBarExtraContent={props.actions ? props.actions : []}
        >
          {props.meta.map((x, i) => {
            i = i + 1
            switch (x.tabType) {
              case "summary":
                return (
                  <Tabs.TabPane tab={x.tabTitle} key={i}>
                    <DetailsSummary {...(x.tabMeta as IDetailsSummary)} />
                  </Tabs.TabPane>
                )
              case "searchtable":
                return (
                  <Tabs.TabPane tab={x.tabTitle} key={i}>
                    <DetailsSearchTab {...(x.tabMeta as IDetailsSearchTabProp)} />
                  </Tabs.TabPane>
                )
              case "table":
                return (
                  <Tabs.TabPane tab={x.tabTitle} key={i}>
                    <DetailsPageSubTabSwitch
                      tabLevel={props.tabLevel + 1}
                      // nextActivechildTabKeys={nextActivechildTabKeys}
                      meta={x.multipleTabMetas}
                      actions={x.actions}
                      child={<DetailsTableTab {...(x.tabMeta as IDetailsTableTabProp)} />}
                    />
                  </Tabs.TabPane>
                )
              case "custom":
                return (
                  <Tabs.TabPane tab={x.tabTitle} key={i}>
                    <DetailsCustomTab {...(x.tabMeta as IDetailsCustomTabProp)} />
                  </Tabs.TabPane>
                )

              default:
                return <p>Can not load</p>
            }
          })}
        </Tabs>
      ) : (
        props.child
      )}
    </>
  )
}
