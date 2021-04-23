import React from "react"
import { Button } from "antd"
import { eventBus, REFRESH_PROGRAM_ADMISSION_REQUIREMENT_PAGE } from "~/utils/EventBus"
import { DeleteOutlined } from "@ant-design/icons"
import { showDeleteConfirm } from "~/Component/Common/Modal/Confirmation"
import { deleteProgramAdmReqGroup } from "~/ApiServices/BizApi/program/programIF"

interface IAdmissionReqGroupRemoveLinkProp {
  ProgramAdmReqGroupID: number | undefined
}

export function AdmissionReqGroupRemoveLink(props: IAdmissionReqGroupRemoveLinkProp) {
  return (
    <Button
      danger
      type="primary"
      icon={<DeleteOutlined />}
      shape="circle"
      onClick={() =>
        showDeleteConfirm(() => {
          return deleteProgramAdmReqGroup({
            ProgramAdmReqGroupID: props.ProgramAdmReqGroupID
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
