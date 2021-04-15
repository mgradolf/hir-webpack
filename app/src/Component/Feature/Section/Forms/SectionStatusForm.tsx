import React, { useEffect, useState } from "react"
import { Button, message, Select, Typography } from "antd"
import { getSectionStatusCode } from "~/ApiServices/Service/RefLookupService"
import { updateSection } from "~/ApiServices/Service/SectionService"
import { UPDATE_FAILED, UPDATE_SUCCESSFULLY } from "~/utils/Constants"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import { EditOutlined, CloseOutlined } from "@ant-design/icons"
import "~/Sass/utils.scss"

interface ISectionStatusFormProps {
  initialValue: { [key: string]: any }
}

export function SectionStatusForm(props: ISectionStatusFormProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [showUpdateStatus, setShowUpdateStatus] = useState<boolean>(false)
  const [statusList, setStatusList] = useState<Array<any>>([])

  useEffect(() => {
    getSectionStatusCode().then((x) => {
      if (x.success) setStatusList(x.data)
    })
  }, [])

  const handleStatus = (statusCodeID: number) => {
    const params = props.initialValue
    params["SectionStatusCodeID"] = statusCodeID

    setLoading(true)
    updateSection(params).then((x: any) => {
      if (x && x.success) {
        message.success(UPDATE_SUCCESSFULLY)
        eventBus.publish(REFRESH_PAGE)
      } else {
        message.error(UPDATE_FAILED)
        setShowUpdateStatus(false)
      }
      setLoading(false)
    })
  }

  return (
    <>
      {!showUpdateStatus && <Typography.Text>{props.initialValue.StatusCode}</Typography.Text>}
      {setShowUpdateStatus && (
        <Button
          danger={showUpdateStatus}
          type="primary"
          shape="circle"
          icon={showUpdateStatus ? <CloseOutlined /> : <EditOutlined />}
          style={{ float: "right" }}
          onClick={() => setShowUpdateStatus && setShowUpdateStatus(!showUpdateStatus)}
        />
      )}
      {showUpdateStatus && (
        <Select
          loading={loading}
          style={{ width: "150px" }}
          defaultValue={props.initialValue.SectionStatusCodeID}
          onChange={handleStatus}
          aria-label="Select Status Code"
        >
          {statusList &&
            statusList.map((x) => {
              return (
                <Select.Option key={x.StatusID} value={x.StatusID}>
                  {x.Name}
                </Select.Option>
              )
            })}
        </Select>
      )}
    </>
  )
}
