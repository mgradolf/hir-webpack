import { Button, Card, DatePicker, Form, Input } from "antd"
import React, { useEffect, useState } from "react"
import { DATE_FORMAT } from "~/utils/Constants"
import Modal from "~/Component/Common/Modal/index2"
import { bulkDropRegistration, bulkDeleteRegistration } from "~/ApiServices/Service/RegistrationService"
import { getSectionById } from "~/ApiServices/Service/EntityService"
import moment from "moment"

interface INoShowDeleteModal {
  SectionID: number
  selectedRows: any[]
  closeModal: () => void
}
export default function NoShowDeleteModal(props: INoShowDeleteModal) {
  const [EffectiveDate, setEffectiveDate] = useState("")
  const [finalEnrollmentDate, setFinalEnrollmentDate] = useState("initialState")
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  useEffect(() => {
    getSectionById(props.SectionID).then((x) => {
      if (x.success) {
        setFinalEnrollmentDate(moment(x.data.FinalEnrollmentDate).format(DATE_FORMAT))
      }
    })
  }, [props.SectionID])
  const onDrop = () => {
    setApiCallInProgress(true)
    bulkDropRegistration({
      SectionID: props.SectionID,
      EffectiveDate,
      RegistrationInfos: props.selectedRows
    }).then((x) => {
      setApiCallInProgress(false)
      if (x.success) props.closeModal()
    })
  }
  const onDelete = () => {
    setApiCallInProgress(true)
    bulkDeleteRegistration({
      SectionID: props.SectionID,
      EffectiveDate,
      RegistrationInfos: props.selectedRows
    }).then((x) => {
      setApiCallInProgress(false)
      if (x.success) props.closeModal()
    })
  }
  return (
    <Modal
      apiCallInProgress={apiCallInProgress}
      width="500px"
      children={
        <Card
          title="Drop/Delete From a Section"
          actions={[
            <Button danger type="primary" onClick={onDrop} disabled={EffectiveDate === ""}>
              Drop
            </Button>,
            <Button danger type="primary" onClick={onDelete} disabled={EffectiveDate === ""}>
              Delete
            </Button>,
            <Button type="primary" onClick={() => props.closeModal()}>
              Cancel
            </Button>
          ]}
        >
          <Form.Item label="Section ID" labelCol={{ span: 12 }}>
            <Input value={props.SectionID} disabled />
          </Form.Item>
          <Form.Item label="Final Enrollment Date" labelCol={{ span: 12 }}>
            <Input value={finalEnrollmentDate} disabled />
          </Form.Item>
          <Form.Item label="Final Enrollment Date" name="EffectiveDate" labelCol={{ span: 12 }}>
            <DatePicker
              format={DATE_FORMAT}
              onChange={(value: any, dateString: string) => {
                setEffectiveDate(dateString)
              }}
            />
          </Form.Item>
        </Card>
      }
    />
  )
}
