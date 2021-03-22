import React from "react"
import { Button, Menu, message } from "antd"
import { DELETE_SUCCESSFULLY } from "~/utils/Constants"
import { eventBus, REFRESH_PACKAGE_SEATGROUP_PAGE } from "~/utils/EventBus"
import { removeSection, updateSection } from "~/ApiServices/Service/PackageService"
import { PackageSeatGroupFormMeta } from "~/Component/Package/FormMeta/PackageSeatGroupFormMeta"
import { MetaDrivenFormModalOpenButton } from "~/Component/Common/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"

interface IPackageSeatGroupMenu {
  initialData: { [key: string]: any }
}

export default function PackageSeatGroupMenu(props: IPackageSeatGroupMenu) {
  return (
    <Menu>
      <Menu.Item key="0">
        <MetaDrivenFormModalOpenButton
          formTitle="Update Section"
          formMeta={PackageSeatGroupFormMeta}
          formSubmitApi={updateSection}
          initialFormValue={{
            ...props.initialData,
            AllocatedSeats: props.initialData.NumberOfSeats
          }}
          buttonLabel="Edit"
          buttonProps={{ type: "link" }}
          defaultFormValue={{
            PackageID: props.initialData.PackageID,
            AccountID: props.initialData.AccountID,
            SeatGroupID: props.initialData.SeatGroupID
          }}
          refreshEventName={REFRESH_PACKAGE_SEATGROUP_PAGE}
        />
      </Menu.Item>
      <Menu.Item key="1">
        <Button
          type="link"
          onClick={async () => {
            const response = await removeSection({
              SeatGroupID: props.initialData.SeatGroupID
            })
            if (response && response.success) {
              message.success(DELETE_SUCCESSFULLY)
              eventBus.publish(REFRESH_PACKAGE_SEATGROUP_PAGE)
            }
          }}
        >
          Remove
        </Button>
      </Menu.Item>
    </Menu>
  )
}
