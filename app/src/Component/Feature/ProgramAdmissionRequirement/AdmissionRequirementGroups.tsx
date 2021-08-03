import React, { useState } from "react"
import { Row, Col, Typography, Select, Divider } from "antd"
import styles from "~/Component/Feature/OfferingRequisite/PrerequisiteGroups.module.scss"
import { AdmissionReqGroupModalOpenButton } from "~/Component/Feature/ProgramAdmissionRequirement/AdmissionReqGroupModalOpenButton"
import AdmissionReqGroupEditLink from "~/Component/Feature/ProgramAdmissionRequirement/AdmisisonReqGroupEditLink"
import { AdmissionReqGroupRemoveLink } from "~/Component/Feature/ProgramAdmissionRequirement/AdmissionReqGroupRemoveLink"
import { HelpButton } from "~/Component/Common/Form/Buttons/HelpButton"

interface IAdmissionRequirementGroupProps {
  programID: number
  admissionReqList: Array<any>
  onSelected: (param: { [key: string]: any }) => void
}

export default function AdmissionRequirementGroups(props: IAdmissionRequirementGroupProps) {
  const [programAdmReqGroupID, setProgramAdmReqGroupID] = useState<number>()

  return (
    <>
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        className={`${styles.offeringRequisiteDetails}  ${styles.margin0px}`}
      >
        <Col className="gutter-row" xs={24} sm={24} md={6}>
          <Typography.Text className={`${styles.paddingTopBottom} ${styles.title}`}>
            Admission Requirement Groups
          </Typography.Text>
        </Col>
        <Col className={`gutter-row ${styles.paddingTopBottom} ${styles.textAlignLeft}`} xs={24} sm={24} md={10}>
          {props.admissionReqList.length > 0 && (
            <Select
              className={styles.show}
              showSearch
              optionFilterProp="children"
              onSelect={(e: any) => {
                setProgramAdmReqGroupID(e)
                props.onSelected({ AdmissionReqGroupID: e })
              }}
              placeholder="Select an admission requirement group"
            >
              {props.admissionReqList.map((x) => {
                return (
                  <Select.Option key={x.ProgramAdmReqGroupID} value={x.ProgramAdmReqGroupID}>
                    {x.Name}
                  </Select.Option>
                )
              })}
            </Select>
          )}
        </Col>
        <Col className={`gutter-row ${styles.paddingTopBottom} ${styles.textAlign}`} xs={24} sm={24} md={8}>
          <HelpButton helpKey="programAdmissionRequirementsTab" style={{ marginRight: "5px" }} />
          <AdmissionReqGroupModalOpenButton ProgramID={props.programID} />
          {props.admissionReqList.length > 0 && (
            <AdmissionReqGroupEditLink ProgramID={props.programID} ProgramAdmReqGroupID={programAdmReqGroupID} />
          )}
          {props.admissionReqList.length > 0 && (
            <AdmissionReqGroupRemoveLink ProgramAdmReqGroupID={programAdmReqGroupID} />
          )}
        </Col>
      </Row>
      <Divider />
    </>
  )
}
