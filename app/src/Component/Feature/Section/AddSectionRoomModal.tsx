import * as React from "react"
import Modal from "~/Component/Common/Modal/index2"
import { Button, Card, Col, Form, Row } from "antd"
import { SiteBuildingRoomFilter } from "~/TableSearchMeta/Section/SectionSearchCustomFilters/SiteBuildingRoomFilter"
import { useState } from "react"

interface ISectionRoomModalProps {
  onClose: (items?: any) => void
  apiCallInProgress?: boolean
}

export function AddSectionRoomModal({ onClose, apiCallInProgress }: ISectionRoomModalProps) {
  const [formInstance] = Form.useForm()
  const [isRoom, setIsRoom] = useState<boolean>(false)

  return (
    <Modal
      width="800px"
      apiCallInProgress={apiCallInProgress}
      children={
        <>
          <Card
            title="Add Room"
            actions={[
              <Row justify="end" gutter={[8, 8]} style={{ marginRight: "10px" }}>
                <Col>
                  <Button type="primary" danger onClick={() => onClose()}>
                    Cancel
                  </Button>
                </Col>
                <Col>
                  <Button type="primary" disabled={!isRoom} onClick={() => onClose(formInstance.getFieldsValue())}>
                    Submit
                  </Button>
                </Col>
              </Row>
            ]}
          >
            <Form
              form={formInstance}
              scrollToFirstError
              style={{
                maxHeight: "80vh",
                overflowY: "scroll"
              }}
            >
              <SiteBuildingRoomFilter
                onSelectedItems={(items) => {
                  setIsRoom(true)
                }}
                fieldName=""
                label=""
                formInstance={formInstance}
              />
            </Form>
          </Card>
        </>
      }
    />
  )
}
