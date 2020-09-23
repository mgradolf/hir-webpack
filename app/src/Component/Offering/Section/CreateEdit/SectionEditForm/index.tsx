import React from "react"
import { Button, Tabs } from "antd"
import SectionDetails from "~/Component/Offering/Section/CreateEdit/SectionEditForm/SectionDetails"
import SectionEnrollmentDetails from "~/Component/Offering/Section/CreateEdit/SectionEditForm/SectionEnrollmentDetails"
import SectionRefundEnquiryDetails from "~/Component/Offering/Section/CreateEdit/SectionEditForm/SectionRefundEnquiryDetails"

interface ISectionEditProps {
  Section: { [key: string]: string }
  handleCancel: () => void
  handleSubmit: (param: { [key: string]: any }) => void
  setApiCallInProgress: (flag: boolean) => void
}

export default function SectionEditForm(props: ISectionEditProps) {
  const actions = []
  actions.push(<Button onClick={props.handleCancel}>Cancel</Button>)
  actions.push(<Button onClick={props.handleSubmit}>Save</Button>)
  return (
    <div style={{ background: "white", padding: "10px", margin: "10px" }}>
      <Tabs type="card">
        <Tabs.TabPane tab="Section Details" key="1">
          <SectionDetails {...props} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Section Enrollment Details" key="2">
          <SectionEnrollmentDetails {...props} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Section Details" key="3">
          <SectionRefundEnquiryDetails {...props} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}
