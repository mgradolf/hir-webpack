import { Col, Row, Select } from "antd"
import React, { useEffect, useState } from "react"
import { getRegions } from "~/ApiServices/Service/PersonService"
import { getCountries } from "~/ApiServices/Service/RefLookupService"
import { IGeneratedField, SearchComponentWrapper } from "~/Component/Common/SearchForm/common"

export function SearchRegion(props: IGeneratedField) {
  const [countries, setCountries] = useState<any[]>([])
  const [regiondCodes, setRegiondCodes] = useState<any[]>([])
  const [selectedCountry, setSelectedCountry] = useState<any>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getCountries().then((x) => {
      if (x.success && Array.isArray(x.data)) setCountries(x.data)
    })
  }, [])

  useEffect(() => {
    if (selectedCountry) {
      setLoading(true)
      getRegions({ CountryCodeID: selectedCountry }).then((x) => {
        if (x.success && Array.isArray(x.data)) setRegiondCodes(x.data)
        setLoading(false)
      })
    }
  }, [selectedCountry])
  return (
    <Row>
      <Col span={12}>
        <SearchComponentWrapper {...props} fieldName="CountryCodeID" label="Country">
          <Select
            allowClear={true}
            loading={loading}
            aria-label="Country Code"
            onChange={(value: any) => setSelectedCountry(value)}
          >
            {countries &&
              countries.map(({ Description, ID }, i) => (
                <Select.Option value={ID} key={`${ID}_${i}`}>
                  {Description}
                </Select.Option>
              ))}
          </Select>
        </SearchComponentWrapper>
      </Col>
      <Col span={12}>
        <SearchComponentWrapper {...props}>
          <Select allowClear={true} loading={loading} aria-label="Region Code">
            {regiondCodes &&
              regiondCodes.map(({ CountryCodeID, Description }, i) => (
                <Select.Option value={CountryCodeID} key={`${CountryCodeID}_${i}`}>
                  {Description}
                </Select.Option>
              ))}
          </Select>
        </SearchComponentWrapper>
      </Col>
    </Row>
  )
}
