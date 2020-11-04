import moment from "moment"
import React, { useState, useEffect } from "react"
import { RouteComponentProps } from "react-router"
import { Row, Col, Typography, Space } from "antd"
import { getGroupOfferings, getRequisiteOfferingGroup } from "~/ApiServices/Service/OfferingService"
import { ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import PrerequisiteGroupOfferingModalOpenButton from "~/Component/Offering/Requisite/PrerequisiteGroupOfferingModalOpenButton"
import PrerequisiteGroups from "~/Component/Offering/Requisite/PrerequisiteGroups"
import RequisiteOfferingRemoveLink from "~/Component/Offering/Requisite/RequisiteGroupOfferingRemoveLink"
import { REFRESH_OFFERING_REQUISITE_GROUP_PAGE, eventBus } from "~/utils/EventBus"
import styles from "~/Pages/Offering/Requisite/Requisite.module.scss"

const { Title } = Typography

function OfferingRequisitePage(props: RouteComponentProps<{ offeringID: string }>) {
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
          <RequisiteOfferingRemoveLink offeringId={record.OfferingID} requisiteGroupId={requisiteGroupID} />
        </Space>
      )
    }
  ]

  const expandableRowRender = (data: { [key: string]: any }, display: boolean) => {
    return (
      <>
        {display && (
          <div style={{ border: "1px solid", padding: "5px" }}>
            <Row>
              <Col span="10">Offering Name</Col>
              <Col span="14">{data.Name}</Col>
            </Row>
            <Row>
              <Col span="10">Creation Date</Col>
              <Col span="14">{data.CreationDate ? moment(data.CreationDate).format("YYYY-MM-DD") : ""}</Col>
            </Row>
            <Row>
              <Col span="10">Termination Date</Col>
              <Col span="14">{data.TerminationDate ? moment(data.TerminationDate).format("YYYY-MM-DD") : ""}</Col>
            </Row>
          </div>
        )}
      </>
    )
  }

  const offeringID = props.match.params.offeringID
  const [requisiteGroupID, setRequisiteGroupID] = useState<number>()
  const [hasRequisiteGroup, setHasRequisiteGroup] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [policyTypeList, setPolicyTypeList] = useState<Array<any>>([])
  const [offeringRequisiteGroupDetails, setofferingRequisiteGroupDetails] = useState<Array<any>>([])

  const loadOfferingRequisiteGroupDetails = async function (requisiteGroupID: number) {
    setLoading(true)

    const result = await getGroupOfferings(requisiteGroupID)

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
      const result = await getRequisiteOfferingGroup(Number(offeringID))

      if (result && result.success && Array.isArray(result.data) && result.data.length > 0) {
        setRequisiteGroupID(result.data[0].RequisiteOfferingGroupID)
        setHasRequisiteGroup(true)
        setPolicyTypeList(result.data)
        loadOfferingRequisiteGroupDetails(result.data[0].RequisiteOfferingGroupID)
      }
    }
    eventBus.subscribe(REFRESH_OFFERING_REQUISITE_GROUP_PAGE, loadOfferingRequisiteGroup)
    eventBus.publish(REFRESH_OFFERING_REQUISITE_GROUP_PAGE)
    return () => {
      eventBus.unsubscribe(REFRESH_OFFERING_REQUISITE_GROUP_PAGE)
    }
  }, [offeringID])

  const handleSelection = (param: any) => {
    setRequisiteGroupID(param.RequisiteGroupID)
    loadOfferingRequisiteGroupDetails(param.RequisiteGroupID)
  }

  return (
    <div className="site-layout-content">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" xs={24} sm={24} md={24}>
          <Title level={3}>Manage Offering Prerequisite</Title>
        </Col>
      </Row>

      <PrerequisiteGroups offeringId={parseInt(offeringID)} policyData={policyTypeList} onSelected={handleSelection} />

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={styles.margin0px}>
        <Col className={`gutter-row ${styles.offeringRequisiteDetails}`} xs={24} sm={24} md={24}>
          <PrerequisiteGroupOfferingModalOpenButton
            offeringId={parseInt(offeringID)}
            requisiteGroupId={requisiteGroupID}
            hasRequisiteGroup={hasRequisiteGroup}
          />
          <ResponsiveTable
            className={styles.paddingTop10px}
            columns={columns}
            dataSource={offeringRequisiteGroupDetails}
            loading={loading}
            bordered
            pagination={{ position: ["topLeft"], pageSize: 20 }}
            responsiveColumnIndices={[1, 2, 3]}
            expandableRowRender={expandableRowRender}
            breakpoints={["md", "lg", "xl", "xxl"]}
            scroll={{ y: 600 }}
          />
        </Col>
      </Row>
    </div>
  )
}

export default OfferingRequisitePage
