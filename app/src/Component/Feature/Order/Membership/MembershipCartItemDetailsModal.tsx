import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button, Card, Typography } from "antd"
import Modal from "~/Component/Common/Modal/index2"
import { IItemRequest, IMembershipRequest } from "~/Component/Feature/Order/Model/Interface/IModel"
import { WarningOutlined } from "@ant-design/icons"
import { CartModelFunctionality } from "~/Component/Feature/Order/Model/CartModelFunctionality"

export const MembershipCartItemDetailsModal = (props: {
  itemList: IItemRequest[]
  item: IMembershipRequest
  cartModelFunctionality: CartModelFunctionality
}) => {
  const [showModal, setShowModal] = useState(false)
  const [issueSolved, setIssueSolved] = useState(true)

  useEffect(() => {
    setIssueSolved(
      !!props.item.issues &&
        !props.item.issues.FixedTermMembershipAlreadyBought_passed &&
        !props.item.issues.FixterTermMembershipExpired_passed &&
        !props.item.issues.DuplicateRequestCheck_passed &&
        !props.item.issues.MembershipCannotBeRenewed_passed &&
        !props.item.issues.MembershipAlreadyBoughtAndRenewed_passed
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
        {`${props.item.RecipientPersonName ? props.item.RecipientPersonName : "Unassigned"} - ${
          props.item.ItemName
        } : ${props.item.MembershipDefinitionName}`}
      </Button>
      {showModal && (
        <Modal width="1000px">
          <Card
            title={
              <>
                Buy <Link to={`/membership/${props.item.MembershipDefinitionID}`}>{props.item.ItemName}</Link> for
                <Link to={`/person/${props.item.RecipientPersonID}`}>{props.item.RecipientPersonName}</Link>
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
              {issueSolved && (
                <>
                  <Typography.Title level={4}>Issues</Typography.Title>
                  <ul>
                    {!props.item.issues?.FixedTermMembershipAlreadyBought_passed && (
                      <li style={{ marginBottom: "15px" }}>
                        <span style={{ color: "red" }}>
                          <Link to={`/person/${props.item.RecipientPersonID}`}>{props.item.RecipientPersonName}</Link>{" "}
                          has fixed term membership
                        </span>
                      </li>
                    )}
                    {!props.item.issues?.FixterTermMembershipExpired_passed && (
                      <li style={{ marginBottom: "15px" }}>
                        <span style={{ color: "red" }}>
                          <Link to={`/membership/${props.item.MembershipDefinitionID}`}>{props.item.ItemName}</Link>{" "}
                          registration is not open.
                        </span>
                      </li>
                    )}
                    {!props.item.issues?.MembershipCannotBeRenewed_passed && (
                      <li style={{ marginBottom: "15px" }}>
                        <span style={{ color: "red" }}>
                          <Link to={`/membership/${props.item.MembershipDefinitionID}`}>{props.item.ItemName}</Link> is
                          not currently renewable.
                        </span>
                      </li>
                    )}
                    {!props.item.issues?.DuplicateRequestCheck_passed && (
                      <li style={{ marginBottom: "15px" }}>
                        <span style={{ color: "red" }}>
                          Anothe same request of{" "}
                          <Link to={`/person/${props.item.RecipientPersonID}`}>{props.item.RecipientPersonName}</Link>{" "}
                          is in process.
                        </span>
                      </li>
                    )}
                    {!props.item.issues?.MembershipAlreadyBoughtAndRenewed_passed && (
                      <li style={{ marginBottom: "15px" }}>
                        <span style={{ color: "red" }}>
                          <Link to={`/membership/${props.item.MembershipDefinitionID}`}>{props.item.ItemName}</Link> is
                          already renewed for
                          <Link to={`/person/${props.item.RecipientPersonID}`}>{props.item.RecipientPersonName}</Link>.
                        </span>
                      </li>
                    )}
                  </ul>
                </>
              )}
            </div>
          </Card>
        </Modal>
      )}
    </>
  )
}
