import React from "react"
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

export function DetailsPageSubTabSwitch(props: { meta?: IDetailsTabMeta[]; child: any }) {
  console.log("props.multipleTabMetas : ", props.meta)
  return (
    <>
      {props.meta && props.meta.length > 0 ? (
        <Tabs defaultActiveKey="1" type="card" size="large">
          {props.meta.map((x, i) => {
            switch (x.tabType) {
              case "summary":
                return (
                  <Tabs.TabPane tab={x.tabTitle} key={i + 1}>
                    <DetailsSummary {...x.tabMeta} />
                  </Tabs.TabPane>
                )
              case "searchtable":
                return (
                  <Tabs.TabPane tab={x.tabTitle} key={i + 1}>
                    <DetailsSearchTab {...x.tabMeta} />
                  </Tabs.TabPane>
                )
              case "table":
                return (
                  <Tabs.TabPane tab={x.tabTitle} key={i + 1}>
                    <DetailsPageSubTabSwitch meta={x.multipleTabMetas} child={<DetailsTableTab {...x.tabMeta} />} />
                  </Tabs.TabPane>
                )
              case "custom":
                return (
                  <Tabs.TabPane tab={x.tabTitle} key={i + 1}>
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
