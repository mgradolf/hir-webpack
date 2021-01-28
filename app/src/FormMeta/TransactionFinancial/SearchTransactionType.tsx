import { Col, Row, Select } from "antd"
import React, { useEffect, useState } from "react"
import { getBaseTransactionTypes, getTransactionTypes } from "~/ApiServices/Service/TransactionService"
import { IGeneratedField, SearchComponentWrapper } from "~/Component/Common/SearchForm/common"

export function SearchTransactionType(props: IGeneratedField) {
  const [countries, setCountries] = useState<any[]>([])
  const [regiondCodes, setRegiondCodes] = useState<any[]>([])
  const [selectedCountry, setSelectedCountry] = useState<any>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getBaseTransactionTypes({}).then((x) => {
      if (x.success && Array.isArray(x.data)) setCountries(x.data)
    })
  }, [])

  useEffect(() => {
    if (selectedCountry) {
      setLoading(true)
      getTransactionTypes({ BaseTransactionTypeID: selectedCountry }).then((x) => {
        if (x.success && Array.isArray(x.data)) setRegiondCodes(x.data)
        setLoading(false)
      })
    }
  }, [selectedCountry])
  return (
    <Row
      style={{
        border: "1px solid #d3d3d3",
        padding: "20px 0px 0px 10px",
        borderRadius: "5px",
        marginBottom: "20px"
      }}
    >
      <Col span={24}>
        <SearchComponentWrapper {...props} fieldName="BaseTransactionTypeID" label="Base Transaction Type">
          <Select allowClear={true} loading={loading} onChange={(value: any) => setSelectedCountry(value)}>
            {countries &&
              countries.map(({ Name, ID }, i) => (
                <Select.Option value={ID} key={`${ID}_${i}`}>
                  {Name}
                </Select.Option>
              ))}
          </Select>
        </SearchComponentWrapper>
      </Col>
      <Col span={24}>
        <SearchComponentWrapper {...props}>
          <Select allowClear={true} loading={loading}>
            {regiondCodes &&
              regiondCodes.map(({ ID, Name }, i) => (
                <Select.Option value={ID} key={`${ID}_${i}`}>
                  {Name}
                </Select.Option>
              ))}
          </Select>
        </SearchComponentWrapper>
      </Col>
    </Row>
  )
}
