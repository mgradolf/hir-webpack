import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { Button, Checkbox, Col, Row, Select } from "antd"
import { CheckboxChangeEvent } from "antd/lib/checkbox"
import { ColumnsType } from "antd/lib/table/interface"
import React from "react"
import { connect } from "react-redux"
import { removeTagQuestions } from "~/ApiServices/Service/QuestionService"
import ResponsiveTable from "~/Component/Common/ResponsiveTable"
import { removeGLobalApiError, showGLobalApiError } from "~/Store/GlobalError"
import { eventBus, REFRESH_QUESTION_PAGE } from "~/utils/EventBus"

interface IQuestionCheckBox {
  defaultChecked: boolean
  fieldName: string
  TagQuestionID: number
  updateQuestion: (Params: IQuestion) => void
}
const QuestionCheckBox = (props: IQuestionCheckBox): JSX.Element => {
  return (
    <Checkbox
      defaultChecked={props.defaultChecked}
      onChange={(e: CheckboxChangeEvent) => {
        props.updateQuestion({
          TagQuestionID: props.TagQuestionID,
          [props.fieldName]: e.target.checked
        })
      }}
    />
  )
}

interface IQuestionTable {
  loading: boolean
  allQuestions: Array<{ [key: string]: any }>
  allQuestionGroup: Array<{ [key: string]: any }>
  updateQuestion: (params: IQuestion) => void
  showGLobalApiError: (params: any) => void
  removeGLobalApiError: (params: any) => void
}

export interface IQuestion {
  TagQuestionID: number
  QuestionGroupID?: number
  IsEditable?: boolean
  IsRequired?: boolean
  IsActive?: boolean
  IsPublished?: boolean
}

function QuestionTable(props: IQuestionTable) {
  const columns: ColumnsType<{ [key: string]: string }> = [
    {
      title: "Group",
      dataIndex: "QuestionGroupID",
      width: 170,
      render: (value: any, record: any) => {
        return (
          <Select
            dropdownMatchSelectWidth={true}
            dropdownStyle={{ width: "170px", maxWidth: "170px" }}
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
      dataIndex: "SortPosition",
      width: 100
    },
    {
      title: "Question",
      dataIndex: "Question",
      width: 200
    },
    {
      title: "Required",
      dataIndex: "IsRequired",
      width: 100,
      render: (value: boolean, record: any) => (
        <QuestionCheckBox
          defaultChecked={value}
          fieldName="IsRequired"
          TagQuestionID={record.TagQuestionID}
          updateQuestion={props.updateQuestion}
        />
      )
    },
    {
      title: "Editable",
      dataIndex: "IsEditable",
      width: 100,
      render: (value: boolean, record: any) => (
        <QuestionCheckBox
          defaultChecked={value}
          fieldName="IsEditable"
          TagQuestionID={record.TagQuestionID}
          updateQuestion={props.updateQuestion}
        />
      )
    },
    {
      title: "Published",
      dataIndex: "IsPublished",
      width: 100,
      render: (value: boolean, record: any) => (
        <QuestionCheckBox
          defaultChecked={value}
          fieldName="IsPublished"
          TagQuestionID={record.TagQuestionID}
          updateQuestion={props.updateQuestion}
        />
      )
    },
    {
      title: "Active",
      dataIndex: "IsActive",
      width: 100,
      render: (value: boolean, record: any) => (
        <QuestionCheckBox
          defaultChecked={value}
          fieldName="IsActive"
          TagQuestionID={record.TagQuestionID}
          updateQuestion={props.updateQuestion}
        />
      )
    },
    {
      render: (value: any, data: any) => (
        <Button
          type="primary"
          danger
          onClick={() => {
            removeTagQuestions({ TagQuestionIDs: [data.TagQuestionID] }).then((x) => {
              if (!x.success && x.error) {
                const errors: Array<ISimplifiedApiErrorMessage> = x.error
                errors.forEach((error) => {
                  props.showGLobalApiError && props.showGLobalApiError(error.message)
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
    }
  ]

  function expandableRowRender(data: any, mobileView: boolean) {
    return (
      <>
        {mobileView && (
          <div style={{ border: "1px solid", padding: "5px" }}>
            <Row>
              <Col span={6}>IsRequired</Col>
              <Col span={6}>
                <QuestionCheckBox
                  defaultChecked={data.IsRequired}
                  fieldName="IsRequired"
                  TagQuestionID={data.TagQuestionID}
                  updateQuestion={props.updateQuestion}
                />
              </Col>
            </Row>
            <Row>
              <Col span={6}>IsEditable</Col>
              <Col span={6}>
                <QuestionCheckBox
                  defaultChecked={data.IsEditable}
                  fieldName="IsEditable"
                  TagQuestionID={data.TagQuestionID}
                  updateQuestion={props.updateQuestion}
                />
              </Col>
            </Row>
            <Row>
              <Col span={6}>IsPublished</Col>
              <Col span={6}>
                <QuestionCheckBox
                  defaultChecked={data.IsPublished}
                  fieldName="IsPublished"
                  TagQuestionID={data.TagQuestionID}
                  updateQuestion={props.updateQuestion}
                />
              </Col>
            </Row>
            <Row>
              <Col span={6}>IsActive</Col>
              <Col span={6}>
                <QuestionCheckBox
                  defaultChecked={data.IsActive}
                  fieldName="IsActive"
                  TagQuestionID={data.TagQuestionID}
                  updateQuestion={props.updateQuestion}
                />
              </Col>
            </Row>
            <Row>
              <Button
                type="primary"
                danger
                onClick={() => {
                  removeTagQuestions({ TagQuestionIDs: [data.TagQuestionID] }).then((x) => {
                    if (!x.success && x.error) {
                      const errors: Array<ISimplifiedApiErrorMessage> = x.error
                      errors.forEach((error) => {
                        props.showGLobalApiError && props.showGLobalApiError(error.message)
                      })
                    } else if (x.success) {
                      eventBus.publish(REFRESH_QUESTION_PAGE)
                    }
                  })
                }}
              >
                Remove
              </Button>
            </Row>
          </div>
        )}
      </>
    )
  }
  return (
    <ResponsiveTable
      bordered
      loading={props.loading}
      rowKey="TagQuestionID"
      columns={columns}
      dataSource={props.allQuestions}
      pagination={{ position: ["topLeft"], pageSize: 20 }}
      breakpoints={["lg", "xl", "xxl"]}
      responsiveColumnIndices={[3, 4, 5, 6]}
      expandableRowRender={expandableRowRender}
      scroll={{ x: 300 }}
    />
  )
}

export default connect(undefined, { removeGLobalApiError, showGLobalApiError })(QuestionTable)
