import { Form, Select } from "antd"
import { FormInstance } from "antd/lib/form"
import React, { useEffect, useState } from "react"
import { findDefaultCountry } from "~/ApiServices/BizApi/person/addressBookIF"
import { getRegions } from "~/ApiServices/Service/PersonService"
import { getCountries } from "~/ApiServices/Service/RefLookupService"
import { FormDatePicker } from "~/Component/Common/Form/FormDatePicker"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { FormNumberInput } from "~/Component/Common/Form/FormNumberInput"
import { FormTextArea } from "~/Component/Common/Form/FormTextArea"

export const PO = (props: { formInstance: FormInstance }) => {
  const [defaultCountryCodeID, setDefaultCountryCodeID] = useState()
  const [countries, setCountries] = useState<any[]>([])
  const [regiondCodes, setRegiondCodes] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    findDefaultCountry().then((result) => {
      if (result.success && result.data) {
        setDefaultCountryCodeID(result.data.CountryID)
        props.formInstance.setFieldsValue({
          CountryCodeID: result.data.CountryID
        })
      }
    })
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    getCountries().then((x) => {
      if (x.success && Array.isArray(x.data)) {
        setCountries(x.data)
      }
    })
    // eslint-disable-next-line
  }, [defaultCountryCodeID])

  useEffect(() => {
    if (defaultCountryCodeID) {
      setLoading(true)
      getRegions({ CountryCodeID: defaultCountryCodeID }).then((x) => {
        if (x.success && Array.isArray(x.data)) setRegiondCodes(x.data)
        setLoading(false)
      })
    } else {
      setRegiondCodes([])
    }
  }, [defaultCountryCodeID])
  return (
    <Form
      form={props.formInstance}
      style={{
        maxHeight: "66vh",
        overflowY: "scroll"
      }}
    >
      <FormNumberInput
        wrapperColSpan={18}
        formInstance={props.formInstance}
        fieldName="PONumber"
        label="PO Number"
        rules={[{ required: true }]}
      />
      <FormDatePicker
        wrapperColSpan={18}
        formInstance={props.formInstance}
        fieldName="PaymentDueDate"
        label="Due Date"
      />
      <FormInput wrapperColSpan={18} formInstance={props.formInstance} fieldName="" label="Issuer" />
      <FormInput
        wrapperColSpan={18}
        formInstance={props.formInstance}
        fieldName=""
        label="Contact Person"
        rules={[{ required: true }]}
      />
      <FormInput wrapperColSpan={18} formInstance={props.formInstance} fieldName="Telephone" label="Phone Number" />
      <FormInput wrapperColSpan={18} formInstance={props.formInstance} fieldName="Address1" label="Address Line 1" />
      <FormInput wrapperColSpan={18} formInstance={props.formInstance} fieldName="Address2" label="Address Line 2" />
      <FormInput wrapperColSpan={18} formInstance={props.formInstance} fieldName="Address3" label="Address Line 3" />

      <FormInput
        wrapperColSpan={18}
        formInstance={props.formInstance}
        label={"City"}
        ariaLabel={"City"}
        fieldName="City"
      />

      <Form.Item colon={false} name="RegionCodeID" label="State" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
        <Select
          showSearch
          filterOption={(inputValue, options) => {
            return !!(
              options &&
              typeof options.children === "string" &&
              options.children.toLowerCase().startsWith(inputValue.toLowerCase())
            )
          }}
          allowClear={true}
          loading={loading}
          aria-label="Region Code"
        >
          {regiondCodes &&
            regiondCodes.map(({ ID, Description }, i) => (
              <Select.Option value={ID} key={`${ID}_${i}`} children={Description} />
            ))}
        </Select>
      </Form.Item>

      <FormInput
        wrapperColSpan={18}
        formInstance={props.formInstance}
        label={"Postal Code"}
        ariaLabel={"Postal Code"}
        fieldName="PostalCode"
      />

      <Form.Item colon={false} label="Country" name="CountryCodeID" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
        <Select
          showSearch
          filterOption={(inputValue, options) => {
            return !!(
              options &&
              typeof options.children === "string" &&
              options.children.toLowerCase().startsWith(inputValue.toLowerCase())
            )
          }}
          allowClear={true}
          loading={loading}
          aria-label="Country Code"
          onChange={(value: any) => {
            setDefaultCountryCodeID(value)
            props.formInstance.setFieldsValue({ RegionCodeID: null })
          }}
        >
          {countries &&
            countries.map(({ Description, ID }) => (
              <Select.Option value={ID} key={`${ID}_${Description}`} children={Description} />
            ))}
        </Select>
      </Form.Item>

      <FormTextArea wrapperColSpan={18} formInstance={props.formInstance} fieldName="Description" label="Description" />
      <FormTextArea wrapperColSpan={18} formInstance={props.formInstance} fieldName="Note" label="Record Note" />
    </Form>
  )
}
