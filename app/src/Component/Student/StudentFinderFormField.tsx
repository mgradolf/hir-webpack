import { Button, Typography, Form } from "antd"
import { FormInstance } from "antd/lib/form"
import React, { useState } from "react"
import StudentFinder from "~/Component/Student/index"
import { IStudent } from "~/Component/Student/StudentFinderModal"

const { Text } = Typography

interface IStudentFinder {
  AccountID: number
  formInstance?: FormInstance
  onSelectStudent?: (student: IStudent) => void
  onClearStudent?: () => void
}

function isSelectedStudentNotEmpty(student: IStudent | null): student is IStudent {
  return student !== null
}

function StudentFinderFormField(props: IStudentFinder) {
  const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null)

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
          aria-label="Clear Selected Student"
          onClick={() => {
            setSelectedStudent(null)
            if (props.onClearStudent) {
              props.onClearStudent()
            }
          }}
        >
          Clear Selected Student
        </Button>
      )}
    </Form.Item>
  )
}

export default StudentFinderFormField
