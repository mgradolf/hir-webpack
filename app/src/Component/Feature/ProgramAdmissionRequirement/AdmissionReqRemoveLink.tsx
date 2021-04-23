import React from "react"
import { Button } from "antd"
import { eventBus, REFRESH_PROGRAM_ADMISSION_REQUIREMENT_PAGE } from "~/utils/EventBus"
import { showDeleteConfirm } from "~/Component/Common/Modal/Confirmation"
import { DeleteOutlined } from "@ant-design/icons"
import { deleteProgramAdmReq } from "~/ApiServices/BizApi/program/programIF"

interface IAdmissionReqRemoveLinkProp {
  ProgramAdmReqID: number | undefined
}

export function AdmissionReqRemoveLink(props: IAdmissionReqRemoveLinkProp) {
  return (
    <Button
      danger
      type="primary"
      icon={<DeleteOutlined />}
      shape="circle"
      onClick={() =>
        showDeleteConfirm(() => {
          return deleteProgramAdmReq({
            ProgramAdmReqID: props.ProgramAdmReqID
          }).then((x) => {
            if (x && x.success) {
              eventBus.publish(REFRESH_PROGRAM_ADMISSION_REQUIREMENT_PAGE)
            }
            return x
          })
        })
      }
    />
  )
}
