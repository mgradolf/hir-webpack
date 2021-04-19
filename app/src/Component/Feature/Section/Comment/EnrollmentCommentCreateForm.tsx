import React from "react"
import { Button, Card, Col, Form, message, Row } from "antd"
import { addEnrollmentComment } from "~/ApiServices/Service/CommentService"
import { eventBus, REFRESH_REGISTRATION_COMMENT_PAGE } from "~/utils/EventBus"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import { getCommentCategories } from "~/ApiServices/Service/RefLookupService"
import { FormTextArea } from "~/Component/Common/Form/FormTextArea"
import { CREATE_SUCCESSFULLY } from "~/utils/Constants"

interface IEnrollmentCommentCreateForm {
  SectionID?: number
  StudentID?: number
  onClose?: () => void
  setApiCallInProgress: (flag: boolean) => void
}

export default function EnrollmentCommentCreateForm(props: IEnrollmentCommentCreateForm) {
  const [formInstance] = Form.useForm()

  const submit = async () => {
    await formInstance.validateFields()

    props.setApiCallInProgress(true)
    addEnrollmentComment({
      ...formInstance.getFieldsValue(),
      SectionID: props.SectionID,
      StudentID: props.StudentID
    }).then((x) => {
      if (x.success) {
        message.success(CREATE_SUCCESSFULLY)
        eventBus.publish(REFRESH_REGISTRATION_COMMENT_PAGE)
        props.onClose && props.onClose()
      }
      props.setApiCallInProgress(false)
    })
  }

  return (
    <Card
      title="Create Enrollment Comment"
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
            ]
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
