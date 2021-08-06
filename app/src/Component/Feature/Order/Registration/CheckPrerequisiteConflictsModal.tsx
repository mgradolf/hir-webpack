import React, { useState } from "react"
import { Button, Card } from "antd"
import Modal from "~/Component/Common/Modal/index2"
import zIndex from "~/utils/zIndex"

export const CheckPrerequisiteConflictsModal = (props: { offerings: any[] }) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <Button onClick={() => setShowModal(true)}>Details</Button>
      {showModal && (
        <Modal zIndex={zIndex.defaultModal + 10}>
          <Card title="Prerequisite Conflicts" actions={[<Button onClick={() => setShowModal(false)}>Close</Button>]}>
            <table>
              <thead>
                <tr>
                  <th>Offering Code</th>
                  <th>Offering Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {props.offerings.map((x) => (
                  <tr>
                    <td>{x.OfferingCode}</td>
                    <td>{x.OfferingName}</td>
                    <td>{x.Status}</td>
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
