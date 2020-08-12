import React, { useState } from "react"
import CreateNewOffering from "~/component/Offering/Create"
import { Button } from "antd"

export function CreateActionButton() {
  const [shouldOpenOfferingCreateForm, handleOfferingCreateForm] = useState<boolean>(false)
  return (
    <>
      <CreateNewOffering visible={shouldOpenOfferingCreateForm} onClose={handleOfferingCreateForm} />
      <Button type="primary" onClick={() => handleOfferingCreateForm(true)}>
        + Create Offering
      </Button>
    </>
  )
}
