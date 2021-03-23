import React, { useState, useEffect } from "react"
import { Row, Col, Typography, Select, Divider } from "antd"

import RequisiteGroupEdit from "~/Component/Feature/Offering/Requisite/RequisiteEditLink"
import RequisiteRemoveLink from "~/Component/Feature/Offering/Requisite/RequisiteRemoveLink"
import PrerequisiteGroupModalOpenButton from "~/Component/Feature/Offering/Requisite/PrerequisiteGroupModalOpenButton"
import styles from "~/Component/Feature/Offering/Requisite/PrerequisiteGroups.module.scss"

interface IRequisiteGroupProps {
  offeringId: number
  policyData: Array<any>
  onSelected: (param: { [key: string]: any }) => void
}

export default function PrerequisiteGroups(props: IRequisiteGroupProps) {
  const [requisiteGroups, setRequisiteGroups] = useState<Array<any>>([])
  const [requisiteGroupID, setRequisiteGroupID] = useState<number>()

  useEffect(() => {
    setRequisiteGroups(props.policyData)
    if (props.policyData.length > 0) {
      setRequisiteGroupID(props.policyData[0].RequisiteOfferingGroupID)
    }
  }, [props.policyData])

  return (
    <>
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        className={`${styles.offeringRequisiteDetails}  ${styles.margin0px}`}
      >
        <Col className="gutter-row" xs={24} sm={24} md={4}>
          <Typography.Text className={`${styles.paddingTopBottom} ${styles.title}`}>
            Prerequisite Groups
          </Typography.Text>
        </Col>
        <Col className={`gutter-row ${styles.paddingTopBottom} ${styles.textAlignLeft}`} xs={24} sm={24} md={12}>
          {requisiteGroups.length > 0 && (
            <Select
              className={styles.show}
              showSearch
              defaultValue={requisiteGroups[0].RequisiteOfferingGroupID}
              optionFilterProp="children"
              onSelect={(e) => {
                setRequisiteGroupID(e)
                props.onSelected({ RequisiteGroupID: e })
              }}
              placeholder="Select a requisite group"
            >
              {requisiteGroups.map((x) => {
                return (
                  <Select.Option key={x.RequisiteOfferingGroupID} value={x.RequisiteOfferingGroupID}>
                    {x.RequisiteOfferingGroupName}
                  </Select.Option>
                )
              })}
            </Select>
          )}
        </Col>
        <Col className={`gutter-row ${styles.paddingTopBottom} ${styles.textAlign}`} xs={24} sm={24} md={8}>
          <PrerequisiteGroupModalOpenButton offeringId={props.offeringId} />
          {requisiteGroups.length > 0 && (
            <RequisiteGroupEdit offeringId={props.offeringId} requisiteGroupId={requisiteGroupID} />
          )}
          {requisiteGroups.length > 0 && (
            <RequisiteRemoveLink offeringId={props.offeringId} requisiteGroupId={requisiteGroupID} />
          )}
        </Col>
      </Row>
      <Divider />
    </>
  )
}
