import { Button, Row, Typography } from "antd"
import { FormInstance } from "antd/lib/form"
import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
import { showAddProgramModal } from "~/store/ModalState"

const { Text } = Typography

interface IProgramFormFieldProps {
  valueKey: string
  formInstance: FormInstance
}

function ProgramFormField(props: IProgramFormFieldProps) {
  const { valueKey, formInstance } = props

  const dispatch = useDispatch()

  const openAddProgramModal = useCallback(
    (formInstance, valueKey) => dispatch(showAddProgramModal(true, { formInstance, valueKey })),
    [dispatch]
  )

  return (
    <Row align="middle" style={{ width: "280px" }} justify="space-between">
      <Text>{formInstance.getFieldValue(valueKey) || `No program selected`}</Text>
      <Button
        type="primary"
        aria-label="Select Program"
        onClick={() => {
          openAddProgramModal(formInstance, valueKey)
        }}
      >
        Select Program
      </Button>
    </Row>
  )
}

export default ProgramFormField
