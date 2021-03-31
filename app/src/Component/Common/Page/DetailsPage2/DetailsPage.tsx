import React, { useEffect, useState } from "react"
import { IProcessedApiError } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { Row, Spin, Tabs, Typography } from "antd"
import { DetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import DetailsSearchTab from "~/Component/Common/Page/DetailsPage2/DetailsSearchTab"
import DetailsTableTab from "~/Component/Common/Page/DetailsPage2/DetailsTableTab"
import DetailsCustomTab from "~/Component/Common/Page/DetailsPage2/DetailsCustomTab"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import { IDetailsPage, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { DetailsPageSubTabSwitch } from "~/Component/Common/Page/DetailsPage2/DetailsTabSwitch"
import { querystringToObject } from "~/utils/QueryStringToObjectConverter"

export function DetailsPage(props: IDetailsPage) {
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState<string>()
  const [error, setError] = useState<IProcessedApiError>()
  const [meta, setMeta] = useState<IDetailsTabMeta[]>([])
  const [defaultTabKey, setDefaultTabKey] = useState<string>()
  const [immediatechildTabKey, setImmediatechildTabKey] = useState<string>()
  const [nextchildTabKeys, setNextchildTabKeys] = useState<string>()

  useEffect(() => {
    const __defaultTabKey: { [key: string]: any } = querystringToObject()
    if (__defaultTabKey && __defaultTabKey["defaultTabKey"]) {
      const key = __defaultTabKey["defaultTabKey"].toString().split("")[0]
      setDefaultTabKey(key)

      const __immediatechildTabKey = __defaultTabKey["defaultTabKey"]
        .toString()
        .split("")
        .filter((x: any, i: number) => i !== 0)[0]

      setImmediatechildTabKey(__immediatechildTabKey)

      const __nextchildTabKeys = __defaultTabKey["defaultTabKey"]
        .toString()
        .split("")
        .filter((x: any, i: number) => i !== 0 && i !== 1)
        .join()
      setNextchildTabKeys(__nextchildTabKeys)
    }
  }, [])

  const loadDetails = () => {
    setLoading(true)
    setError(undefined)
    props.getDetails().then((x) => {
      setLoading(false)
      if (x.success && x.data) {
        const { tabs, pageTitle } = props.getMeta(x.data, props.entityType, props.entityID)
        console.log(tabs)

        setMeta(tabs)
        setTitle(pageTitle)
      } else setError(x.error)
    })
  }

  useEffect(() => {
    const eventName = props.refreshEventName ? props.refreshEventName : REFRESH_PAGE

    eventBus.subscribe(eventName, loadDetails)
    eventBus.publish(eventName, loadDetails)
    return () => {
      eventBus.unsubscribe(eventName)
    }
    // eslint-disable-next-line
  }, [props.entityID])

  return (
    <>
      {loading && (
        <Row justify="center" align="middle">
          <Spin size="large" />
        </Row>
      )}
      {!loading && error && <p>Something went wrong!</p>}
      {!loading && !error && meta.length > 0 && (
        <div className="site-layout-content">
          {title && (
            <Row>
              <Typography.Title level={3}>{title}</Typography.Title>
            </Row>
          )}
          <Tabs
            defaultActiveKey={defaultTabKey}
            type="card"
            size="large"
            tabBarExtraContent={props.actions ? props.actions : []}
          >
            {meta.map((x, i) => {
              i = i + 1
              switch (x.tabType) {
                case "summary":
                  return (
                    <Tabs.TabPane tab={x.tabTitle} key={i}>
                      <DetailsPageSubTabSwitch
                        immediatechildTabKey={immediatechildTabKey}
                        nextchildTabKeys={nextchildTabKeys}
                        meta={x.multipleTabMetas}
                        child={<DetailsSummary {...x.tabMeta} />}
                      />
                    </Tabs.TabPane>
                  )
                case "searchtable":
                  return (
                    <Tabs.TabPane tab={x.tabTitle} key={i}>
                      <DetailsPageSubTabSwitch
                        immediatechildTabKey={immediatechildTabKey}
                        nextchildTabKeys={nextchildTabKeys}
                        meta={x.multipleTabMetas}
                        child={<DetailsSearchTab {...x.tabMeta} />}
                      />
                    </Tabs.TabPane>
                  )
                case "table":
                  return (
                    <Tabs.TabPane tab={x.tabTitle} key={i}>
                      <DetailsPageSubTabSwitch
                        immediatechildTabKey={immediatechildTabKey}
                        nextchildTabKeys={nextchildTabKeys}
                        meta={x.multipleTabMetas}
                        actions={x.actions}
                        child={<DetailsTableTab {...x.tabMeta} />}
                      />
                    </Tabs.TabPane>
                  )
                case "custom":
                  return (
                    <Tabs.TabPane tab={x.tabTitle} key={i}>
                      <DetailsPageSubTabSwitch
                        immediatechildTabKey={immediatechildTabKey}
                        nextchildTabKeys={nextchildTabKeys}
                        meta={x.multipleTabMetas}
                        child={<DetailsCustomTab {...x.tabMeta} />}
                      />
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
