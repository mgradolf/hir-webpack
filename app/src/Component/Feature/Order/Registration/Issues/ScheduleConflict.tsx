import { Button } from "antd"
import React from "react"
import { Link } from "react-router-dom"
import { IOverride, IRegistrationRequest } from "~/Component/Feature/Order/Model/Interface/IModel"

export const ScheduleConflict = (props: {
  item: IRegistrationRequest
  overRide: IOverride
  setOverRide: (overRide: IOverride) => void
}) => {
  return (
    <li style={{ marginBottom: "15px" }}>
      {!props.item.issues?.ScheduleConflict_passed && (
        <>
          <span
            style={{
              color: props.overRide.ScheduleConflictCheck ? "green" : "red",
              textDecorationLine: props.overRide.ScheduleConflictCheck ? "line-through" : "none"
            }}
          >
            <Link
              target="_blank"
              style={{
                color: props.overRide.ScheduleConflictCheck ? "green" : "red",
                fontWeight: 900
              }}
              to={`/section/${props.item.SectionID}`}
            >
              {props.item.ItemName}
            </Link>{" "}
            has Schedule Conflict with the Following Sections:{" "}
            <ul>
              {props.item.issues &&
                props.item.issues.check_scheduleconflict_conflicts &&
                [
                  ...props.item.issues.check_scheduleconflict_conflicts,
                  { SectionNumber: "SMT1" },
                  { SectionNumber: "SMT1" },
                  { SectionNumber: "SMT1" },
                  { SectionNumber: "SMT1" },
                  { SectionNumber: "SMT1" },
                  { SectionNumber: "SMT1" }
                ].map((x, i) => {
                  return (
                    <li
                      key={i}
                      style={{
                        color: props.overRide.ScheduleConflictCheck ? "green" : "red",
                        fontWeight: 900
                      }}
                    >
                      {x.SectionNumber}
                    </li>
                  )
                })}
            </ul>
          </span>
          <Button
            type="link"
            style={{ cursor: "pointer", color: props.overRide.ScheduleConflictCheck ? "red" : "green" }}
            onClick={() => {
              props.setOverRide({ ...props.overRide, ScheduleConflictCheck: !props.overRide.ScheduleConflictCheck })
            }}
          >
            Click here to {props.overRide.ScheduleConflictCheck ? "Unwave it" : "Wave it"}
          </Button>
        </>
      )}
    </li>
  )
}
