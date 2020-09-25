import React, { useState } from "react"
import { Card, Button, Col, Transfer } from "antd"
import { saveAffiliatedOrg } from "~/ApiServices/Service/SeatGroupService"
import "~/sass/utils.scss"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"

interface ISeatGroupAffiliateOrganizationFormProps {
  seatgroupId: number
  targetKeys: any
  dataSource: any
  handleCancel: () => void
  setApiCallInProgress: (flag: boolean) => void
}

export default function SeatGroupAffiliateOrganizationForm(props: ISeatGroupAffiliateOrganizationFormProps) {
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [selectedKeys, setSelectedKeys] = useState<any[]>([])
  const [targetKeys, setTargetKeys] = useState<any[]>(props.targetKeys)

  const onSubmission = async () => {
    type serviceMethodType = (params: { [key: string]: any }) => Promise<IApiResponse>
    const serviceMethoToCall: serviceMethodType = saveAffiliatedOrg

    props.setApiCallInProgress(true)
    setErrorMessages([])
    const response = await serviceMethoToCall({
      SeatGroupID: props.seatgroupId,
      AffiliateAccountIDs: targetKeys
    })
    props.setApiCallInProgress(false)
    if (response && response.success) {
      props.handleCancel()
    } else {
      setErrorMessages(response.error)
      console.log(response.error)
      console.log(errorMessages)
    }
  }

  const handleChange = (nextTargetKeys: any, direction: any, moveKeys: any) => {
    setTargetKeys(nextTargetKeys)
  }

  const handleSelectChange = (sourceSelectedKeys: any, targetSelectedKeys: any) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys])
  }

  const actions = []
  actions.push(<Button onClick={props.handleCancel}>Cancel</Button>)
  actions.push(<Button onClick={onSubmission}>Submit</Button>)

  return (
    <Card title="Manage Seat Group Affiliated Organization" actions={actions}>
      <Col style={{ height: "65vh", padding: "10px" }}>
        <Transfer
          dataSource={props.dataSource}
          titles={["Affiliated Organizations", "Selected Affiliated Organizations"]}
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          onChange={handleChange}
          onSelectChange={handleSelectChange}
          render={(item: any) => item.title}
          style={{ height: "100%" }}
        />
      </Col>
    </Card>
  )
}
