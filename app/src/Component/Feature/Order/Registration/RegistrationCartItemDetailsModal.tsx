import { Button, Card, Checkbox, Col, Form, Row } from "antd"
import React, { useEffect, useState } from "react"
import { getCreditType, getGradeScaleType } from "~/ApiServices/Service/RefLookupService"
import { FormDatePicker } from "~/Component/Common/Form/FormDatePicker"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import { FormInputNumber } from "~/Component/Common/Form/FormInputNumber"
import { FormMultipleRadio } from "~/Component/Common/Form/FormMultipleRadio"
import Modal from "~/Component/Common/Modal/index2"
import { IItemRequest, IRegistrationRequest } from "~/Component/Feature/Order/Model/Interface/IModel"
import { WarningOutlined } from "@ant-design/icons"
import { PersonLookup } from "~/Component/Common/Form/FormLookupFields/PersonLookup"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { CheckScheduleconflictConflictsModal } from "~/Component/Feature/Order/Registration/CheckScheduleconflictConflictsModal"
import { CheckPrerequisiteConflictsModal } from "~/Component/Feature/Order/Registration/CheckPrerequisiteConflictsModal"
import { eventBus } from "~/utils/EventBus"
import { UPDATE_CART } from "~/Pages/Manage/Financials/CreateOrderPage"
import { CartModelFunctionality } from "~/Component/Feature/Order/Model/CartModelFunctionality"
import RegistrationIssues from "./RegistrationIssues"
import { Link } from "react-router-dom"

export const RegistrationCartItemDetailsModal = (props: {
  itemList: IItemRequest[]
  item: IRegistrationRequest
  cartModelFunctionality: CartModelFunctionality
}) => {
  const [showModal, setShowModal] = useState(false)
  const [formInstance] = Form.useForm()
  const [issueExist, setIssueExist] = useState(false)
  const [overRide, setOverRide] = useState(props.item.OverrideData)

  useEffect(() => {
    setIssueExist(
      !!props.item.issues &&
        (!props.item.issues?.RegistrationCheck_passed ||
          !props.item.issues?.DuplicateRequestCheck_passed ||
          (!props.item.issues?.RegistrationQuestionCheck_passed && !props.item.OverrideData.AnswerQuestion) ||
          (!props.item.issues?.ScheduleConflict_passed && !props.item.OverrideData.ScheduleConflictCheck) ||
          (!props.item.issues?.StudentOnHoldCheck_passed &&
            !props.item.OverrideData.StudentOnHoldCheck &&
            !props.item.OverrideData.StudentOnHoldCheckWithMessage) ||
          (!props.item.issues?.PrerequisiteCheck_passed && !props.item.OverrideData.SectionPrerequisiteCheck) ||
          !props.item.issues?.SectionValidityCheck_passed)
    )
  }, [props.item.issues])

  return (
    <>
      <Button
        disabled={props.item.varificationInProgress}
        loading={props.item.varificationInProgress}
        type="link"
        onClick={() => setShowModal(true)}
      >
        {!props.item.varificationInProgress && issueExist && (
          <WarningOutlined style={{ color: "#f11e1e", fontSize: "16px" }} />
        )}
        {props.item.ItemName}
      </Button>
      {showModal && (
        <Modal width="1000px">
          <Card
            actions={[
              <Button type="ghost" onClick={() => setShowModal(false)}>
                Cancel
              </Button>,
              <Button
                type="primary"
                onClick={() => {
                  const valueToBeUpdated: IRegistrationRequest = {
                    ...props.item,
                    ...formInstance.getFieldsValue(),
                    OverrideData: overRide
                  }
                  const __itemList = props.itemList.map((x) => {
                    if (x.RequestID === valueToBeUpdated.RequestID) x = valueToBeUpdated
                    return x
                  })
                  eventBus.publish(UPDATE_CART, __itemList)
                  setShowModal(false)
                }}
              >
                Apply
              </Button>
            ]}
          >
            <div
              style={{
                maxHeight: "80vh",
                overflowY: "scroll"
              }}
            >
              <Card
                title={
                  <>
                    Register{" "}
                    <Link to={`/person/${props.item.RecipientPersonID}`}>{props.item.RecipientPersonName}</Link> in{" "}
                    <Link to={`/section/${props.item.SectionID}`}>{props.item.ItemName}</Link>
                  </>
                }
              >
                <Form form={formInstance} initialValues={props.item}>
                  {/* <PersonLookup formInstance={formInstance} label="Student" fieldName="RecipientPersonID" disabled />
                  <FormInput formInstance={formInstance} label="Section Number" fieldName="ItemName" disabled /> */}
                  <FormDropDown
                    labelColSpan={8}
                    wrapperColSpan={14}
                    label={"Seat Group"}
                    ariaLabel={"Seat Group"}
                    formInstance={formInstance}
                    fieldName="SeatGroupID"
                    options={props.item.SeatGroups.map((x) => {
                      return { label: x.SeatGroupName, value: x.SeatGroupID }
                    })}
                    onChangeCallback={(SeatGroupID) => {
                      if (SeatGroupID) {
                        props.cartModelFunctionality.addRegistrationRequest(props.item.SeatGroups, SeatGroupID)
                        props.cartModelFunctionality.removeRegistrationRequest(props.item.RequestID)
                      }
                    }}
                  />
                  <FormDatePicker
                    label={"Effective Date"}
                    formInstance={formInstance}
                    aria-label="Effective Date"
                    placeholder="YYYY/MM/DD"
                    fieldName="StatusDate"
                  />
                  <RegistrationIssues {...props} overRide={overRide} setOverRide={setOverRide} />
                  <FormDropDown
                    labelColSpan={8}
                    wrapperColSpan={14}
                    label={"Grade Scale"}
                    ariaLabel={"Grade Scale Select"}
                    formInstance={formInstance}
                    fieldName="GradeScaleTypeID"
                    refLookupService={getGradeScaleType}
                    displayKey="Name"
                    valueKey="ID"
                  />
                  <FormDropDown
                    labelColSpan={8}
                    wrapperColSpan={14}
                    label={"Transcript Type"}
                    ariaLabel={"Transcript Type "}
                    formInstance={formInstance}
                    fieldName="TranscriptCreditTypeID"
                    refLookupService={getCreditType}
                    displayKey="Name"
                    valueKey="ID"
                  />
                  <FormDatePicker
                    label={"Creation Time"}
                    formInstance={formInstance}
                    aria-label="Creation Time"
                    placeholder="YYYY/MM/DD"
                    fieldName="CreationTime"
                  />
                  <FormDatePicker
                    label={"Termination Time"}
                    formInstance={formInstance}
                    aria-label="Termination Time"
                    placeholder="YYYY/MM/DD"
                    fieldName="TerminationTime"
                  />
                  <FormMultipleRadio
                    label="Repeat/Retake"
                    formInstance={formInstance}
                    fieldName="IsRepeat"
                    options={[
                      { label: "Yes", value: true },
                      { label: "No", value: false }
                    ]}
                  />
                  <FormMultipleRadio
                    label="Complete Status on Termination"
                    formInstance={formInstance}
                    fieldName="CompleteOnTermination"
                    options={[
                      { label: "Yes", value: true },
                      { label: "No", value: false }
                    ]}
                  />
                  <FormInputNumber
                    label="Expected Attendance"
                    formInstance={formInstance}
                    fieldName="AttendanceExpected"
                  />
                </Form>
              </Card>
            </div>
          </Card>
        </Modal>
      )}
    </>
  )
}
