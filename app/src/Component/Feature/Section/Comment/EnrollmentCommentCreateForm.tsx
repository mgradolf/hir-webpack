import React from "react"
import { Button, Card, Form, Select } from "antd"
import TextArea from "antd/lib/input/TextArea"
import { addEnrollmentComment } from "~/ApiServices/Service/CommentService"
import { eventBus, REFRESH_REGISTRATION_COMMENT_PAGE } from "~/utils/EventBus"

interface IEnrollmentCommentCreateForm {
  SectionID?: number
  StudentID?: number
  commentCatagories: any[]
  onClose?: () => void
  setApiCallInProgress: (flag: boolean) => void
}
export default function EnrollmentCommentCreateForm(props: IEnrollmentCommentCreateForm) {
  const [formInstance] = Form.useForm()

  const submit = () => {
    props.setApiCallInProgress(true)
    addEnrollmentComment({
      ...formInstance.getFieldsValue(),
      SectionID: props.SectionID,
      StudentID: props.StudentID
    }).then((x) => {
      if (x.success) {
        eventBus.publish(REFRESH_REGISTRATION_COMMENT_PAGE)
        props.onClose && props.onClose()
      }
      props.setApiCallInProgress(false)
    })
  }

  return (
    <Card
      title="Create Enrollment Comment"
      actions={[<Button onClick={props.onClose}>Cancel</Button>, <Button onClick={submit}>Submit</Button>]}
    >
      <Form form={formInstance}>
        <Form.Item label="Category" name="CommentCategoryID" labelCol={{ span: 6 }}>
          <Select>
            {props.commentCatagories.map((x, i) => (
              <Select.Option key={i} value={x.ID}>
                {x.Name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Commments" name="CommentText" labelCol={{ span: 6 }}>
          <TextArea></TextArea>
        </Form.Item>
      </Form>
    </Card>
  )
}
