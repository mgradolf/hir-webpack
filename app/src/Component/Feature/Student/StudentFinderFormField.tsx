import { Button, Typography, Form } from "antd"
import { FormInstance } from "antd/lib/form"
import React, { useState } from "react"
import StudentFinder from "~/Component/Feature/Student/index"
import { IStudent } from "~/Component/Feature/Student/StudentFinderModal"
import AddContactModalOpenButton from "~/Component/Feature/Student/AddContactModalOpenButton"

const { Text } = Typography

interface IStudentFinder {
  initialData: { [key: string]: any }
  AccountID: number
  formInstance?: FormInstance
  onSelectStudent?: (student: IStudent) => void
  onClearStudent?: () => void
}

function isSelectedStudentNotEmpty(student: IStudent | null): student is IStudent {
  return student !== null
}

function StudentFinderFormField(props: IStudentFinder) {
  const recipientPersonID = props.initialData.RecipientPersonID
  const recipientPersonName = props.initialData.RecipientPersonName

  const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(
    recipientPersonID !== undefined ? { PersonID: recipientPersonID, PersonName: recipientPersonName } : null
  )

  const label = isSelectedStudentNotEmpty(selectedStudent) ? selectedStudent.PersonName : `No student selected`

  return (
    <Form.Item label="Student:" labelCol={{ span: 8 }}>
      <Text style={{ marginRight: "16px" }}>{label}</Text>
      <StudentFinder
        style={{ marginRight: "16px" }}
        AccountID={props.AccountID}
        onSelectStudent={(student) => {
          setSelectedStudent(student)
          if (props.onSelectStudent) {
            props.onSelectStudent(student)
          }
        }}
      />
      {selectedStudent !== null && (
        <Button
          style={{ marginRight: "16px" }}
          aria-label="Clear Selected Student"
          onClick={() => {
            setSelectedStudent(null)
            if (props.onClearStudent) {
              props.onClearStudent()
            }
          }}
        >
          Clear
        </Button>
      )}
      <AddContactModalOpenButton AccountID={props.AccountID} />
    </Form.Item>
  )
}

export default StudentFinderFormField
