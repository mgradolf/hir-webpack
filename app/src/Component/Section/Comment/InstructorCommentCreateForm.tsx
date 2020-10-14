import React, { useEffect, useState } from "react"
import { Button, Card, Form, Select } from "antd"
import TextArea from "antd/lib/input/TextArea"
import { findFaculty, saveFacultyComment } from "~/ApiServices/Service/SectionService"

interface IInstructorCommentCreateForm {
  SectionID: number
  commentCatagories: any[]
  onCancel: () => void
  onClose?: () => void
  setApiCallInProgress: (flag: boolean) => void
}
export default function InstructorCommentCreateForm(props: IInstructorCommentCreateForm) {
  const [faulties, setFaulties] = useState<any[]>([])
  useEffect(() => {
    findFaculty({ SectionID: props.SectionID }).then((x) => {
      if (x.success) setFaulties(x.data)
    })
  }, [props.SectionID])
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
        <Form.Item label="Category" name="CommentCategoryID" labelCol={{ span: 6 }}>
          <Select>
            {props.commentCatagories.map((x, i) => (
              <Select.Option key={i} value={x.ID}>
                {x.Name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Instructor" name="FacultyIDs" labelCol={{ span: 6 }}>
          <Select mode="multiple">
            {faulties.map((x, i) => (
              <Select.Option key={i} value={x.FacultyID}>
                {x.FirstName} {x.LastName}, ID: {x.FacultyID}, Role: {x.FacultyRoleInSection}
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
