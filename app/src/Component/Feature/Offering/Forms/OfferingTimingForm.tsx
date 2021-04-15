import React, { useState } from "react"
import { Col, Divider, Row } from "antd"
import { FormInstance } from "antd/lib/form"
import { IOfferingFieldNames } from "~/Component/Feature/Offering/Interfaces"
import { getActiveTerms } from "~/ApiServices/Service/RefLookupService"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import { FormDateTimePicker } from "~/Component/Common/Form/FormDateTimePicker"
import DefineDurationTime from "~/Component/Feature/Offering/DefineDurationTime"
import { OFFERING_TRMINATION_TIME } from "~/utils/Constants"
import "~/Sass/utils.scss"

interface IOfferingTimingFormProps {
  formInstance: FormInstance
  fieldNames: IOfferingFieldNames
  initialValue: { [key: string]: any }
}

export default function OfferingTimingForm(props: IOfferingTimingFormProps) {
  const chooseStartDate = props.formInstance.getFieldValue("ChooseStartDate")
  const chooseEndDate = props.formInstance.getFieldValue("ChooseEndDate")

  const [showCreationTime, setShowCreationTime] = useState<boolean>(chooseStartDate != null ? chooseStartDate : false)
  const [showCreationTimeByTerm, setShowCreationTimeByTerm] = useState<boolean>(
    chooseStartDate != null ? !chooseStartDate : false
  )
  const [showTerminationTime, setShowTerminationTime] = useState<boolean>(
    chooseEndDate != null && chooseEndDate === OFFERING_TRMINATION_TIME.DATE
  )
  const [showTerminationTimeByTerm, setShowTerminationTimeByTerm] = useState<boolean>(
    chooseEndDate != null && chooseEndDate === OFFERING_TRMINATION_TIME.TERM
  )
  const [showTerminationTimeByDuration, setShowTerminationTimeByDuration] = useState<boolean>(
    chooseEndDate != null && chooseEndDate === OFFERING_TRMINATION_TIME.DURATION
  )

  const onSelectStartDate = (value: any) => {
    if (value) {
      setShowCreationTime(true)
      setShowCreationTimeByTerm(false)
    } else {
      setShowCreationTime(false)
      setShowCreationTimeByTerm(true)
    }
  }

  const onSelectEndDate = (value: any) => {
    if (value === OFFERING_TRMINATION_TIME.DATE) {
      setShowTerminationTime(true)
      setShowTerminationTimeByTerm(false)
      setShowTerminationTimeByDuration(false)
    } else if (value === OFFERING_TRMINATION_TIME.TERM) {
      setShowTerminationTime(false)
      setShowTerminationTimeByTerm(true)
      setShowTerminationTimeByDuration(false)
    } else {
      setShowTerminationTime(false)
      setShowTerminationTimeByTerm(false)
      setShowTerminationTimeByDuration(true)
    }
  }

  return (
    <>
      <Divider orientation="left">Timings</Divider>
      <Row>
        <Col xs={24} sm={24} md={12}>
          <FormDropDown
            labelColSpan={8}
            wrapperColSpan={14}
            label={"Choose Start Date"}
            fieldName="ChooseStartDate"
            formInstance={props.formInstance}
            onChangeCallback={(e) => onSelectStartDate(e)}
            options={[
              { label: "Define creation time", value: true },
              { label: "Determined by term", value: false }
            ]}
          />
        </Col>
        <Col xs={24} sm={24} md={12}>
          {showCreationTime && (
            <FormDateTimePicker
              labelColSpan={8}
              wrapperColSpan={14}
              label={"Creation Date"}
              ariaLabel={"Pick Creation Date"}
              formInstance={props.formInstance}
              defaultValue={props.initialValue.CreationDate}
              fieldName={props.fieldNames.CreationDate}
            />
          )}
          {showCreationTimeByTerm && (
            <FormDropDown
              labelColSpan={8}
              wrapperColSpan={14}
              label={"Choose a term"}
              formInstance={props.formInstance}
              fieldName={props.fieldNames.StartTermID}
              refLookupService={getActiveTerms}
              displayKey="Name"
              valueKey="TermID"
            />
          )}
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={24} md={12}>
          <FormDropDown
            labelColSpan={8}
            wrapperColSpan={14}
            label={"Choose End Date"}
            fieldName="ChooseEndDate"
            formInstance={props.formInstance}
            onChangeCallback={(e) => onSelectEndDate(e)}
            options={[
              { label: "Define termination time", value: OFFERING_TRMINATION_TIME.DATE },
              { label: "Determined by duration", value: OFFERING_TRMINATION_TIME.DURATION },
              { label: "Determined by term", value: OFFERING_TRMINATION_TIME.TERM }
            ]}
          />
        </Col>
        <Col xs={24} sm={24} md={12}>
          {showTerminationTime && (
            <FormDateTimePicker
              labelColSpan={8}
              wrapperColSpan={14}
              label={"Termination Date"}
              ariaLabel={"Pick Termination Date"}
              formInstance={props.formInstance}
              defaultValue={props.initialValue.TerminationDate}
              fieldName={props.fieldNames.TerminationDate}
            />
          )}
          {showTerminationTimeByTerm && (
            <FormDropDown
              labelColSpan={8}
              wrapperColSpan={14}
              label={"Choose a term"}
              formInstance={props.formInstance}
              fieldName={props.fieldNames.EndTermID}
              refLookupService={getActiveTerms}
              displayKey="Name"
              valueKey="TermID"
            />
          )}
          {showTerminationTimeByDuration && <DefineDurationTime {...props} disableDuration={false} />}
        </Col>
      </Row>
    </>
  )
}
