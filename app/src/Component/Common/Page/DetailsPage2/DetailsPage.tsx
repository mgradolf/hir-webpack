import React, { useEffect, useState } from "react"
import { IProcessedApiError } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { Row, Spin, Tabs, Typography } from "antd"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { DetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import DetailsSearchTab from "~/Component/Common/Page/DetailsPage2/DetailsSearchTab"
import DetailsTableTab from "~/Component/Common/Page/DetailsPage2/DetailsTableTab"
import DetailsCustomTab from "~/Component/Common/Page/DetailsPage2/DetailsCustomTab"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"

export const tabTypes = {
  summary: "summary",
  table: "table",
  searchtable: "searchtable",
  custom: "custom"
}

type TabType = "summary" | "table" | "searchtable" | "custom"
export interface IDetailsTabMeta {
  tabType: TabType
  tabTitle: string
  tabMeta: any
}

export interface IDetailsMeta {
  pageTitle?: string
  tabs: IDetailsTabMeta[]
}

export interface IDetailsPage {
  getMeta: (Params: any) => IDetailsMeta
  getDetails: () => Promise<IApiResponse>
  entityType?: string
  entityID?: number
  titleKey?: string
  actions?: JSX.Element[]
}

export function DetailsPage(props: IDetailsPage) {
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState<string>()
  const [error, setError] = useState<IProcessedApiError>()
  const [meta, setMeta] = useState<IDetailsTabMeta[]>([])
  const loadDetails = () => {
    setLoading(true)
    setError(undefined)
    props.getDetails().then((x) => {
      setLoading(false)
      if (x.success && !x.data) {
        // setError({getErrorMessages: () => [{message: "Not Found"}]})
      } else if (x.success && x.data) {
        setMeta(props.getMeta(x.data).tabs)
        setTitle(props.getMeta(x.data).pageTitle)
      } else setError(x.error)
    })
  }

  useEffect(() => {
    eventBus.subscribe(REFRESH_PAGE, loadDetails)
    eventBus.publish(REFRESH_PAGE, loadDetails)
    return () => {
      eventBus.unsubscribe(REFRESH_PAGE)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {loading && (
        <Row justify="center" align="middle">
          <Spin size="large" />
        </Row>
      )}
      {!loading && error && <p>Not Found</p>}
      {!loading && !error && meta.length > 0 && (
        <div className="site-layout-content">
          {title && (
            <Row>
              <Typography.Title level={3}>{title}</Typography.Title>
            </Row>
          )}
          <Tabs defaultActiveKey="1" type="card" size="large" tabBarExtraContent={props.actions ? props.actions : []}>
            {meta.map((x, i) => {
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
                      <DetailsTableTab {...x.tabMeta} />
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
        </div>
      )}
    </>
  )
}
