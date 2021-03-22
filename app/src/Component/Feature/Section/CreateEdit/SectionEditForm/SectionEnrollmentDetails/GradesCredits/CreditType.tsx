import { Form, Select } from "antd"
import { FormInstance } from "antd/lib/form"
import React, { useEffect, useState } from "react"
import { getCreditType } from "~/ApiServices/Service/RefLookupService"
import { ISectionEnrollmentDetails } from "~/Component/Section/CreateEdit/SectionEditForm/SectionEnrollmentDetails"

interface ICreditType {
  fieldNames: ISectionEnrollmentDetails
  formInstance: FormInstance
  labelCol: any
  wrapperCol: any
}

export default function CreditType(props: ICreditType) {
  const [allCreditTypes, setAllCreditTypes] = useState<Array<any>>([])
  useEffect(() => {
    getCreditType().then((x) => {
      if (x.success) setAllCreditTypes(x.data)
    })
  }, [])
  return (
    <Form.Item
      name={props.fieldNames.CreditTypeID}
      label="Credit Type"
      labelCol={props.labelCol}
      wrapperCol={props.wrapperCol}
    >
      <Select>
        {allCreditTypes.map((x) => (
          <Select.Option key={x.ID + x.Name} value={x.ID}>
            {x.Name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  )
}
