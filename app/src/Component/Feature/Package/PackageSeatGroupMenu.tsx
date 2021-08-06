import React from "react"
import { Button, Tooltip } from "antd"
import { eventBus, REFRESH_PACKAGE_SEATGROUP_PAGE } from "~/utils/EventBus"
import { removeSection, updateSection } from "~/ApiServices/Service/PackageService"
import { PackageSeatGroupFormMeta } from "~/Component/Feature/Package/FormMeta/PackageSeatGroupFormMeta"
import { MetaDrivenFormModalOpenButton } from "~/Component/Common/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { DeleteOutlined } from "@ant-design/icons"
import { showDeleteConfirm } from "~/Component/Common/Modal/Confirmation"

interface IPackageSeatGroupMenu {
  initialData: { [key: string]: any }
}

export default function PackageSeatGroupMenu(props: IPackageSeatGroupMenu) {
  return (
    <>
      <MetaDrivenFormModalOpenButton
        helpkey="accountPackagesSeatGroupUpdateSectionForm"
        formTitle="Update Section"
        formMeta={PackageSeatGroupFormMeta}
        formSubmitApi={updateSection}
        initialFormValue={{
          ...props.initialData,
          AllocatedSeats: props.initialData.NumberOfSeats
        }}
        iconType="edit"
        buttonLabel="Edit"
        defaultFormValue={{
          PackageID: props.initialData.PackageID,
          AccountID: props.initialData.AccountID,
          SeatGroupID: props.initialData.SeatGroupID
        }}
        refreshEventName={REFRESH_PACKAGE_SEATGROUP_PAGE}
      />
      <Tooltip title="Remove">
        <Button
          danger
          type="primary"
          icon={<DeleteOutlined />}
          shape="circle"
          onClick={() =>
            showDeleteConfirm(() => {
              return removeSection({
                SeatGroupID: props.initialData.SeatGroupID
              }).then((x) => {
                if (x.success) {
                  eventBus.publish(REFRESH_PACKAGE_SEATGROUP_PAGE)
                }
                return x
              })
            })
          }
        />
      </Tooltip>
    </>
  )
}
