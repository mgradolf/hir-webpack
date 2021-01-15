import { Button, Card, Col } from "antd"
import React, { useState, useEffect, useCallback } from "react"
import Modal from "~/Component/Common/Modal"
import StudentListTable from "~/Component/Student/StudentListTable"

import { useDispatch } from "react-redux"

import { showStudentFinderModal } from "~/Store/ModalState"
import { getAccountAffiliation } from "~/ApiServices/Service/AccountService"

export interface IStudent {
  PersonID: number
  PersonName: string
}

interface IStudentFinderProps {
  AccountID: number
  onSelectStudent: (selectedStudent: IStudent) => void
}

function StudentFinderModal(props: IStudentFinderProps) {
  const [students, setStudents] = useState<Array<any>>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null)

  const dispatch = useDispatch()
  const closeStudentFinderModal = useCallback(() => dispatch(showStudentFinderModal(false)), [dispatch])

  useEffect(() => {
    ;(async function () {
      setLoading(true)
      const result = await getAccountAffiliation({ AccountID: props.AccountID, AccountAffiliationStatusID: 1 })
      if (result && result.success) {
        setStudents(result.data)
      }
      setLoading(false)
    })()
  }, [props])

  const cardActions = [
    <Button onClick={closeStudentFinderModal}>Cancel</Button>,
    <Button
      disabled={selectedStudent === null}
      onClick={() => {
        props.onSelectStudent({
          PersonID: selectedStudent !== null ? selectedStudent.PersonID : "",
          PersonName: selectedStudent !== null ? selectedStudent.PersonName : ""
        })
        closeStudentFinderModal()
      }}
    >
      Select
    </Button>
  ]

  const rowSelection = {
    type: "radio",
    onChange: (selectedRowKeys: any, selectedRows: any[]) => {
      setSelectedStudent(selectedRows[0])
    }
  }

  return (
    <Modal showModal width="800px">
      <Card title="Select Student" actions={cardActions}>
        {students.length > 0 && (
          <Col style={{ height: "65vh", overflowY: "scroll" }}>
            <StudentListTable id="studentList" dataSource={students} loading={loading} rowSelection={rowSelection} />
          </Col>
        )}
      </Card>
    </Modal>
  )
}

export default StudentFinderModal
