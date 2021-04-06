import React, { useState, useEffect } from "react"
import { Row, Col } from "antd"
import { getRequisiteOfferingGroup } from "~/ApiServices/Service/OfferingService"
import { AddOfferingFromRequisiteGroupButton } from "~/Component/Feature/OfferingRequisite/AddOfferingFromRequisiteGroupButton"
import PrerequisiteGroups from "~/Component/Feature/OfferingRequisite/PrerequisiteGroups"
import { eventBus, REFRESH_OFFERING_REQUISITE_GROUP_PAGE } from "~/utils/EventBus"
import { getOfferingPrerequisiteTableColumns } from "~/TableSearchMeta/OfferingRequisite/PrerequisiteTableColumns"
import { SearchPage } from "~/Component/Common/Page/SearchPage"

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
    eventBus.subscribe(REFRESH_OFFERING_REQUISITE_GROUP_PAGE, loadOfferingRequisiteGroup)
    eventBus.publish(REFRESH_OFFERING_REQUISITE_GROUP_PAGE)
    return () => {
      eventBus.unsubscribe(REFRESH_OFFERING_REQUISITE_GROUP_PAGE)
    }
    //loadOfferingRequisiteGroup()
  }, [props.offeringID])

  const handleSelection = (param: any) => {
    setRequisiteGroupID(param.RequisiteGroupID)
  }

  return (
    <>
      {policyTypeList.length > 0 && (
        <PrerequisiteGroups offeringId={props.offeringID} policyData={policyTypeList} onSelected={handleSelection} />
      )}
      {requisiteGroupID && (
        <SearchPage
          title={props.title || ""}
          blocks={[
            <>
              {policyTypeList.length > 0 && (
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col className={`gutter-row`} xs={24} sm={24} md={24}>
                    <AddOfferingFromRequisiteGroupButton
                      requisiteGroupID={requisiteGroupID}
                      hasRequisiteGroup={hasRequisiteGroup}
                    />
                  </Col>
                </Row>
              )}
            </>
          ]}
          defaultFormValue={{ RequisiteOfferingGroupID: requisiteGroupID }}
          tableProps={getOfferingPrerequisiteTableColumns(requisiteGroupID)}
        />
      )}
    </>
  )
}
