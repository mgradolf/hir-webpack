import { Button } from "antd"
import React from "react"
import { Link } from "react-router-dom"
import { IOverride, IRegistrationRequest } from "~/Component/Feature/Order/Model/Interface/IModel"

export const StudentOnHoldCheck = (props: {
  item: IRegistrationRequest
  overRide: IOverride
  setOverRide: (overRide: IOverride) => void
}) => {
  return (
    <>
      {!props.item.issues?.StudentOnHoldCheck_passed && (
        <li style={{ marginBottom: "15px" }}>
          <span
            style={{
              color: props.overRide.StudentOnHoldCheck ? "green" : "red",
              textDecorationLine: props.overRide.StudentOnHoldCheck ? "line-through" : "none"
            }}
          >
            Recipient{" "}
            <Link
              target="_blank"
              style={{
                color: props.overRide.StudentOnHoldCheck ? "green" : "red",
                fontWeight: 900
              }}
              to={`/person/${props.item.RecipientPersonID}`}
            >
              {props.item.RecipientPersonName}
            </Link>{" "}
            is on Hold.
          </span>
          &nbsp;
          <Button
            type="link"
            style={{ cursor: "pointer", color: props.overRide.StudentOnHoldCheck ? "red" : "green" }}
            onClick={() => {
              props.setOverRide({
                ...props.overRide,
                StudentOnHoldCheck: !props.overRide.StudentOnHoldCheck,
                StudentOnHoldCheckWithMessage: !props.overRide.StudentOnHoldCheckWithMessage
              })
            }}
          >
            Click here to {props.overRide.StudentOnHoldCheck ? "Unwave it" : "Wave it"}.
          </Button>
        </li>
      )}
    </>
  )
}
