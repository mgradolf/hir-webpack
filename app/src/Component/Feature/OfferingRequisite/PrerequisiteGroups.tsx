import React, { useState, useEffect } from "react"
import { Row, Col, Typography, Select, Divider } from "antd"

import RequisiteGroupEdit from "~/Component/Feature/OfferingRequisite/RequisiteEditLink"
import RequisiteRemoveLink from "~/Component/Feature/OfferingRequisite/RequisiteRemoveLink"
import PrerequisiteGroupModalOpenButton from "~/Component/Feature/OfferingRequisite/PrerequisiteGroupModalOpenButton"
import styles from "~/Component/Feature/OfferingRequisite/PrerequisiteGroups.module.scss"

interface IRequisiteGroupProps {
  offeringId: number
  policyData: Array<any>
  onSelected: (param: { [key: string]: any }) => void
}

export default function PrerequisiteGroups(props: IRequisiteGroupProps) {
  const [requisiteGroupID, setRequisiteGroupID] = useState<number>()

  useEffect(() => {
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
          {props.policyData.length > 0 && (
            <Select
              className={styles.show}
              showSearch
              value={requisiteGroupID}
              optionFilterProp="children"
              onSelect={(e) => {
                setRequisiteGroupID(e)
                props.onSelected({ RequisiteGroupID: e })
              }}
              placeholder="Select a requisite group"
            >
              {props.policyData.map((x) => {
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
          <PrerequisiteGroupModalOpenButton OfferingID={props.offeringId} />
          {props.policyData.length > 0 && (
            <RequisiteGroupEdit offeringId={props.offeringId} requisiteGroupId={requisiteGroupID} />
          )}
          {props.policyData.length > 0 && (
            <RequisiteRemoveLink offeringId={props.offeringId} requisiteGroupId={requisiteGroupID} />
          )}
        </Col>
      </Row>
      <Divider />
    </>
  )
}
