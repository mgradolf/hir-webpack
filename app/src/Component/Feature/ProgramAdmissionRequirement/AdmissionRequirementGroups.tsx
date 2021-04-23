import React, { useState, useEffect } from "react"
import { Row, Col, Typography, Select, Divider } from "antd"
import styles from "~/Component/Feature/OfferingRequisite/PrerequisiteGroups.module.scss"
import { getProgramAdmReqGroups } from "~/ApiServices/BizApi/program/programIF"
import { eventBus, REFRESH_PROGRAM_ADMISSION_REQUIREMENT_PAGE } from "~/utils/EventBus"
import AdmissionReqGroupModalOpenButton from "~/Component/Feature/ProgramAdmissionRequirement/AdmissionReqGroupModalOpenButton"
import AdmissionReqGroupEditLink from "~/Component/Feature/ProgramAdmissionRequirement/AdmisisonReqGroupEditLink"
import { AdmissionReqGroupRemoveLink } from "~/Component/Feature/ProgramAdmissionRequirement/AdmissionReqGroupRemoveLink"

interface IAdmissionRequirementGroupProps {
  programID: number
  onSelected: (param: { [key: string]: any }) => void
}

export default function AdmissionRequirementGroups(props: IAdmissionRequirementGroupProps) {
  const [programAdmReqGroupID, setProgramAdmReqGroupID] = useState<number>()
  const [admissionReqList, setAdmissionReqList] = useState<Array<any>>([])

  useEffect(() => {
    const loadAdmissionRequirementsGroup = async function () {
      const result = await getProgramAdmReqGroups({ ProgramID: props.programID })

      if (result && result.success && Array.isArray(result.data) && result.data.length > 0) {
        setAdmissionReqList(result.data)
      }
    }

    eventBus.subscribe(REFRESH_PROGRAM_ADMISSION_REQUIREMENT_PAGE, loadAdmissionRequirementsGroup)
    eventBus.publish(REFRESH_PROGRAM_ADMISSION_REQUIREMENT_PAGE)
    return () => {
      eventBus.unsubscribe(REFRESH_PROGRAM_ADMISSION_REQUIREMENT_PAGE)
    }
    // eslint-disable-next-line
  }, [])

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
          {admissionReqList.length > 0 && (
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
              {admissionReqList.map((x) => {
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
          <AdmissionReqGroupModalOpenButton ProgramID={props.programID} />
          {admissionReqList.length > 0 && (
            <AdmissionReqGroupEditLink ProgramID={props.programID} ProgramAdmReqGroupID={programAdmReqGroupID} />
          )}
          {admissionReqList.length > 0 && <AdmissionReqGroupRemoveLink ProgramAdmReqGroupID={programAdmReqGroupID} />}
        </Col>
      </Row>
      <Divider />
    </>
  )
}
