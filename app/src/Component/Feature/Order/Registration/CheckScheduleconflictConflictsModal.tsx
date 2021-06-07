import React, { useState } from "react"
import { Button, Card } from "antd"
import Modal from "~/Component/Common/Modal/index2"
import zIndex from "~/utils/zIndex"

export const CheckScheduleconflictConflictsModal = (props: { sectionNumbers: any[] }) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <Button onClick={() => setShowModal(true)}>Details</Button>
      {showModal && (
        <Modal zIndex={zIndex.defaultModal + 10}>
          <Card title="Test Schedule Conflict" actions={[<Button onClick={() => setShowModal(false)}>Close</Button>]}>
            <table>
              <thead>
                <tr>
                  <th>Section Number</th>
                </tr>
              </thead>
              <tbody>
                {props.sectionNumbers.map((x) => (
                  <tr>
                    <td>{x.SectionNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </Modal>
      )}
    </>
  )
}
