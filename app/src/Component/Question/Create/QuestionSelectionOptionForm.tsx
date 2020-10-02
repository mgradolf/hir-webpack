import { Button, Input } from "antd"
import { TableRowSelection } from "antd/lib/table/interface"
import React, { useState } from "react"
import FixedQuestionSortableTable from "~/Component/Question/Create/FixedQuestionSortableTable"
import debounce from "~/utils/debounce"

import { SortableHandle as sortableHandle } from "react-sortable-hoc"
import { MenuOutlined } from "@ant-design/icons"
const DragHandle = sortableHandle(() => <MenuOutlined style={{ cursor: "pointer", color: "#999" }} />)

interface IDataSource {
  SortPosition: number
  TextValue: string
  IsDefault: boolean
  index: number
}

let count = 0

interface IQuestionSelectionOptionForm {
  setFixedOptions: (Params: Array<any>) => void
}

export default function QuestionSelectionOptionForm(props: IQuestionSelectionOptionForm) {
  const [dataSource, setDataSource] = useState<Array<IDataSource>>([])

  const updateDataSource = (Params: Array<any>) => {
    setDataSource(Params)
    props.setFixedOptions(Params)
  }

  const columns = [
    {
      title: "Drag",
      dataIndex: "sort",
      width: 30,
      className: "drag-visible",
      render: () => <DragHandle />
    },
    {
      title: "Sort Position",
      dataIndex: "SortPosition"
    },
    {
      title: "Value",
      dataIndex: "TextValue",
      render: (value: any, record: any) => (
        <Input
          defaultValue={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            e.persist()
            onUpdateValue({ value: e.target.value, record })
          }}
        />
      )
    },
    {
      title: "Remove",
      render: (value: any, record: any) => (
        <Button danger type="primary" onClick={() => onRemoveRow(record.index)}>
          Remove
        </Button>
      )
    }
  ]

  const rowSelection: TableRowSelection<any> = {
    onChange: (selectedRowKeys: Array<string | number>, selectedRows: Array<string | number>) => {
      setDataSource(
        dataSource.map((x) => {
          x.IsDefault = selectedRowKeys.findIndex((rowKey) => rowKey === x.index) >= 0
          return x
        })
      )
    },
    getCheckboxProps: (record: any) => ({
      name: record.name
    }),
    columnTitle: "Default"
  }

  const onUpdateValue = debounce((Params: any): void => {
    const { value, record } = Params

    updateDataSource(
      dataSource.map((x) => {
        if (record.index === x.index) x.TextValue = value
        return x
      })
    )
  }, 1000)

  const onRemoveRow = (index: number): void => {
    updateDataSource(
      dataSource
        .filter((x) => {
          return x.index !== index
        })
        .map((x, i) => {
          x.SortPosition = i + 1
          x.index = i + 1
          return x
        })
    )
  }

  const onAddRow = () => {
    updateDataSource([
      ...dataSource,
      {
        SortPosition: dataSource.length + 1,
        TextValue: "",
        IsDefault: false,
        index: count++
      }
    ])
  }

  return (
    <div style={{ border: "1px solid black" }}>
      <FixedQuestionSortableTable
        dataSource={dataSource}
        updatedList={updateDataSource}
        rowSelection={rowSelection}
        columns={columns}
      />
      <Button type="primary" onClick={onAddRow}>
        Add
      </Button>
    </div>
  )
}
