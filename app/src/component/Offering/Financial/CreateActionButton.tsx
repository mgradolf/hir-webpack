import React, { useState } from "react"
import { Button } from "antd"

export function CreateActionButton() {
  const [shouldOpenFinancialCreateForm, handleFinancialCreateForm] = useState<boolean>(false)
  return (
    <>
      {/* TODO: A modal component with a boolean visibility property should be placed here */}
      <Button type="primary">+ Create Offering Financial</Button>
    </>
  )
}
