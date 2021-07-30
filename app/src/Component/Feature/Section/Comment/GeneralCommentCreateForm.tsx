import React from "react"
import { Button, Card, Col, Form, message, Row } from "antd"
import { addSectionComment, addStudentComment, addFacultyComment } from "~/ApiServices/Service/CommentService"
import {
  eventBus,
  REFRESH_SECTION_GENERAL_COMMENT_PAGE,
  REFRESH_STUDENT_COMMENT_PAGE,
  REFRESH_INSTRUCTOR_COMMENT_PAGE
} from "~/utils/EventBus"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import { getCommentCategories } from "~/ApiServices/Service/RefLookupService"
import { FormTextArea } from "~/Component/Common/Form/FormTextArea"
import { CREATE_SUCCESSFULLY } from "~/utils/Constants"
import { HelpButton } from "~/Component/Common/Form/Buttons/HelpButton"

interface IGeneralCommentCreateForm {
  SectionID?: number
  StudentID?: number
  FacultyID?: number
  onClose?: () => void
  setApiCallInProgress: (flag: boolean) => void
}
export default function GeneralCommentCreateForm(props: IGeneralCommentCreateForm) {
  const [formInstance] = Form.useForm()

  const submit = async () => {
    await formInstance.validateFields()

    const params = { ...formInstance.getFieldsValue() }
    props.setApiCallInProgress(true)
    if (props.SectionID) {
      params["SectionID"] = props.SectionID
      addSectionComment(params).then((x) => {
        if (x.success) {
          message.success(CREATE_SUCCESSFULLY)
          eventBus.publish(REFRESH_SECTION_GENERAL_COMMENT_PAGE)
          props.onClose && props.onClose()
        }
        props.setApiCallInProgress(false)
      })
    } else if (props.StudentID) {
      params["StudentID"] = props.StudentID
      addStudentComment(params).then((x) => {
        if (x.success) {
          message.success(CREATE_SUCCESSFULLY)
          eventBus.publish(REFRESH_STUDENT_COMMENT_PAGE)
          props.onClose && props.onClose()
        }
        props.setApiCallInProgress(false)
      })
    } else if (props.FacultyID) {
      params["FacultyID"] = props.FacultyID
      addFacultyComment(params).then((x) => {
        if (x.success) {
          message.success(CREATE_SUCCESSFULLY)
          eventBus.publish(REFRESH_INSTRUCTOR_COMMENT_PAGE)
          props.onClose && props.onClose()
        }
        props.setApiCallInProgress(false)
      })
    }
  }

  return (
    <Card
      title={
        <Row justify="space-between">
          <Col>Create General Comment</Col>
          <Col>
            <HelpButton helpKey="sectionCommentsCreateGeneralCommentForm" />
          </Col>
        </Row>
      }
      actions={[
        <Row justify="end" gutter={[8, 8]} style={{ marginRight: "10px" }}>
          <Col>
            <Button type="primary" danger onClick={props.onClose}>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button type="primary" onClick={submit}>
              Submit
            </Button>
          </Col>
        </Row>
      ]}
    >
      <Form form={formInstance}>
        <FormDropDown
          labelColSpan={8}
          wrapperColSpan={14}
          label={"Category"}
          ariaLabel={"Comment category select"}
          formInstance={formInstance}
          fieldName={"CommentCategoryID"}
          refLookupService={getCommentCategories}
          displayKey="Name"
          valueKey="ID"
          rules={[{ required: true, message: "Please select category!" }]}
        />
        <FormTextArea
          label={"Comments"}
          formInstance={formInstance}
          fieldName="CommentText"
          labelColSpan={8}
          wrapperColSpan={14}
          rules={[{ required: true, message: "Please enter comment!" }]}
        />
      </Form>
    </Card>
  )
}
