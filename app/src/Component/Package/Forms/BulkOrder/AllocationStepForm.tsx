import React from "react"
import { Divider, Row, Col } from "antd"
import { FormInstance } from "antd/lib/form"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { SectionLookup } from "~/Component/Common/Form/FormLookupFields/SectionLookup"
import { getSectionStatistics } from "~/ApiServices/Service/SectionService"
import "~/Sass/utils.scss"

interface IAllocationStepFormProps {
  formInstance: FormInstance
  initialValue: { [key: string]: any }
}

const layout = {
  labelColSpan: 8,
  wrapperColSpan: 14
}

export default function AllocationStepForm(props: IAllocationStepFormProps) {
  const SectionID = props.formInstance.getFieldValue("SectionID")
  const onSelectSection = (items: any) => {
    getSectionStatistics({ SectionID: items[0].SectionID }).then((x: any) => {
      if (x.success) {
        props.formInstance.setFieldsValue({
          CurrentAllocation: x.data.TotalSeats,
          AvailableSeat: x.data.TotalAvailableSeats
        })
      }
    })
    props.formInstance.setFieldsValue({ SectionNumber: items[0].SectionNumber })
    props.formInstance.setFieldsValue({ MaxAllowed: items[0].MaxEnrollment })
  }

  return (
    <>
      <Row>
        <Col xs={24} sm={24} md={12}>
          <SectionLookup
            rules={[{ required: true, message: "Please select section!" }]}
            formInstance={props.formInstance}
            fieldName="SectionID"
            label={"Section"}
            defaultValue={SectionID ? SectionID : undefined}
            onSelectedItems={onSelectSection}
          />
        </Col>

        <Divider orientation="left">Seat Allocation</Divider>
        <Col xs={24} sm={24} md={12}>
          <FormInput
            disabled
            {...layout}
            formInstance={props.formInstance}
            label={"Max Allowed"}
            ariaLabel={"Max Allowed"}
            fieldName="MaxAllowed"
          />
          <FormInput
            {...layout}
            formInstance={props.formInstance}
            label={"Requested Seat"}
            ariaLabel={"Requested Seat"}
            fieldName={"NumberOfSeats"}
          />
          <FormInput
            {...layout}
            formInstance={props.formInstance}
            label={"Invitation Code"}
            ariaLabel={"Invitation Code"}
            fieldName={"InvitationCode"}
          />
        </Col>
        <Col xs={24} sm={24} md={12}>
          <FormInput
            {...layout}
            disabled
            formInstance={props.formInstance}
            label={"Current Allocation"}
            ariaLabel={"Current Allocation"}
            fieldName="CurrentAllocation"
          />
          <FormInput
            {...layout}
            disabled
            formInstance={props.formInstance}
            label={"Available Seat"}
            ariaLabel={"Available Seat"}
            fieldName="AvailableSeat"
          />
        </Col>
      </Row>
    </>
  )
}
