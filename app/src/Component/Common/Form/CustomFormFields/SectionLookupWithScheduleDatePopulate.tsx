import moment from "moment"
import React, { useState } from "react"
import { Col, Row } from "antd"
import { IGeneratedField } from "~/Component/Common/Form/common"
import { DATE_FORMAT } from "~/utils/Constants"
import { FormDatePickers } from "~/Component/Common/Form/FormDatePickers"
import { SectionLookup } from "~/Component/Common/Form/FormLookupFields/SectionLookup"

export function SectionLookupWithScheduleDatePopulate(props: IGeneratedField) {
  const [defaultStartDate, setdefaultStartDate] = useState("")
  const [defaultEndDate, setDefaultEndDate] = useState("")

  return (
    <Row>
      <Col span={24}>
        <SectionLookup
          {...props}
          onSelectedItems={([section]) => {
            console.log("moment start date ", section, section.StartDate, moment(section.StartDate).format(DATE_FORMAT))
            console.log("moment end date ", section.EndDate, moment(section.EndDate).format(DATE_FORMAT))
            setdefaultStartDate(moment(section.StartDate).format(DATE_FORMAT))
            setDefaultEndDate(moment(section.EndDate).format(DATE_FORMAT))
          }}
        />
      </Col>
      <Col span={24}>
        <FormDatePickers
          formInstance={props.formInstance}
          rules={[{ required: true, message: "Schedule Date is Required" }]}
          label="Schedule Date"
          fieldName="DateRangeStart"
          fieldName2="DateRangeEnd"
          defaultValue={defaultStartDate}
          defaultValue2={defaultEndDate}
        />
      </Col>
    </Row>
  )
}
