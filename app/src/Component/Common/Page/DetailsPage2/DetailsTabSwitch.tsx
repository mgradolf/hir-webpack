import React, { useEffect, useState } from "react"
import { Tabs } from "antd"
import { DetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import DetailsSearchTab from "~/Component/Common/Page/DetailsPage2/DetailsSearchTab"
import DetailsTableTab from "~/Component/Common/Page/DetailsPage2/DetailsTableTab"
import DetailsCustomTab from "~/Component/Common/Page/DetailsPage2/DetailsCustomTab"
import { IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"

export interface IDetailsPageSubTab {
  meta: IDetailsTabMeta
  actions?: JSX.Element[]
}

export function DetailsPageSubTabSwitch(props: {
  meta?: IDetailsTabMeta[]
  child: any
  actions?: JSX.Element[]
  immediatechildTabKey?: string
  nextchildTabKeys?: string
}) {
  const [immediatechildTabKey, setImmediatechildTabKey] = useState<string>()
  const [nextchildTabKeys, setNextchildTabKeys] = useState<string>()
  useEffect(() => {
    console.log("props.immediatechildTabKey ", props.immediatechildTabKey)
    console.log("props.nextchildTabKeys ", props.nextchildTabKeys)
    if (props.nextchildTabKeys) {
      const __immediatechildTabKey = props.nextchildTabKeys.toString().split("")[0]
      setImmediatechildTabKey(__immediatechildTabKey)

      const ___childTabKey = props.nextchildTabKeys
        .toString()
        .split("")
        .filter((x: any, i: number) => i !== 0)
        .join("")

      setNextchildTabKeys(___childTabKey)
    }
  }, [props.immediatechildTabKey, props.nextchildTabKeys])
  return (
    <>
      {props.meta && props.meta.length > 0 ? (
        <Tabs
          defaultActiveKey={props.immediatechildTabKey}
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
                    <DetailsSummary {...x.tabMeta} />
                  </Tabs.TabPane>
                )
              case "searchtable":
                return (
                  <Tabs.TabPane tab={x.tabTitle} key={i}>
                    <DetailsSearchTab {...x.tabMeta} />
                  </Tabs.TabPane>
                )
              case "table":
                return (
                  <Tabs.TabPane tab={x.tabTitle} key={i}>
                    {/* {x && Array.isArray(x.multipleTabMetas) && x.multipleTabMetas.length > 0 ? ( */}
                    <DetailsPageSubTabSwitch
                      immediatechildTabKey={immediatechildTabKey}
                      nextchildTabKeys={nextchildTabKeys}
                      meta={x.multipleTabMetas}
                      child={<DetailsTableTab {...x.tabMeta} />}
                    />
                  </Tabs.TabPane>
                )
              // <Tabs.TabPane tab={x.tabTitle} key={i}>
              //   <DetailsPageSubTabSwitch
              //     childTabKey={childTabKey}
              //     meta={x.multipleTabMetas}
              //     child={<DetailsTableTab {...x.tabMeta} />}
              //   />
              // </Tabs.TabPane>
              // )
              case "custom":
                return (
                  <Tabs.TabPane tab={x.tabTitle} key={i}>
                    <DetailsCustomTab {...x.tabMeta} />
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
