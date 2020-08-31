import React, { useState, useEffect } from "react"
import moment from "moment"

import { RouteComponentProps } from "react-router"
import { Row, Col, Table, Typography, Space, Button } from "antd"
import { getGroupOfferings, getRequisiteOfferingGroup } from "~/ApiServices/Service/OfferingService"
import styles from "~/pages/Offering/Requisite/Requisite.module.scss"

import PrerequisiteGroupOfferingModalOpenButton from "~/component/Offering/Requisite/PrerequisiteGroupOfferingModalOpenButton"
import PrerequisiteGroups from "~/component/Offering/Requisite/PrerequisiteGroups"
import RequisiteRemoveLink from "~/component/Offering/Requisite/RequisiteRemoveLink"
import { REFRESH_OFFERING_REQUISITE_GROUP_PAGE } from "~/utils/EventList"
import EventBus from "~/utils/EventBus"

const { Title } = Typography

function OfferingRequisitePage(props: RouteComponentProps<{ id: string }>) {
  const columns = [
    {
      title: "Offering Code",
      dataIndex: "OfferingCode"
    },
    {
      title: "Offering Name",
      dataIndex: "Name"
    },
    {
      title: "Creation Date",
      dataIndex: "CreationDate",
      render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : "")
    },
    {
      title: "Termination Date",
      dataIndex: "TerminationDate",
      render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : "")
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <RequisiteRemoveLink offeringId={record.OfferingID} requisiteGroupId={record.RequisiteGroupID} />
        </Space>
      )
    }
  ]

  const offeringID = props.match.params.id
  const [requisiteGroupID, setRequisiteGroupID] = useState<number>()
  const [hasRequisiteGroup, setHasRequisiteGroup] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [policyTypeList, setPolicyTypeList] = useState<Array<any>>([])
  const [offeringRequisiteGroupDetails, setofferingRequisiteGroupDetails] = useState<Array<any>>([])

  const loadOfferingRequisiteGroupDetails = async function () {
    setLoading(true)

    const result = await getGroupOfferings(Number(requisiteGroupID))

    if (result && result.success) {
      setLoading(false)
      setofferingRequisiteGroupDetails(
        result.data.map((x: any, index: number) => {
          x.key = index
          return x
        })
      )
    }
  }

  useEffect(() => {
    const loadOfferingRequisiteGroup = async function () {
      setLoading(true)

      const result = await getRequisiteOfferingGroup(Number(offeringID))

      if (result && result.success && Array.isArray(result.data) && result.data.length > 0) {
        setLoading(false)
        setRequisiteGroupID(result.data[0].RequisiteOfferingGroupID)
        setHasRequisiteGroup(true)
        setPolicyTypeList(result.data)
      }
    }
    EventBus.subscribe(REFRESH_OFFERING_REQUISITE_GROUP_PAGE, loadOfferingRequisiteGroup)
    EventBus.publish(REFRESH_OFFERING_REQUISITE_GROUP_PAGE)
    return () => {
      EventBus.unsubscribe(REFRESH_OFFERING_REQUISITE_GROUP_PAGE)
    }
  }, [offeringID])

  const handleSelection = (param: any) => {
    setRequisiteGroupID(param.RequisiteGroupID)
    loadOfferingRequisiteGroupDetails()
  }

  return (
    <div className="site-layout-content">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" xs={24} sm={24} md={24}>
          <Title level={3}>Manage Offering Prerequisite</Title>
        </Col>
      </Row>

      <PrerequisiteGroups offeringId={parseInt(offeringID)} policyData={policyTypeList} onSelected={handleSelection} />

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className={`gutter-row ${styles.offeringRequisiteDetails}`} xs={24} sm={24} md={24}>
          <PrerequisiteGroupOfferingModalOpenButton
            offeringId={parseInt(offeringID)}
            hasRequisiteGroup={hasRequisiteGroup}
          />
          <Table
            className={styles.paddingTop10px}
            columns={columns}
            dataSource={offeringRequisiteGroupDetails}
            loading={loading}
            bordered
            pagination={{ position: ["bottomRight"] }}
            scroll={{ x: "fit-content" }}
          />
        </Col>
      </Row>
    </div>
  )
}

export default OfferingRequisitePage
