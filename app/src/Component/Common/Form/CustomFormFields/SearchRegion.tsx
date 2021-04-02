import React, { useEffect, useState } from "react"
import { Col, Row, Select } from "antd"
import { getRegions } from "~/ApiServices/Service/PersonService"
import { getCountries } from "~/ApiServices/Service/RefLookupService"
import { IGeneratedField, SearchFieldWrapper } from "~/Component/Common/Form/common"

export function SearchRegion(props: IGeneratedField) {
  const [countries, setCountries] = useState<any[]>([])
  const [regiondCodes, setRegiondCodes] = useState<any[]>([])
  const [selectedCountryCodeID, setSelectedCountryCodeId] = useState<any>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getCountries().then((x) => {
      if (x.success && Array.isArray(x.data)) {
        setCountries(x.data)
        setSelectedCountryCodeId(props.defaultValue)
        props.formInstance.setFieldsValue({
          CountryCodeID: props.defaultValue
        })
      }
    })
    // eslint-disable-next-line
  }, [props.defaultValue])

  useEffect(() => {
    if (selectedCountryCodeID) {
      setLoading(true)
      getRegions({ CountryCodeID: selectedCountryCodeID }).then((x) => {
        if (x.success && Array.isArray(x.data)) setRegiondCodes(x.data)
        setLoading(false)
      })
    } else {
      setRegiondCodes([])
    }
  }, [selectedCountryCodeID])
  return (
    <Row>
      <Col span={24}>
        <SearchFieldWrapper {...props} fieldName="CountryCodeID" label="Country">
          <Select
            allowClear={true}
            loading={loading}
            aria-label="Country Code"
            onChange={(value: any) => setSelectedCountryCodeId(value)}
          >
            {countries &&
              countries.map(({ Description, ID }, i) => (
                <Select.Option value={ID} key={`${ID}_${i}`}>
                  {Description}
                </Select.Option>
              ))}
          </Select>
        </SearchFieldWrapper>
      </Col>
      <Col span={24}>
        <SearchFieldWrapper {...props} label="Region">
          <Select allowClear={true} loading={loading} aria-label="Region Code">
            {regiondCodes &&
              regiondCodes.map(({ CountryCodeID, Description }, i) => (
                <Select.Option value={CountryCodeID} key={`${CountryCodeID}_${i}`}>
                  {Description}
                </Select.Option>
              ))}
          </Select>
        </SearchFieldWrapper>
      </Col>
    </Row>
  )
}
