import React, { useEffect, useState } from "react"
import { Button, Card, Form, Select } from "antd"
import TextArea from "antd/lib/input/TextArea"
import { findEnrollmentStudentHistory, saveEnrollmentComment } from "~/ApiServices/Service/SectionService"

interface IEnrollmentCommentCreateForm {
  SectionID: number
  commentCatagories: any[]
  onCancel: () => void
  onClose?: () => void
  setApiCallInProgress: (flag: boolean) => void
}
export default function EnrollmentCommentCreateForm(props: IEnrollmentCommentCreateForm) {
  const [students, setStudents] = useState<any[]>([])
  useEffect(() => {
    findEnrollmentStudentHistory({ SectionID: props.SectionID }).then((x) => {
      if (x.success) setStudents(x.data)
    })
  }, [props.SectionID])
  const [formInstance] = Form.useForm()
  const submit = () => {
    props.setApiCallInProgress(true)
    saveEnrollmentComment({ ...formInstance.getFieldsValue(), SectionID: props.SectionID }).then((x) => {
      if (x.success) {
        props.onClose && props.onClose()
      }
      props.setApiCallInProgress(false)
    })
  }
  return (
    <Card
      title="Create Enrollment Comment"
      actions={[<Button onClick={props.onCancel}>Cancel</Button>, <Button onClick={submit}>Select</Button>]}
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
        <Form.Item label="Students" name="StudentIDs" labelCol={{ span: 6 }}>
          <Select mode="multiple">
            {students.map((x, i) => (
              <Select.Option key={i} value={x.StudentID}>
                {x.FirstName} {x.LastName}, ID: {x.StudentID}, Status: {x.Status}
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
