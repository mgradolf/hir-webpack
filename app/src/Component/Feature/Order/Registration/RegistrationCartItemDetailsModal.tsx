import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button, Card, Form, Row } from "antd"
import { getCreditType, getGradeScaleType } from "~/ApiServices/Service/RefLookupService"
import { FormDatePicker } from "~/Component/Common/Form/FormDatePicker"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import { FormInputNumber } from "~/Component/Common/Form/FormInputNumber"
import { FormMultipleRadio } from "~/Component/Common/Form/FormMultipleRadio"
import Modal from "~/Component/Common/Modal/index2"
import { IItemRequest, IOverride, IRegistrationRequest } from "~/Component/Feature/Order/Model/Interface/IModel"
import { WarningOutlined } from "@ant-design/icons"
import { eventBus } from "~/utils/EventBus"
import { UPDATE_CART } from "~/Pages/Manage/Financials/CreateOrderPage"
import { CartModelFunctionality } from "~/Component/Feature/Order/Model/CartModelFunctionality"
import RegistrationIssues from "~/Component/Feature/Order/Registration/RegistrationIssues"
import { OptionalItemList } from "~/Component/Feature/Order/Registration/OptionalItemList"

export const RegistrationCartItemDetailsModal = (props: {
  itemList: IItemRequest[]
  item: IRegistrationRequest
  cartModelFunctionality: CartModelFunctionality
}) => {
  const [showModal, setShowModal] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [formInstance] = Form.useForm()
  const [issueSolved, setIssueSolved] = useState(true)
  const [overRide, setOverRide] = useState<IOverride>(props.item.OverrideData)

  useEffect(() => {
    setIssueSolved(
      !!props.item.issues &&
        props.item.issues?.RegistrationCheck_passed &&
        props.item.issues?.DuplicateRequestCheck_passed &&
        props.item.issues?.SectionValidityCheck_passed &&
        (props.item.issues?.RegistrationQuestionCheck_passed || props.item.OverrideData.AnswerQuestion) &&
        (props.item.issues?.ScheduleConflict_passed || props.item.OverrideData.ScheduleConflictCheck) &&
        (props.item.issues?.StudentOnHoldCheck_passed ||
          (props.item.OverrideData.StudentOnHoldCheck && props.item.OverrideData.StudentOnHoldCheckWithMessage)) &&
        (props.item.issues?.PrerequisiteCheck_passed || props.item.OverrideData.SectionPrerequisiteCheck)
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
          setTimeout(() => {
            console.log(props)
          }, 5 * 1000)
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
                <Link to={`/section/${props.item.SectionID}`}>{props.item.ItemName}</Link>
              </>
            }
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
                  setIssueSolved(
                    !!props.item.issues &&
                      props.item.issues?.RegistrationCheck_passed &&
                      props.item.issues?.DuplicateRequestCheck_passed &&
                      props.item.issues?.SectionValidityCheck_passed &&
                      (props.item.issues?.RegistrationQuestionCheck_passed || overRide.AnswerQuestion) &&
                      (props.item.issues?.ScheduleConflict_passed || overRide.ScheduleConflictCheck) &&
                      (props.item.issues?.StudentOnHoldCheck_passed ||
                        (overRide.StudentOnHoldCheck && overRide.StudentOnHoldCheckWithMessage)) &&
                      (props.item.issues?.PrerequisiteCheck_passed || overRide.SectionPrerequisiteCheck)
                  )
                  setShowModal(false)
                }}
              >
                Apply
              </Button>
            ]}
          >
            <div
              style={{
                maxHeight: "70vh",
                overflowY: "scroll"
              }}
            >
              <Form form={formInstance} initialValues={props.item}>
                <FormDropDown
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

                {showMore && (
                  <>
                    <FormDropDown
                      label={"Grade Scale"}
                      ariaLabel={"Grade Scale Select"}
                      formInstance={formInstance}
                      fieldName="GradeScaleTypeID"
                      refLookupService={getGradeScaleType}
                      displayKey="Name"
                      valueKey="ID"
                    />
                    <FormDropDown
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
                  </>
                )}
                <Row justify="end">
                  <Button size="large" onClick={() => setShowMore(!showMore)}>
                    {showMore ? "Show Less Options" : "Show More Options"}
                  </Button>
                </Row>
              </Form>
              <OptionalItemList {...props} />
            </div>
          </Card>
        </Modal>
      )}
    </>
  )
}
