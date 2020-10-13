import React from "react"
import { Button, Card, Form, Select } from "antd"
import TextArea from "antd/lib/input/TextArea"
import { saveFacultyComment } from "~/ApiServices/Service/SectionService"

interface IInstructorCommentCreateForm {
  SectionID: number
  commentCatagories: any[]
  onCancel: () => void
  onClose?: () => void
  setApiCallInProgress: (flag: boolean) => void
}
export default function InstructorCommentCreateForm(props: IInstructorCommentCreateForm) {
  const [formInstance] = Form.useForm()
  const submit = () => {
    props.setApiCallInProgress(true)
    saveFacultyComment({ ...formInstance.getFieldsValue(), SectionID: props.SectionID }).then((x) => {
      if (x.success) {
        props.onClose && props.onClose()
      }
      props.setApiCallInProgress(false)
    })
  }
  return (
    <Card
      title="Create Instructor Comment"
      actions={[<Button onClick={props.onCancel}>Cancel</Button>, <Button onClick={submit}>Select</Button>]}
    >
      <Form form={formInstance}>
        <Form.Item label="Category">
          <Select>
            {props.commentCatagories.map((x, i) => (
              <Select.Option key={i} value={x.ID}>
                {x.Name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Commments" name="CommentText">
          <TextArea></TextArea>
        </Form.Item>
      </Form>
    </Card>
  )
}
