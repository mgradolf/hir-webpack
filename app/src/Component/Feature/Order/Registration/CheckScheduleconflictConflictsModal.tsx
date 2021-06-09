import React, { useState } from "react"
import { Button, Card } from "antd"
import Modal from "~/Component/Common/Modal/index2"
import zIndex from "~/utils/zIndex"
import { IRegistrationRequest } from "~/Component/Feature/Order/Model/Interface/IModel"
import { Link } from "react-router-dom"

export const CheckScheduleconflictConflictsModal = (props: { items: IRegistrationRequest }) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <Button onClick={() => setShowModal(true)}>Details</Button>
      {showModal && (
        <Modal zIndex={zIndex.defaultModal + 10} width="500px">
          <Card title="Test Schedule Conflict" actions={[<Button onClick={() => setShowModal(false)}>Close</Button>]}>
            <table>
              <thead>
                <tr>
                  <th>
                    <Link to={`/section/${props.items.SectionID}`}>{props.items.ItemName}</Link> has Schedule Conflict
                    with the Following Sections:
                  </th>
                </tr>
              </thead>
              <tbody>
                {props.items.issues &&
                  props.items.issues.check_scheduleconflict_conflicts &&
                  props.items.issues.check_scheduleconflict_conflicts.map((x) => (
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
