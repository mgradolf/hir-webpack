import { Form, Select } from "antd"
import { FormInstance } from "antd/lib/form"
import React, { useEffect, useState } from "react"
import { getGradeScaleType } from "~/ApiServices/Service/RefLookupService"
import { ISectionEnrollmentDetails } from "~/Component/Section/CreateEdit/SectionEditForm/SectionEnrollmentDetails"

interface IGradeScale {
  fieldNames: ISectionEnrollmentDetails
  formInstance: FormInstance
  labelCol: any
  wrapperCol: any
}
export default function GradeScale(props: IGradeScale) {
  const [allGradeScaleTypes, setAllGradeScaleTypes] = useState<Array<any>>([])
  useEffect(() => {
    getGradeScaleType().then((x) => {
      if (x.success) setAllGradeScaleTypes(x.data)
    })
  }, [])
  return (
    <Form.Item
      name={props.fieldNames.GradeScaleTypeID}
      label="Grade Scale"
      labelCol={props.labelCol}
      wrapperCol={props.wrapperCol}
    >
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
