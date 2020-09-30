import { Checkbox, Select } from "antd"
import { CheckboxChangeEvent } from "antd/lib/checkbox"
import { ColumnsType } from "antd/lib/table/interface"
import React from "react"
import ResponsiveTable from "~/Component/Common/ResponsiveTable"

interface IQuestionTable {
  loading: boolean
  allQuestions: Array<{ [key: string]: any }>
  allQuestionGroup: Array<{ [key: string]: any }>
  updateQuestion: (params: IQuestion) => void
}

export interface IQuestion {
  TagQuestionID: number
  QuestionGroupID?: number
  IsEditable?: boolean
  IsRequired?: boolean
  IsActive?: boolean
  IsPublished?: boolean
}

export default function QuestionTable(props: IQuestionTable) {
  const columns: ColumnsType<{ [key: string]: string }> = [
    {
      title: "Group",
      dataIndex: "QuestionGroupID",
      width: 100,
      render: (value: any, record: any) => {
        return (
          <Select
            aria-label="Group"
            style={{ width: 250 }}
            defaultValue={value}
            onChange={(value) => props.updateQuestion({ TagQuestionID: record.TagQuestionID, QuestionGroupID: value })}
          >
            {props.allQuestionGroup
              .filter((x) => x.IsActive)
              .map(({ Name, ID }, i) => (
                <Select.Option value={ID} key={`${ID}_${i}_${Name}`}>
                  {Name}
                </Select.Option>
              ))}
          </Select>
        )
      }
    },
    {
      title: "Sort Order",
      dataIndex: "SortPosition"
    },
    {
      title: "Question",
      dataIndex: "Question"
    },
    {
      title: "Required",
      dataIndex: "IsRequired",
      render: (value: boolean, record: any) => {
        return (
          <Checkbox
            defaultChecked={value}
            onChange={(e: CheckboxChangeEvent) => {
              console.log(e.target.checked)
              console.log(record)
              props.updateQuestion({
                TagQuestionID: record.TagQuestionID,
                IsRequired: e.target.checked
              })
            }}
          />
        )
      }
    },
    {
      title: "Editable",
      dataIndex: "IsEditable",
      render: (value: boolean, record: any) => {
        return (
          <Checkbox
            defaultChecked={value}
            onChange={(e: CheckboxChangeEvent) => {
              console.log(e.target.checked)
              console.log(record)
              props.updateQuestion({
                TagQuestionID: record.TagQuestionID,
                IsEditable: e.target.checked
              })
            }}
          />
        )
      }
    },
    {
      title: "Published",
      dataIndex: "IsPublished",
      render: (value: boolean, record: any) => {
        return (
          <Checkbox
            defaultChecked={value}
            onChange={(e: CheckboxChangeEvent) => {
              console.log(e.target.checked)
              console.log(record)
              props.updateQuestion({
                TagQuestionID: record.TagQuestionID,
                IsPublished: e.target.checked
              })
            }}
          />
        )
      }
    },
    {
      title: "Active",
      dataIndex: "IsActive",
      render: (value: boolean, record: any) => {
        return (
          <Checkbox
            defaultChecked={value}
            onChange={(e: CheckboxChangeEvent) => {
              console.log(e.target.checked)
              console.log(record)
              props.updateQuestion({
                TagQuestionID: record.TagQuestionID,
                IsActive: e.target.checked
              })
            }}
          />
        )
      }
    }
  ]
  return (
    <ResponsiveTable loading={props.loading} rowKey="TagQuestionID" columns={columns} dataSource={props.allQuestions} />
  )
}
