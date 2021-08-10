import React, { useEffect, useState } from "react"
import { Button, Col, Form, message, Row, Select, Tooltip } from "antd"
import { getOfferingStatusTypes } from "~/ApiServices/Service/RefLookupService"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import { EditOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons"
import { updateOffering } from "~/ApiServices/Service/OfferingService"
import { UPDATE_SUCCESSFULLY } from "~/utils/Constants"
import "~/Sass/utils.scss"

interface IOfferingStatusFormProps {
  initialValue: { [key: string]: any }
}

const OfferingStatus = {
  Preliminary: 0,
  AwaitingApproval: 1,
  Open: 2,
  Denied: 3,
  Closed: 1000
}

export function OfferingStatusForm(props: IOfferingStatusFormProps) {
  const [formInstance] = Form.useForm()
  const [showForm, setShowForm] = useState<boolean>(false)
  const [apiCallInProgress, setApiCallInProgress] = useState(false)

  const [offeringStatusTypes, setOfferingStatusTypes] = useState<Array<any>>([])
  const [disableStatus, setDisableStatus] = useState(false)

  const hasApprovalProcess = props.initialValue.HasApprovalProcess
  const offeringStatusCodeID = props.initialValue.OfferingStatusCodeID

  useEffect(() => {
    ;(async () => {
      const response = await getOfferingStatusTypes()
      if (response && response.data && Array.isArray(response.data)) {
        if (!hasApprovalProcess) {
          response.data = response.data.filter(
            (x: any) => x.StatusID !== OfferingStatus.AwaitingApproval && x.StatusID !== OfferingStatus.Denied
          )
        }
        switch (offeringStatusCodeID) {
          case OfferingStatus.Preliminary:
            setDisableStatus(hasApprovalProcess)
            break
          case OfferingStatus.AwaitingApproval:
          case OfferingStatus.Denied:
          case OfferingStatus.Closed:
            setDisableStatus(true)
            break
          case OfferingStatus.Open:
            setDisableStatus(false)
            response.data = response.data.filter((x: any) => {
              if (hasApprovalProcess) {
                switch (x.StatusID) {
                  case OfferingStatus.Preliminary:
                  case OfferingStatus.Open:
                  case OfferingStatus.Closed:
                    return true
                  default:
                    return false
                }
              } else {
                switch (x.StatusID) {
                  case OfferingStatus.Open:
                  case OfferingStatus.Closed:
                    return true
                  default:
                    return false
                }
              }
            })
        }
        setOfferingStatusTypes(response.data)
      }
    })()
    // eslint-disable-next-line
  }, [])

  return (
    <Form form={formInstance} initialValues={props.initialValue}>
      <Row gutter={8} style={{ height: "30px" }}>
        <Col flex="auto">
          <Form.Item name="OfferingStatusCodeID">
            <Select aria-label="Offering Status Select" disabled={disableStatus || !showForm}>
              {offeringStatusTypes &&
                offeringStatusTypes.map((x) => {
                  return (
                    <Select.Option key={x.StatusID} value={x.StatusID}>
                      {x.Name}
                    </Select.Option>
                  )
                })}
            </Select>
          </Form.Item>
        </Col>
        {!showForm && (
          <Col flex="20px">
            <Tooltip title="Edit">
              <Button
                disabled={disableStatus}
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                onClick={() => setShowForm(true)}
              />
            </Tooltip>
          </Col>
        )}
        {showForm && (
          <Col flex="20px">
            <Tooltip title="Update">
              <Button
                ghost
                type="primary"
                shape="circle"
                loading={apiCallInProgress}
                icon={<CheckOutlined />}
                onClick={() => {
                  setApiCallInProgress(true)
                  updateOffering({ OfferingID: props.initialValue.OfferingID, ...formInstance.getFieldsValue() }).then(
                    (x) => {
                      if (x.success) {
                        message.success(UPDATE_SUCCESSFULLY)
                        eventBus.publish(REFRESH_PAGE)
                        setShowForm(false)
                      }
                      setApiCallInProgress(false)
                    }
                  )
                }}
              />
            </Tooltip>
          </Col>
        )}

        {showForm && (
          <Col flex="20px">
            <Tooltip title="Remove">
              <Button
                danger
                type="default"
                shape="circle"
                icon={<CloseOutlined />}
                onClick={() => {
                  formInstance.resetFields()
                  setShowForm(false)
                }}
              />
            </Tooltip>
          </Col>
        )}
      </Row>
    </Form>
  )
}
