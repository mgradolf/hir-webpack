import React, { useEffect, useState } from "react"
import { Button, message, Select } from "antd"
import { getOfferingStatusTypes } from "~/ApiServices/Service/RefLookupService"
import { UPDATE_FAILED, UPDATE_SUCCESSFULLY } from "~/utils/Constants"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import { EditOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons"
import { updateOffering } from "~/ApiServices/Service/OfferingService"
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
  const [loading, setLoading] = useState<boolean>(false)
  const [showUpdateStatus, setShowUpdateStatus] = useState<boolean>(false)
  const [offeringStatusTypes, setOfferingStatusTypes] = useState<Array<any>>([])
  const [disableStatus, setDisableStatus] = useState(false)
  const [statusCodeID, setStatusCodeID] = useState<number>()

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
            setDisableStatus(true)
            break
          case OfferingStatus.Open:
          case OfferingStatus.Closed:
            setDisableStatus(false)
            response.data = response.data.filter((x: any) => {
              switch (x.StatusID) {
                case OfferingStatus.Preliminary:
                case OfferingStatus.Open:
                case OfferingStatus.Closed:
                  return true
                default:
                  return false
              }
            })
        }
        setOfferingStatusTypes(response.data)
      }
    })()
    // eslint-disable-next-line
  }, [])

  const handleStatus = (statusCodeID: number) => {
    setStatusCodeID(statusCodeID)
  }

  return (
    <>
      <Select
        loading={loading}
        aria-label="Offering Status Select"
        defaultValue={props.initialValue.StatusCode}
        onChange={handleStatus}
        style={{ width: "250px" }}
        disabled={disableStatus || !showUpdateStatus}
      >
        {offeringStatusTypes &&
          offeringStatusTypes.map((x) => {
            return (
              <Select.Option key={x.StatusID} value={x.StatusID}>
                {x.Name}
              </Select.Option>
            )
          })}
      </Select>

      {!showUpdateStatus && (
        <Button
          type="primary"
          shape="circle"
          icon={<EditOutlined />}
          style={{ float: "right" }}
          onClick={() => setShowUpdateStatus && setShowUpdateStatus(!showUpdateStatus)}
        />
      )}
      {showUpdateStatus && (
        <>
          <Button
            danger
            type="primary"
            shape="circle"
            icon={<CloseOutlined />}
            style={{ float: "right", marginLeft: "5px" }}
            onClick={() => setShowUpdateStatus && setShowUpdateStatus(!showUpdateStatus)}
          />
          <Button
            ghost
            type="primary"
            shape="circle"
            icon={<CheckOutlined />}
            style={{ float: "right" }}
            onClick={() => {
              const params = props.initialValue
              params["OfferingStatusCodeID"] = statusCodeID
              console.log("params: ", params)

              setLoading(true)
              updateOffering(params).then((x) => {
                if (x && x.success) {
                  message.success(UPDATE_SUCCESSFULLY)
                  eventBus.publish(REFRESH_PAGE)
                } else {
                  message.error(UPDATE_FAILED)
                  setShowUpdateStatus(false)
                }
                setLoading(false)
              })
            }}
          />
        </>
      )}
    </>
  )
}
