import React, { useEffect, useState } from "react"
import { Col, Input, Row, Select } from "antd"
import { getGLAccountTypes } from "~/ApiServices/Service/RefLookupService"
import { IGeneratedField, SearchComponentWrapper } from "~/Component/Common/Form/common"

export function GLAccount(props: IGeneratedField) {
  const [glCodes, setGLCodes] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    getGLAccountTypes().then((x: any) => {
      if (x.success && Array.isArray(x.data)) {
        setGLCodes(x.data)
      }
    })
    setLoading(false)
  }, [])

  return (
    <Row>
      <Col span={24}>
        <SearchComponentWrapper {...props} fieldName="GLAccountID" label="GL Code">
          <Select
            allowClear={true}
            loading={loading}
            aria-label="GL Code"
            onChange={(value: any) => {
              const description = glCodes.filter((x) => x.ID === value)
              props.formInstance.setFieldsValue({ Description: description[0].Description })
            }}
          >
            {glCodes &&
              glCodes.map(({ Name, ID }, i) => (
                <Select.Option value={ID} key={`${ID}_${i}`}>
                  {Name}
                </Select.Option>
              ))}
          </Select>
        </SearchComponentWrapper>
      </Col>
      <Col span={24}>
        <SearchComponentWrapper {...props} fieldName="Description" label="GL Description">
          <Input aria-label={"GL Description"} type="text" disabled={true} />
        </SearchComponentWrapper>
      </Col>
    </Row>
  )
}
