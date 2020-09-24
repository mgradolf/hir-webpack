import { Button, Row, Typography } from "antd"
import { FormInstance } from "antd/lib/form"
import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
import { showAddProgramModal } from "~/store/ModalState"
import styles from "~/Component/Program/ProgramFormField.module.scss"

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

  const value = formInstance.getFieldValue(valueKey)
  const selectButtonLabel = value ? "Change" : "Select Program"

  return (
    <Row align="middle">
      <Text className={styles.Program_field_sub_component}>{value || `No program selected`}</Text>
      {value && (
        <Button
          aria-label="Clear Program"
          onClick={() => {
            formInstance.setFieldsValue({ [valueKey]: "" })
          }}
          className={styles.Program_field_sub_component}
        >
          Clear
        </Button>
      )}
      <Button
        type="primary"
        aria-label={selectButtonLabel}
        onClick={() => {
          openAddProgramModal(formInstance, valueKey)
        }}
      >
        {selectButtonLabel}
      </Button>
    </Row>
  )
}

export default ProgramFormField
