import React from "react"
import { Link } from "react-router-dom"
import { Typography } from "antd"
import { CartModelFunctionality } from "~/Component/Feature/Order/Model/CartModelFunctionality"
import { IItemRequest, IOverride, IRegistrationRequest } from "~/Component/Feature/Order//Model/Interface/IModel"
import { PrerequisiteCheck } from "~/Component/Feature/Order/Registration/Issues/PrerequisiteCheck"
import { RegistrationQuestionCheck } from "~/Component/Feature/Order/Registration/Issues/RegistrationQuestionCheck"
import { ScheduleConflict } from "~/Component/Feature/Order/Registration/Issues/ScheduleConflict"
import { StudentOnHoldCheck } from "~/Component/Feature/Order/Registration/Issues/StudentOnHoldCheck"

export default function RegistrationIssues(props: {
  itemList: IItemRequest[]
  item: IRegistrationRequest
  cartModelFunctionality: CartModelFunctionality
  setOverRide: (overRide: IOverride) => void
  overRide: IOverride
}) {
  return (
    <>
      {props.item.issues && (
        <div style={{ width: "600px", display: "block", margin: "auto" }}>
          <Typography.Title level={4}>Registration Issues</Typography.Title>
          <ol>
            <ScheduleConflict {...props} />
            <PrerequisiteCheck {...props} />
            <RegistrationQuestionCheck {...props} />
            <StudentOnHoldCheck {...props} />
            {!props.item.issues?.RegistrationCheck_passed && (
              <li style={{ marginBottom: "15px" }}>
                <span style={{ color: "red" }}>
                  <>
                    Recipient{" "}
                    <Link
                      target="_blank"
                      style={{
                        color: "red",
                        fontWeight: 900
                      }}
                      to={`/person/${props.item.RecipientPersonID}`}
                    >
                      {props.item.RecipientPersonName}
                    </Link>{" "}
                    is already registered in{" "}
                    <Link
                      target="_blank"
                      style={{
                        color: "red",
                        fontWeight: 900
                      }}
                      to={`/section/${props.item.SectionID}`}
                    >
                      {props.item.ItemName}
                    </Link>
                  </>
                </span>
              </li>
            )}
            {!props.item.issues?.SectionValidityCheck_passed && (
              <li style={{ marginBottom: "15px" }}>
                <span style={{ color: "red" }}>
                  <>
                    Section{" "}
                    <Link
                      target="_blank"
                      style={{
                        color: "red",
                        fontWeight: 900
                      }}
                      to={`/section/${props.item.SectionID}`}
                    >
                      {props.item.ItemName}
                    </Link>{" "}
                    is not open for Registration
                  </>
                </span>
              </li>
            )}
            {!props.item.issues?.DuplicateRequestCheck_passed && (
              <li style={{ marginBottom: "15px" }}>
                <span style={{ color: "red" }}>
                  <>
                    There is another request of Recipient{" "}
                    <Link
                      target="_blank"
                      style={{
                        color: "red",
                        fontWeight: 900
                      }}
                      to={`/section/${props.item.SectionID}`}
                    >
                      {props.item.ItemName}
                    </Link>{" "}
                    to Register in the Section{" "}
                    <Link
                      target="_blank"
                      style={{
                        color: "red",
                        fontWeight: 900
                      }}
                      to={`/section/${props.item.SectionID}`}
                    >
                      {props.item.ItemName}
                    </Link>{" "}
                  </>
                </span>
              </li>
            )}
          </ol>
        </div>
      )}
    </>
  )
}
