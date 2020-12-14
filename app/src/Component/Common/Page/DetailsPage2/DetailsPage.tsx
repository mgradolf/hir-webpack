import React, { useEffect, useState } from "react"
import { IProcessedApiError } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { Row, Spin, Tabs, Typography } from "antd"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { DetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import DetailsSearchTab from "~/Component/Common/Page/DetailsPage2/DetailsSearchTab"
import DetailsTableTab from "~/Component/Common/Page/DetailsPage2/DetailsTableTab"
import DetailsCustomTab from "~/Component/Common/Page/DetailsPage2/DetailsCustomTab"

export const tabTypes = {
  summary: "summary",
  table: "table",
  searchtable: "searchtable",
  custom: "custom"
}

type TabType = "summary" | "table" | "searchtable" | "custom"
export interface IDetailsMeta {
  type: TabType
  title: string
  meta: any
}
export interface IDetailsPage {
  getMeta: (Params: any) => IDetailsMeta[]
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
  const [meta, setMeta] = useState<IDetailsMeta[]>([])
  const loadDetails = () => {
    setLoading(true)
    props.getDetails().then((x) => {
      setLoading(false)
      if (x.success && !x.data) {
        // setError({getErrorMessages: () => [{message: "Not Found"}]})
      } else if (x.success && x.data) {
        setTitle(x.data[`${props.titleKey}`])
        setMeta(props.getMeta(x.data))
      } else setError(x.error)
    })
  }

  useEffect(() => {
    loadDetails()
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
              switch (x.type) {
                case "summary":
                  return (
                    <Tabs.TabPane tab={x.title} key={i + 1}>
                      <DetailsSummary {...x.meta} />
                    </Tabs.TabPane>
                  )
                case "searchtable":
                  return (
                    <Tabs.TabPane tab={x.title} key={i + 1}>
                      <DetailsSearchTab {...x.meta} />
                    </Tabs.TabPane>
                  )
                case "table":
                  return (
                    <Tabs.TabPane tab={x.title} key={i + 1}>
                      <DetailsTableTab {...x.meta} />
                    </Tabs.TabPane>
                  )
                case "custom":
                  return (
                    <Tabs.TabPane tab={x.title} key={i + 1}>
                      <DetailsCustomTab {...x.meta} />
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
