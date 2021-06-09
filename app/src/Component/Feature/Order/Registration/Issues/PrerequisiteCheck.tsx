import { Button } from "antd"
import React from "react"
import { Link } from "react-router-dom"
import { IOverride, IRegistrationRequest } from "~/Component/Feature/Order/Model/Interface/IModel"

export const PrerequisiteCheck = (props: {
  item: IRegistrationRequest
  overRide: IOverride
  setOverRide: (overRide: IOverride) => void
}) => {
  return (
    <>
      {!props.item.issues?.PrerequisiteCheck_passed && props.item.issues?.check_prerequisiteconflict_conflicts && (
        <li style={{ marginBottom: "15px" }}>
          <span
            style={{
              color: props.overRide.SectionPrerequisiteCheck ? "green" : "red",
              textDecorationLine: props.overRide.SectionPrerequisiteCheck ? "line-through" : "none"
            }}
          >
            Following Pre Requisite Course(s) has not been take by the{" "}
            <Link
              target="_blank"
              style={{
                color: props.overRide.SectionPrerequisiteCheck ? "green" : "red",
                fontWeight: 900
              }}
              to={`/person/${props.item.RecipientPersonID}`}
            >
              {props.item.RecipientPersonName}
            </Link>
            :
            <ul>
              {props.item.issues?.check_prerequisiteconflict_conflicts.map((x, i) => (
                <li>
                  <Link
                    target="_blank"
                    style={{
                      color: props.overRide.SectionPrerequisiteCheck ? "green" : "red",
                      fontWeight: 900
                    }}
                    to={`/offering/${x.OfferingID}`}
                  >
                    {x.OfferingCode}
                  </Link>
                </li>
              ))}
            </ul>
          </span>
          <Button
            type="link"
            style={{ cursor: "pointer", color: props.overRide.SectionPrerequisiteCheck ? "red" : "green" }}
            onClick={() => {
              props.setOverRide({
                ...props.overRide,
                SectionPrerequisiteCheck: !props.overRide.SectionPrerequisiteCheck
              })
            }}
          >
            Click here to {props.overRide.SectionPrerequisiteCheck ? "Unwave it" : "Wave it"}
          </Button>
        </li>
      )}
    </>
  )
}
