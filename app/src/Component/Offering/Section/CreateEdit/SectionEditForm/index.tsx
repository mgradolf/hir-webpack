import React, { useEffect, useState } from "react"
import { Button, Card, Collapse, Form } from "antd"
import SectionDetails from "~/Component/Offering/Section/CreateEdit/SectionEditForm/SectionDetails"
import SectionTimingOtherDetails from "~/Component/Offering/Section/CreateEdit/SectionEditForm/SectionTimingOtherDetails"
import SectionEnrollmentDetails from "~/Component/Offering/Section/CreateEdit/SectionEditForm/SectionEnrollmentDetails"
import SectionRefundEnquiryDetails from "~/Component/Offering/Section/CreateEdit/SectionEditForm/SectionRefundEnquiryDetails"
import { updateSection } from "~/ApiServices/Service/SectionService"

interface ISectionEditProps {
  Section: { [key: string]: string }
  handleCancel: () => void
  handleSubmit: (param: { [key: string]: any }) => void
  setApiCallInProgress: (flag: boolean) => void
}

export default function SectionEditForm(props: ISectionEditProps) {
  const actions = []
  const [formInstance] = Form.useForm()
  const [saveButtonLoading, setButtonLoading] = useState(false)
  const [buttonText, setButtonText] = useState("Save")

  useEffect(() => {
    Object.keys(props.Section).forEach((key) => {
      formInstance.setFieldsValue({ [key]: props.Section[key] })
    })
  }, [formInstance, props.Section])

  actions.push(<Button onClick={props.handleCancel}>Cancel</Button>)
  actions.push(
    <Button
      loading={saveButtonLoading}
      onClick={() => {
        props.setApiCallInProgress(true)
        setButtonLoading(true)
        setButtonText("Saving ...")
        console.log(formInstance.getFieldsValue())
        updateSection(formInstance.getFieldsValue()).then((response) => {
          if (response.success) {
            props.setApiCallInProgress(false)
            setButtonLoading(false)
            setButtonText("Save")
          }
        })
      }}
    >
      {buttonText}
    </Button>
  )
  return (
    <Card actions={actions} title={`Edit Section : ${props.Section.SectionNumber}`}>
      <Form
        form={formInstance}
        style={{
          background: "white",
          padding: "10px",
          height: "65vh",
          overflowY: "scroll",
          paddingBottom: "150px"
        }}
      >
        <Collapse defaultActiveKey={["0"]} accordion>
          <Collapse.Panel header="Section Details" key="0">
            <SectionDetails {...{ ...props, formInstance }} />
          </Collapse.Panel>
          <Collapse.Panel header="Section Details" key="1">
            <SectionTimingOtherDetails {...{ ...props, formInstance }} />
          </Collapse.Panel>
          <Collapse.Panel header="Section Enrollment Details" key="2">
            <SectionEnrollmentDetails {...{ ...props, formInstance }} />
          </Collapse.Panel>
          <Collapse.Panel header="Section Refund And Enquiry Users" key="3">
            <SectionRefundEnquiryDetails {...{ ...props, formInstance }} />
          </Collapse.Panel>
        </Collapse>
      </Form>
    </Card>
  )
}
