import React, { useState, useEffect } from "react"
import moment from "moment"

import { RouteComponentProps } from "react-router"
import { Row, Col, Typography } from "antd"
import { renderDate, ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import { getOfferngApprovalHist, searchOffering } from "~/ApiServices/Service/OfferingService"
import styles from "~/Pages/Manage/Courses/Offering/Approval/Approval.module.scss"

import { eventBus, REFRESH_OFFERING_APPROVAL_PAGE } from "~/utils/EventBus"
import OfferingApprovalModalOpenButton from "~/Component/Offering/Approval/OfferingApprovalModalOpenButton"

const { Title } = Typography

function OfferingApprovalPage(props: RouteComponentProps<{ offeringID: string }>) {
  const columns = [
    {
      title: "Status",
      dataIndex: "StateName"
    },
    {
      title: "Modified By",
      dataIndex: "ModifiedBy"
    },
    {
      title: "Modified Date",
      dataIndex: "ModifiedDate",
      render: renderDate
    },
    {
      title: "Remarks",
      dataIndex: "Remarks"
    },
    {
      title: "Send To",
      dataIndex: "RouteTo"
    }
  ]

  const offeringID = props.match.params.offeringID
  const [loading, setLoading] = useState<boolean>(false)
  const [statusCode, setStatusCode] = useState<string>()
  const [offeringApprovalHistory, setOfferingApprovalHistory] = useState<Array<any>>([])

  const expandableRowRender = (data: { [key: string]: any }, display: boolean): JSX.Element => {
    return (
      <>
        {display && (
          <div style={{ border: "1px solid", padding: "5px" }}>
            <Row>
              <Col span="10">Modified By:</Col>
              <Col span="14">{data.ModifiedBy}</Col>
            </Row>
            <Row>
              <Col span="10">Modified Date:</Col>
              <Col span="14">{data.ModifiedDate ? moment(data.ModifiedDate).format("YYYY-MM-DD") : ""}</Col>
            </Row>
            <Row>
              <Col span="10">Remarks:</Col>
              <Col span="14">{data.Remarks}</Col>
            </Row>
          </div>
        )}
      </>
    )
  }

  useEffect(() => {
    ;(async function () {
      setLoading(true)
      const result = await searchOffering({ OfferingID: offeringID })
      if (result && result.success) {
        setStatusCode(result.data.StatusCode)
      }
      setLoading(false)
    })()

    const loadOfferingApprovalHistory = async function () {
      setLoading(true)

      const result = await getOfferngApprovalHist({ OfferingID: Number(offeringID) })

      if (result && result.success) {
        setLoading(false)
        setOfferingApprovalHistory(
          result.data.map((x: any, index: number) => {
            x.key = index
            return x
          })
        )
      }
    }
    eventBus.subscribe(REFRESH_OFFERING_APPROVAL_PAGE, loadOfferingApprovalHistory)
    eventBus.publish(REFRESH_OFFERING_APPROVAL_PAGE)
    return () => {
      eventBus.unsubscribe(REFRESH_OFFERING_APPROVAL_PAGE)
    }
  }, [offeringID])

  return (
    <div className="site-layout-content">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" xs={24} sm={24} md={12}>
          <Title level={3}>Manage Offering Approval</Title>
        </Col>
        <Col className={`gutter-row ${styles.textAlignRight}`} xs={24} sm={24} md={12}>
          {statusCode && <OfferingApprovalModalOpenButton offeringId={parseInt(offeringID)} statusCode={statusCode} />}
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={`${styles.paddingTop10px}  ${styles.margin0px}`}>
        <Col className={`gutter-row ${styles.offeringApprovalDetails}`} xs={24} sm={24} md={24}>
          <ResponsiveTable
            columns={columns}
            dataSource={offeringApprovalHistory}
            loading={loading}
            bordered
            pagination={{ position: ["topLeft"], pageSize: 20 }}
            rowKey="OfferingApprovalHistID"
            expandableRowRender={expandableRowRender}
            breakpoints={["md", "lg", "xl", "xxl"]}
            responsiveColumnIndices={[1, 2, 3]}
            scroll={{ y: 600 }}
          />
        </Col>
      </Row>
    </div>
  )
}

export default OfferingApprovalPage
