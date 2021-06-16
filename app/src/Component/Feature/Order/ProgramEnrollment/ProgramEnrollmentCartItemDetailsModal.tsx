import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button, Card, Typography } from "antd"
import Modal from "~/Component/Common/Modal/index2"
import { IItemRequest, IProgramEnrollmentRequest } from "~/Component/Feature/Order/Model/Interface/IModel"
import { WarningOutlined } from "@ant-design/icons"
import { CartModelFunctionality } from "~/Component/Feature/Order/Model/CartModelFunctionality"

export const ProgramEnrollmentCartItemDetailsModal = (props: {
  itemList: IItemRequest[]
  item: IProgramEnrollmentRequest
  cartModelFunctionality: CartModelFunctionality
}) => {
  const [showModal, setShowModal] = useState(false)
  const [issueSolved, setIssueSolved] = useState(true)

  useEffect(() => {
    setIssueSolved(
      !!props.item.issues &&
        !props.item.issues.program_validity_passed &&
        !props.item.issues.check_enrollment_passed &&
        !props.item.issues.check_application_approval_passed &&
        !props.item.issues.DuplicateRequestCheck_passed
    )
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Button
        disabled={props.item.varificationInProgress}
        loading={props.item.varificationInProgress}
        type="link"
        onClick={() => {
          setShowModal(true)
        }}
      >
        {!props.item.varificationInProgress && !issueSolved && (
          <WarningOutlined style={{ color: "#f11e1e", fontSize: "16px" }} />
        )}
        {`${props.item.RecipientPersonName ? props.item.RecipientPersonName : "Unassigned"} - ${props.item.ItemName}`}
      </Button>
      {showModal && (
        <Modal width="1000px">
          <Card
            title={
              <>
                Register <Link to={`/person/${props.item.RecipientPersonID}`}>{props.item.RecipientPersonName}</Link> in{" "}
                <Link to={`/program/${props.item.ProgramID}`}>{props.item.ItemName}</Link> (Program Enrollment)
              </>
            }
            actions={[
              <Button type="ghost" onClick={() => setShowModal(false)}>
                Close
              </Button>
            ]}
          >
            <div
              style={{
                maxHeight: "70vh",
                overflowY: "scroll"
              }}
            >
              <Typography.Title level={4}>Issues</Typography.Title>
              <ul>
                {!props.item.issues?.program_validity_passed && (
                  <li style={{ marginBottom: "15px" }}>
                    <span style={{ color: "red" }}>The Program is not open for apply/enroll.</span>
                  </li>
                )}
                {!props.item.issues?.check_application_approval_passed && (
                  <li style={{ marginBottom: "15px" }}>
                    <span style={{ color: "red" }}>There are issues with Application approval.</span>
                  </li>
                )}
                {!props.item.issues?.check_enrollment_passed && (
                  <li style={{ marginBottom: "15px" }}>
                    <span style={{ color: "red" }}>
                      <Link to={`/person/${props.item.RecipientPersonID}`}>{props.item.RecipientPersonName}</Link>{" "}
                      already applied for Enrollment.
                    </span>
                  </li>
                )}
                {!props.item.issues?.DuplicateRequestCheck_passed && (
                  <li style={{ marginBottom: "15px" }}>
                    <span style={{ color: "red" }}>
                      Anothe same request of{" "}
                      <Link to={`/person/${props.item.RecipientPersonID}`}>{props.item.RecipientPersonName}</Link> is in
                      process.
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </Card>
        </Modal>
      )}
    </>
  )
}