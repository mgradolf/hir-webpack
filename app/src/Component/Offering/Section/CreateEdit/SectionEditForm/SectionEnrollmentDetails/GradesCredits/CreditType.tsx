import { Form, Select } from "antd"
import { FormInstance } from "antd/lib/form"
import React, { useEffect, useState } from "react"
import { getCreditType } from "~/ApiServices/Service/RefLookupService"
import { ISectionEnrollmentDetails } from "~/Component/Offering/Section/CreateEdit/SectionEditForm/SectionEnrollmentDetails"

interface ICreditType {
  fieldNames: ISectionEnrollmentDetails
  formInstance: FormInstance
}
const layout = { labelCol: { span: 6, offset: 3 }, wrapperCol: { span: 6, offset: 3 } }
export default function CreditType(props: ICreditType) {
  const [allCreditTypes, setAllCreditTypes] = useState<Array<any>>([])
  useEffect(() => {
    getCreditType().then((x) => {
      if (x.success) setAllCreditTypes(x.data)
    })
  }, [])
  return (
    <Form.Item name={props.fieldNames.CreditTypeID} label="Credit Type" {...layout}>
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
