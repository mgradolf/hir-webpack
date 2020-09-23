import { Form, Select } from "antd"
import { FormInstance } from "antd/lib/form"
import React, { useEffect, useState } from "react"
import { getGradeScaleType } from "~/ApiServices/Service/RefLookupService"
import { ISectionEnrollmentDetails } from "~/Component/Offering/Section/CreateEdit/SectionEditForm/SectionEnrollmentDetails"

interface IGradeScale {
  fieldNames: ISectionEnrollmentDetails
  formInstance: FormInstance
}
const layout = { labelCol: { span: 6, offset: 3 }, wrapperCol: { span: 12, offset: 3 } }
export default function GradeScale(props: IGradeScale) {
  const [allGradeScaleTypes, setAllGradeScaleTypes] = useState<Array<any>>([])
  useEffect(() => {
    getGradeScaleType().then((x) => {
      if (x.success) setAllGradeScaleTypes(x.data)
    })
  }, [])
  return (
    <Form.Item name={props.fieldNames.GradeScaleTypeID} label="Grade Scale" {...layout}>
      <Select>
        {allGradeScaleTypes.map((x) => (
          <Select.Option key={x.ID + x.Name} value={x.ID}>
            {x.Name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  )
}
