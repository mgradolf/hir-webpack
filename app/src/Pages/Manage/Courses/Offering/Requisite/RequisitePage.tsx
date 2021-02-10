import React, { useState, useEffect } from "react"
import { Row, Col, Typography } from "antd"
import { getRequisiteOfferingGroup } from "~/ApiServices/Service/OfferingService"
import { ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import PrerequisiteGroupOfferingModalOpenButton from "~/Component/Offering/Requisite/PrerequisiteGroupOfferingModalOpenButton"
import PrerequisiteGroups from "~/Component/Offering/Requisite/PrerequisiteGroups"
import { REFRESH_OFFERING_REQUISITE_GROUP_PAGE } from "~/utils/EventBus"
import styles from "~/Pages/Manage/Courses/Offering/Requisite/Requisite.module.scss"
import { getOfferingPrerequisiteTableColumns } from "~/FormMeta/OfferingRequisite/PrerequisiteTableColumns"

interface IRequisitePageProp {
  offeringID: number
  title?: string
}

export default function RequisitePage(props: IRequisitePageProp) {
  const [requisiteGroupID, setRequisiteGroupID] = useState<number>()
  const [hasRequisiteGroup, setHasRequisiteGroup] = useState<boolean>(false)
  const [policyTypeList, setPolicyTypeList] = useState<Array<any>>([])

  useEffect(() => {
    const loadOfferingRequisiteGroup = async function () {
      const result = await getRequisiteOfferingGroup({ OfferingID: props.offeringID })

      if (result && result.success && Array.isArray(result.data) && result.data.length > 0) {
        setRequisiteGroupID(result.data[0].RequisiteOfferingGroupID)
        setHasRequisiteGroup(true)
        setPolicyTypeList(result.data)
      }
    }
    loadOfferingRequisiteGroup()
  }, [props.offeringID])

  const handleSelection = (param: any) => {
    setRequisiteGroupID(param.RequisiteGroupID)
  }

  return (
    <>
      {props.title && (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" xs={24} sm={24} md={24}>
            <Typography.Title level={3}>{props.title}</Typography.Title>
          </Col>
        </Row>
      )}
      <PrerequisiteGroups offeringId={props.offeringID} policyData={policyTypeList} onSelected={handleSelection} />
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className={`gutter-row`} xs={24} sm={24} md={24}>
          <PrerequisiteGroupOfferingModalOpenButton
            offeringId={props.offeringID}
            requisiteGroupId={requisiteGroupID}
            hasRequisiteGroup={hasRequisiteGroup}
          />
        </Col>
      </Row>
      {requisiteGroupID && (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={"padding-top-10"}>
          <Col className="gutter-row" xs={24} sm={24} md={{ span: 24, offset: 0 }}>
            <ResponsiveTable
              searchParams={{ RequisiteOfferingGroupID: requisiteGroupID }}
              {...getOfferingPrerequisiteTableColumns(requisiteGroupID)}
              refreshEventName={REFRESH_OFFERING_REQUISITE_GROUP_PAGE}
              className={styles.paddingTop10px}
            />
          </Col>
        </Row>
      )}
    </>
  )
}
