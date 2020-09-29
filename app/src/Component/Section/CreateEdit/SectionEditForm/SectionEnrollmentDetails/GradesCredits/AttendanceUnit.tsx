import { Form, Select } from "antd"
import { FormInstance } from "antd/lib/form"
import React, { useEffect, useState } from "react"
import { getAttendanceUnit } from "~/ApiServices/Service/RefLookupService"
import { ISectionEnrollmentDetails } from "~/Component/Section/CreateEdit/SectionEditForm/SectionEnrollmentDetails"

interface IAttendanceUnit {
  fieldNames: ISectionEnrollmentDetails
  formInstance: FormInstance
  labelCol: any
  wrapperCol: any
}

export default function AttendanceUnit(props: IAttendanceUnit) {
  const [allAttendances, setAllAttendances] = useState<Array<any>>([])
  useEffect(() => {
    getAttendanceUnit().then((x) => {
      if (x.success) setAllAttendances(x.data)
    })
  }, [])
  return (
    <Form.Item
      name={props.fieldNames.AttendanceUnitID}
      label="Attendance Unit"
      labelCol={props.labelCol}
      wrapperCol={props.wrapperCol}
    >
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
