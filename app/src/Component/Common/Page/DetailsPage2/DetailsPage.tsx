import React, { useEffect, useState } from "react"
import { IProcessedApiError } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { Row, Spin, Tabs, Typography } from "antd"
import DetailsSearchTab, { IDetailsSearchTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsSearchTab"
import DetailsTableTab, { IDetailsTableTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsTableTab"
import DetailsCustomTab, { IDetailsCustomTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsCustomTab"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import { IDetailsPage, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { DetailsPageSubTabSwitch } from "~/Component/Common/Page/DetailsPage2/DetailsTabSwitch"
import { querystringToObject } from "~/utils/QueryStringToObjectConverter"
import { objectToQueryString } from "~/utils/ObjectToQueryStringConverter"
import { DetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { IDetailsSummary } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"

export function DetailsPage(props: IDetailsPage) {
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState<string>()
  const [error, setError] = useState<IProcessedApiError>()
  const [meta, setMeta] = useState<IDetailsTabMeta[]>([])
  const [activeTabKey, setActiveTabKey] = useState<string>()

  const changeActiveTabkey = (key: string) => {
    setActiveTabKey(key)
    const _queryString = objectToQueryString({ activeTabKey: `${key}1` })
    window.history && window.history.pushState({}, "", _queryString)
  }

  useEffect(() => {
    const __defaultTabKey: { [key: string]: any } = querystringToObject()
    if (__defaultTabKey && __defaultTabKey["activeTabKey"]) {
      const key = __defaultTabKey["activeTabKey"].toString().split("")[0]
      setActiveTabKey(key)
    } else {
      changeActiveTabkey("1")
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
            activeKey={activeTabKey}
            onChange={changeActiveTabkey}
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
                        tabLevel={1}
                        meta={x.multipleTabMetas}
                        child={<DetailsSummary {...(x.tabMeta as IDetailsSummary)} />}
                      />
                    </Tabs.TabPane>
                  )
                case "searchtable":
                  return (
                    <Tabs.TabPane tab={x.tabTitle} key={i}>
                      <DetailsPageSubTabSwitch
                        tabLevel={1}
                        meta={x.multipleTabMetas}
                        child={<DetailsSearchTab {...(x.tabMeta as IDetailsSearchTabProp)} />}
                      />
                    </Tabs.TabPane>
                  )
                case "table":
                  return (
                    <Tabs.TabPane tab={x.tabTitle} key={i}>
                      <DetailsPageSubTabSwitch
                        tabLevel={1}
                        meta={x.multipleTabMetas}
                        actions={x.actions}
                        child={<DetailsTableTab {...(x.tabMeta as IDetailsTableTabProp)} />}
                      />
                    </Tabs.TabPane>
                  )
                case "custom":
                  return (
                    <Tabs.TabPane tab={x.tabTitle} key={i}>
                      <DetailsPageSubTabSwitch
                        tabLevel={1}
                        meta={x.multipleTabMetas}
                        child={<DetailsCustomTab {...(x.tabMeta as IDetailsCustomTabProp)} />}
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
