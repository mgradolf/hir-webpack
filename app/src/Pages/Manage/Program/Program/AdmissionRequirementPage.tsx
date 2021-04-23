import React, { useState } from "react"
import { Row, Col } from "antd"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import AdmissionRequirementGroups from "~/Component/Feature/ProgramAdmissionRequirement/AdmissionRequirementGroups"
import { getProgramAdmissionReqTableColumns } from "~/TableSearchMeta/ProgramAdmissionReq/AdmissionReqTableColumns"
import { AdmissionReqModalButton } from "~/Component/Feature/ProgramAdmissionRequirement/AdmissionReqModalButton"

interface IAdmissionRequirementPageProp {
  programID: number
}

export default function AdmissionRequirementPage(props: IAdmissionRequirementPageProp) {
  const [admissionReqGroupID, setAdmissionReqGroupID] = useState<number>()
  const [hasAdmissionReqGroup, setHasAdmissionReqGroup] = useState<boolean>(false)

  const handleSelection = (param: any) => {
    setAdmissionReqGroupID(param.AdmissionReqGroupID)
    setHasAdmissionReqGroup(true)
  }

  return (
    <>
      <AdmissionRequirementGroups programID={props.programID} onSelected={handleSelection} />
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
          tableProps={getProgramAdmissionReqTableColumns(admissionReqGroupID)}
        />
      )}
    </>
  )
}
