import { Button, Card, Checkbox, Col, Row, Switch } from "antd"
import React from "react"
import { Link } from "react-router-dom"
import { CartModelFunctionality } from "../Model/CartModelFunctionality"
import { IItemRequest, IOverride, IRegistrationRequest } from "../Model/Interface/IModel"
import { CheckPrerequisiteConflictsModal } from "./CheckPrerequisiteConflictsModal"
import { CheckScheduleconflictConflictsModal } from "./CheckScheduleconflictConflictsModal"

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
        <Card title="Registration Verification">
          {!props.item.issues?.ScheduleConflict_passed && (
            <Row justify="space-between">
              <Col span={20}>
                <Link to={`/section/${props.item.SectionID}`}>{props.item.ItemName}</Link> has Schedule Conflict with
                the Following Sections:{" "}
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
                    if (i === 0) return <>{x.SectionNumber}</>
                    else if (
                      props.item.issues &&
                      props.item.issues.check_scheduleconflict_conflicts.length > 1 &&
                      props.item.issues.check_scheduleconflict_conflicts.length - 1 === i
                    ) {
                      return <>and {x.SectionNumber}</>
                    } else return <>, {x.SectionNumber}</>
                  })}
              </Col>

              <Col span={4}>
                <Switch
                  checkedChildren="UnWave"
                  unCheckedChildren="Wave"
                  defaultChecked={props.item.OverrideData.ScheduleConflictCheck}
                  onChange={(checked: boolean) => {
                    props.setOverRide({ ...props.overRide, ScheduleConflictCheck: checked })
                  }}
                />
              </Col>
            </Row>
            // <Row>
            //   <Col span={12}>Test Schedule Conflict</Col>
            //   <Col span={4}>
            //     Wave
            //     <Checkbox
            //       defaultChecked={props.item.OverrideData.ScheduleConflictCheck}
            //       onChange={(e) => {
            //         props.setOverRide({ ...props.overRide, ScheduleConflictCheck: e.target.checked })
            //       }}
            //     />
            //   </Col>
            //   <Col span={4}>
            //     <CheckScheduleconflictConflictsModal items={props.item} />
            //   </Col>
            // </Row>
          )}
          {!props.item.issues?.PrerequisiteCheck_passed && (
            <Row>
              <Col span={12}>Test Pre Requisites</Col>
              <Col span={4}>
                Wave{" "}
                <Checkbox
                  defaultChecked={props.item.OverrideData.SectionPrerequisiteCheck}
                  onChange={(e) => {
                    console.log(e.target.checked)
                    props.setOverRide({ ...props.overRide, SectionPrerequisiteCheck: e.target.checked })
                  }}
                />
              </Col>
              <Col span={4}>
                <CheckPrerequisiteConflictsModal offerings={props.item.issues?.check_prerequisiteconflict_conflicts} />
              </Col>
            </Row>
          )}

          {!props.item.issues?.RegistrationQuestionCheck_passed && (
            <Row>
              <Col span={12}>Registration Questions</Col>
              <Col span={4}>
                Wave{" "}
                <Checkbox
                  defaultChecked={props.item.OverrideData.AnswerQuestion}
                  onChange={(e) => {
                    props.setOverRide({ ...props.overRide, AnswerQuestion: e.target.checked })
                  }}
                />
              </Col>
              <Col span={4}>
                <Button>Answer</Button>
              </Col>
            </Row>
          )}

          {!props.item.issues?.StudentOnHoldCheck_passed && (
            <Row>
              <Col span={12}>Test Student on Hold</Col>
              <Col span={4}>
                Wave{" "}
                <Checkbox
                  defaultChecked={props.item.OverrideData.StudentOnHoldCheck}
                  onChange={(e) => {
                    props.setOverRide({
                      ...props.overRide,
                      StudentOnHoldCheckWithMessage: e.target.checked,
                      StudentOnHoldCheck: e.target.checked
                    })
                  }}
                />
              </Col>
              {/* <Col span={4}>
                        <Button onClick={() => {}}>Details</Button>
                      </Col> */}
            </Row>
          )}
          {!props.item.issues?.RegistrationCheck_passed && (
            <Row>
              <Col span={12}>Test If already Registered</Col>
            </Row>
          )}
          {!props.item.issues?.SectionValidityCheck_passed && (
            <Row>
              <Col span={12}>Test If Section open for Registration</Col>
            </Row>
          )}
          {!props.item.issues?.DuplicateRequestCheck_passed && (
            <Row>
              <Col span={12}>Test Duplicate Request</Col>
            </Row>
          )}
        </Card>
      )}
    </>
  )
}
