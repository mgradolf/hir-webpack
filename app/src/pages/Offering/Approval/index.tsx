import React, { useState, useEffect } from "react"
import moment from "moment"

import { RouteComponentProps } from "react-router"
import { Row, Col, Typography } from "antd"
import ResponsiveTable from "~/Component/ResponsiveTable"
import { getOfferngApprovalHist } from "~/ApiServices/Service/OfferingService"
import styles from "~/pages/Offering/Approval/Approval.module.scss"

import { eventBus, REFRESH_OFFERING_APPROVAL_PAGE } from "~/utils/EventBus"
import OfferingApprovalModalOpenButton from "~/Component/Offering/Approval/OfferingApprovalModalOpenButton"

const { Title } = Typography

function OfferingApprovalPage(props: RouteComponentProps<{ id: string }>) {
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
      render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : "")
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

  const offeringID = props.match.params.id
  const [loading, setLoading] = useState<boolean>(false)
  const [offeringApprovalHistory, setOfferingApprovalHistory] = useState<Array<any>>([])

  useEffect(() => {
    const loadOfferingApprovalHistory = async function () {
      setLoading(true)

      const result = await getOfferngApprovalHist(Number(offeringID))

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
          <OfferingApprovalModalOpenButton offeringId={parseInt(offeringID)} />
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={styles.paddingTop10px}>
        <Col className={`gutter-row ${styles.offeringApprovalDetails}`} xs={24} sm={24} md={24}>
          <ResponsiveTable
            columns={columns}
            dataSource={offeringApprovalHistory}
            loading={loading}
            bordered
            pagination={{ position: ["topLeft"] }}
            scroll={{ x: "fit-content" }}
          />
        </Col>
      </Row>
    </div>
  )
}

export default OfferingApprovalPage
