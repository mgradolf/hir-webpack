import { Button } from "antd"
import React, { useState } from "react"
import FixedQuestionSortableTable from "~/Component/Question/Create/FixedQuestionSortableTable"

export default function QuestionSelectionOptionForm() {
  interface IOptionData {
    SortPosition: number
    TextValue: string
    IsDefault: boolean
    index: number
  }

  const [optionData, setOptionData] = useState<Array<IOptionData>>([])

  const addRow = () => {
    setOptionData([
      ...optionData,
      {
        SortPosition: optionData.length + 1,
        TextValue: "",
        IsDefault: false,
        index: optionData.length + 1
      }
    ])
  }

  return (
    <div style={{ border: "1px solid black" }}>
      <FixedQuestionSortableTable
        data={optionData}
        updatedList={(updatedData) => {
          console.log("updatedData ", updatedData)
        }}
      />
      <Button type="primary" onClick={addRow}>
        Add
      </Button>
    </div>
  )
}
