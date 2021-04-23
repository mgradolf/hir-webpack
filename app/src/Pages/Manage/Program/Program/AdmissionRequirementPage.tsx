import React, { useEffect, useState } from "react"
import { Row, Col } from "antd"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import AdmissionRequirementGroups from "~/Component/Feature/ProgramAdmissionRequirement/AdmissionRequirementGroups"
import { getProgramAdmissionReqTableColumns } from "~/TableSearchMeta/ProgramAdmissionReq/AdmissionReqTableColumns"
import { AdmissionReqModalButton } from "~/Component/Feature/ProgramAdmissionRequirement/AdmissionReqModalButton"
import { eventBus, REFRESH_PROGRAM_ADMISSION_REQUIREMENT_PAGE } from "~/utils/EventBus"
import { getProgramAdmReqGroups } from "~/ApiServices/BizApi/program/programIF"

interface IAdmissionRequirementPageProp {
  programID: number
}

export default function AdmissionRequirementPage(props: IAdmissionRequirementPageProp) {
  const [admissionReqGroupID, setAdmissionReqGroupID] = useState<number>()
  const [hasAdmissionReqGroup, setHasAdmissionReqGroup] = useState<boolean>(false)
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

  const handleSelection = (param: any) => {
    setAdmissionReqGroupID(param.AdmissionReqGroupID)
    setHasAdmissionReqGroup(true)
  }

  return (
    <>
      <AdmissionRequirementGroups
        admissionReqList={admissionReqList}
        programID={props.programID}
        onSelected={handleSelection}
      />
      {admissionReqGroupID && (
        <SearchPage
          title={""}
          blocks={[
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col className={`gutter-row`} xs={24} sm={24} md={24}>
                <AdmissionReqModalButton
                  ProgramAdmReqGroupID={admissionReqGroupID}
                  HasAdmReqGroup={hasAdmissionReqGroup}
                />
              </Col>
            </Row>
          ]}
          defaultFormValue={{ ProgramAdmReqGroupID: admissionReqGroupID }}
          tableProps={{
            ...getProgramAdmissionReqTableColumns(admissionReqGroupID),
            refreshEventName: REFRESH_PROGRAM_ADMISSION_REQUIREMENT_PAGE
          }}
        />
      )}
    </>
  )
}
