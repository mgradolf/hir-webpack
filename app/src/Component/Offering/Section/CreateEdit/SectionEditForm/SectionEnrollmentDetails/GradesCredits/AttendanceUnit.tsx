import { Form, Select } from "antd"
import { FormInstance } from "antd/lib/form"
import React, { useEffect, useState } from "react"
import { getAttendanceUnit } from "~/ApiServices/Service/RefLookupService"
import { ISectionEnrollmentDetails } from "~/Component/Offering/Section/CreateEdit/SectionEditForm/SectionEnrollmentDetails"

interface IAttendanceUnit {
  fieldNames: ISectionEnrollmentDetails
  formInstance: FormInstance
}
const layout = { labelCol: { span: 12, offset: 1 }, wrapperCol: { span: 6, offset: 1 } }
export default function AttendanceUnit(props: IAttendanceUnit) {
  const [allAttendances, setAllAttendances] = useState<Array<any>>([])
  useEffect(() => {
    getAttendanceUnit().then((x) => {
      if (x.success) setAllAttendances(x.data)
    })
  }, [])
  return (
    <Form.Item name={props.fieldNames.AttendanceUnitID} label="Attendance Unit" {...layout}>
      <Select>
        {allAttendances.map((x) => (
          <Select.Option key={x.ID + x.Name} value={x.ID}>
            {x.Name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  )
}
