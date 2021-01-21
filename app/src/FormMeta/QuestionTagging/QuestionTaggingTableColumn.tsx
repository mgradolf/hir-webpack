import React from "react"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { Button, Checkbox, Select } from "antd"
import { CheckboxChangeEvent } from "antd/lib/checkbox"
import { Link } from "react-router-dom"
import { getTagQuestions, removeTagQuestions, updateTagQuestion } from "~/ApiServices/Service/QuestionService"
import { renderLink, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { eventBus, REFRESH_QUESTION_PAGE } from "~/utils/EventBus"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

import { getQuestionGroup } from "~/ApiServices/Service/RefLookupService"

interface IQuestionCheckBox {
  defaultChecked: boolean
  fieldName: string
  TagQuestionID: number
}
const QuestionCheckBox = (props: IQuestionCheckBox): JSX.Element => {
  return (
    <Checkbox
      defaultChecked={props.defaultChecked}
      onChange={(e: CheckboxChangeEvent) => {
        updateTagQuestion({
          TagQuestionID: props.TagQuestionID,
          [props.fieldName]: e.target.checked
        })
      }}
    />
  )
}

export interface IQuestion {
  TagQuestionID: number
  QuestionGroupID?: number
  IsEditable?: boolean
  IsRequired?: boolean
  IsActive?: boolean
  IsPublished?: boolean
}

interface IQuestionTable {
  allQuestionGroup: Array<{ [key: string]: any }>
}

export const getQuestionTaggingTableColumns = (isTab?: boolean): ITableConfigProp => {
  let allQuestionGroup: any[] = []
  getQuestionGroup().then((x) => {
    if (x.success) allQuestionGroup = x.data
  })
  const columns: TableColumnType = [
    {
      ...(isTab && {
        title: "Tag",
        dataIndex: "TagName",
        render: (text, record) => renderLink(`/tags/${record.TagID}`, text)
      })
    },
    {
      title: "Group",
      dataIndex: "QuestionGroupID",
      width: 170,
      render: (value: any, record: any) => {
        return isTab ? (
          record.QuestionGroupName
        ) : (
          <Select
            dropdownMatchSelectWidth={true}
            dropdownStyle={{ width: "170px", maxWidth: "170px" }}
            aria-label="Group"
            style={{ width: 250 }}
            defaultValue={value}
            onChange={(value) => updateTagQuestion({ TagQuestionID: record.TagQuestionID, QuestionGroupID: value })}
          >
            {allQuestionGroup
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
      dataIndex: "SortPosition",
      width: 100
    },
    {
      title: "Question",
      dataIndex: "Question",
      render: (text, record) => <Link to={`/question/${record.PreferenceDefID}`}>{text}</Link>
    },
    {
      title: "Required",
      dataIndex: "IsRequired",
      width: 100,
      render: (value: boolean, record: any) =>
        isTab ? (
          record.IsRequiredDisplay
        ) : (
          <QuestionCheckBox defaultChecked={value} fieldName="IsRequired" TagQuestionID={record.TagQuestionID} />
        )
    },
    {
      title: "Editable",
      dataIndex: "IsEditable",
      width: 100,
      render: (value: boolean, record: any) =>
        isTab ? (
          record.IsEditableDisplay
        ) : (
          <QuestionCheckBox defaultChecked={value} fieldName="IsEditable" TagQuestionID={record.TagQuestionID} />
        )
    },
    {
      title: "Published",
      dataIndex: "IsPublished",
      width: 100,
      render: (value: boolean, record: any) =>
        isTab ? (
          record.IsPublishedDisplay
        ) : (
          <QuestionCheckBox defaultChecked={value} fieldName="IsPublished" TagQuestionID={record.TagQuestionID} />
        )
    },
    {
      title: "Active",
      dataIndex: "IsActive",
      width: 100,
      render: (value: boolean, record: any) =>
        isTab ? (
          record.IsActiveDisplay
        ) : (
          <QuestionCheckBox defaultChecked={value} fieldName="IsActive" TagQuestionID={record.TagQuestionID} />
        )
    },
    {
      ...(!isTab && {
        render: (value: any, data: any) => (
          <Button
            type="primary"
            danger
            onClick={() => {
              removeTagQuestions({ TagQuestionIDs: [data.TagQuestionID] }).then((x) => {
                if (!x.success && x.error) {
                  const errors: Array<ISimplifiedApiErrorMessage> = x.error
                  errors.forEach((error) => {
                    // props.showGLobalApiError && props.showGLobalApiError(error.message)
                  })
                } else if (x.success) {
                  eventBus.publish(REFRESH_QUESTION_PAGE)
                }
              })
            }}
          >
            Remove
          </Button>
        )
      })
    }
  ]

  return { columns, searchFunc: getTagQuestions, responsiveColumnIndices: [], expandableColumnIndices: [] }
}
