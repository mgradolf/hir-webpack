import React, { useEffect, useState } from "react"
import { Button, Card, Form, Select } from "antd"
import TextArea from "antd/lib/input/TextArea"
import { findFaculty } from "~/ApiServices/Service/SectionService"
import { addSectionFacultyComment } from "~/ApiServices/Service/CommentService"
import { eventBus, REFRESH_SECTION_INSTRUCTOR_COMMENT_PAGE } from "~/utils/EventBus"

interface IInstructorCommentCreateForm {
  SectionID?: number
  commentCatagories: any[]
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
    addSectionFacultyComment({ ...formInstance.getFieldsValue(), SectionID: props.SectionID }).then((x) => {
      if (x.success) {
        eventBus.publish(REFRESH_SECTION_INSTRUCTOR_COMMENT_PAGE)
        props.onClose && props.onClose()
      }
      props.setApiCallInProgress(false)
    })
  }

  return (
    <Card
      title="Create Instructor Comment"
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
        <Form.Item label="Instructor" name="FacultyID" labelCol={{ span: 6 }}>
          <Select>
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
