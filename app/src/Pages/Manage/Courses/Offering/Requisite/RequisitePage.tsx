import React, { useState, useEffect } from "react"
import { Row, Col, Typography, Select } from "antd"
import { getRequisiteOfferingGroup } from "~/ApiServices/Service/OfferingService"
import { AddOfferingFromRequisiteGroupButton } from "~/Component/Feature/OfferingRequisite/AddOfferingFromRequisiteGroupButton"
import { getOfferingPrerequisiteTableColumns } from "~/TableSearchMeta/OfferingRequisite/PrerequisiteTableColumns"
import PrerequisiteGroupModalOpenButton from "~/Component/Feature/OfferingRequisite/PrerequisiteGroupModalOpenButton"
import RequisiteGroupEditLink from "~/Component/Feature/OfferingRequisite/RequisiteEditLink"
import { RequisiteRemoveLink } from "~/Component/Feature/OfferingRequisite/RequisiteRemoveLink"
import { ResponsiveTable } from "~/Component/Common/ResponsiveTable"

interface IRequisitePageProp {
  offeringID: number
  title?: string
}

export default function RequisitePage(props: IRequisitePageProp) {
  const [requisiteGroupID, setRequisiteGroupID] = useState<number>()
  const [policyTypeList, setPolicyTypeList] = useState<Array<any>>([])

  useEffect(() => {
    ;(async () => {
      const result = await getRequisiteOfferingGroup({ OfferingID: props.offeringID })
      if (result && result.success && Array.isArray(result.data) && result.data.length > 0) {
        setPolicyTypeList(result.data)
      }
    })()
  }, [props.offeringID])

  return (
    <>
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        style={{
          marginBottom: "10px"
        }}
      >
        <Col className="gutter-row" xs={24} sm={24} md={4}>
          <Typography.Title level={4} style={{ paddingBottom: ".5rem", paddingTop: ".5rem", paddingLeft: ".5rem" }}>
            Prerequisite Groups
          </Typography.Title>
        </Col>
        <Col
          className={`gutter-row`}
          xs={24}
          sm={24}
          md={16}
          style={{ paddingBottom: ".5rem", paddingTop: ".5rem", textAlign: "left" }}
        >
          {policyTypeList.length > 0 && (
            <Select
              style={{ width: "250px", marginRight: "30px" }}
              showSearch
              optionFilterProp="children"
              onSelect={(e: any) => {
                setRequisiteGroupID(e)
              }}
              placeholder="Select a requisite group"
            >
              {policyTypeList.map((x) => {
                return (
                  <Select.Option key={x.RequisiteOfferingGroupID} value={x.RequisiteOfferingGroupID}>
                    {x.RequisiteOfferingGroupName}
                  </Select.Option>
                )
              })}
            </Select>
          )}

          <PrerequisiteGroupModalOpenButton OfferingID={props.offeringID} />
          {policyTypeList.length > 0 && (
            <RequisiteGroupEditLink offeringId={props.offeringID} requisiteGroupId={requisiteGroupID} />
          )}
          {policyTypeList.length > 0 && (
            <RequisiteRemoveLink offeringId={props.offeringID} requisiteGroupId={requisiteGroupID} />
          )}
        </Col>
      </Row>
      {requisiteGroupID && (
        <>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ marginBottom: "10px" }}>
            <Col className={`gutter-row`} xs={24} sm={24} md={24} style={{ textAlign: "right" }}>
              <AddOfferingFromRequisiteGroupButton requisiteGroupID={requisiteGroupID} />
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" xs={24} sm={24} md={{ span: 24, offset: 0 }}>
              <ResponsiveTable
                pagination={false}
                searchParams={{ RequisiteOfferingGroupID: requisiteGroupID }}
                {...getOfferingPrerequisiteTableColumns(requisiteGroupID)}
                refreshEventName={"REFRESH_OFFERING_REQUISITE_TABLE"}
              />
            </Col>
          </Row>
        </>
      )}
    </>
  )
}
