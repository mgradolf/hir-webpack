import React, { useState, useEffect } from "react"
import { Card, Button, Input, Row, Col, Select } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import { OldFormError } from "~/Component/Common/OldForm/OldFormError"
import { IPersonAddressFieldNames } from "~/Component/Feature/Person/Interfaces"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { findCountry, getRegions, pushPersonAddress } from "~/ApiServices/Service/PersonService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { findDefaultCountry } from "~/ApiServices/BizApi/person/addressBookIF"
import { getAddressType } from "~/ApiServices/Service/RefLookupService"
import "~/Sass/global/index.scss"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"

interface IPersonAddressFormProps {
  formInstance: FormInstance
  fieldNames: IPersonAddressFieldNames
  initialFormValue: { [key: string]: any }
  closeModal?: () => void
  setApiCallInProgress: (flag: boolean) => void
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
}

export default function PersonAddressForm(props: IPersonAddressFormProps) {
  const [countryList, setCountryList] = useState<Array<any>>([])
  const [regions, setRegions] = useState<Array<any>>([])
  const [addressTypes, setAddressTypes] = useState<Array<any>>([])
  const [countryCodeID, setCountryCodeID] = useState<number>()
  const [countryLoading, setCountryLoading] = useState<boolean>(false)
  const [regionLoading, setRegionLoading] = useState<boolean>(false)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])

  useEffect(() => {
    ;(async function () {
      const result = await getAddressType()
      if (result.success && result.data) {
        setAddressTypes(result.data)
      }
    })()
    ;(async function () {
      setCountryLoading(true)
      const result = await findCountry({})
      if (result.success && result.data) {
        setCountryList(result.data)
      }
      setCountryLoading(false)
    })()
    ;(async function () {
      setCountryLoading(true)
      const result = await findDefaultCountry()
      if (result.success && result.data) {
        setCountryCodeID(result.data.CountryID)
        props.formInstance.setFieldsValue({
          [props.fieldNames.CountryCodeID]: result.data.CountryID
        })
      }
      setCountryLoading(false)
    })()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (countryCodeID) {
      ;(async function () {
        setRegionLoading(true)
        const result = await getRegions({ CountryCodeID: countryCodeID })
        if (result.success && result.data) {
          setRegions(result.data)
        }
        setRegionLoading(false)
      })()
    }
  }, [countryCodeID])

  const onFormSubmission = async () => {
    await props.formInstance.validateFields()
    const params = props.formInstance.getFieldsValue()

    if (params["IsConfidential"] !== undefined && params["IsConfidential"] === "true") {
      params["IsConfidential"] = true
    } else {
      params["IsConfidential"] = false
    }

    const serviceMethoToCall: (params: { [key: string]: any }) => Promise<IApiResponse> = pushPersonAddress

    setErrorMessages([])
    props.setApiCallInProgress(true)
    const response = await serviceMethoToCall(params)
    console.log(response)
    props.setApiCallInProgress(false)

    if (response && response.success) {
      props.closeModal && props.closeModal()
      eventBus.publish(REFRESH_PAGE)
    } else {
      console.log(response.error)
      setErrorMessages(response.error)
    }
  }

  const onChangeCountry = (countryID: any) => {
    props.formInstance.setFieldsValue({
      [props.fieldNames.CountryCodeID]: countryID
    })
    props.formInstance.setFieldsValue({
      [props.fieldNames.RegionCodeID]: undefined
    })
    setRegions([])
    setCountryCodeID(countryID)
  }

  return (
    <Card
      title={"Add Address"}
      actions={[
        <Row justify="end" gutter={[8, 8]} style={{ marginRight: "10px" }}>
          <Col>
            <Button type="primary" danger onClick={props.closeModal}>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button type="primary" onClick={onFormSubmission}>
              Submit
            </Button>
          </Col>
        </Row>
      ]}
    >
      <Form
        form={props.formInstance}
        initialValues={props.initialFormValue}
        scrollToFirstError
        style={{
          maxHeight: "66vh",
          overflowY: "scroll"
        }}
      >
        <OldFormError errorMessages={errorMessages} />
        <Row>
          <Col xs={24} sm={24} md={12}>
            <Form.Item className="hidden" name={props.fieldNames.PersonID}>
              <Input aria-label={"Person ID"} />
            </Form.Item>

            <Form.Item
              label={"Address Type"}
              {...layout}
              name={props.fieldNames.AddressTypeID}
              rules={[{ required: true, message: "Please select address type!" }]}
            >
              <Select aria-label={"Address Type"}>
                {addressTypes.map((x, i) => {
                  return (
                    <Select.Option key={1000 + i} value={x.ID}>
                      {x.Name}
                    </Select.Option>
                  )
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label={"Address Line 1"}
              {...layout}
              name={props.fieldNames.AddressLine1}
              rules={[{ required: true, message: "Please enter address line1!" }]}
            >
              <Input aria-label={"Address Line 1"} />
            </Form.Item>
            <Form.Item label={"Address Line 2"} {...layout} name={props.fieldNames.AddressLine2}>
              <Input aria-label={"Address Line 2"} />
            </Form.Item>
            <Form.Item label={"Address Line 3"} {...layout} name={props.fieldNames.AddressLine3}>
              <Input aria-label={"Address Line 3"} />
            </Form.Item>
            <Form.Item label={"Address Is Private"} {...layout} name={props.fieldNames.IsConfidential}>
              <Select aria-label={"Address is private"}>
                <Select.Option value="true">Yes</Select.Option>
                <Select.Option value="false">No</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label={"City"}
              {...layout}
              name={props.fieldNames.Locality}
              rules={[{ required: true, message: "Please enter city!" }]}
            >
              <Input aria-label={"City"} />
            </Form.Item>
            <Form.Item label={"State/Province"} {...layout} name={props.fieldNames.RegionCodeID}>
              <Select
                showSearch
                filterOption={(inputValue, options) => {
                  return !!(
                    options &&
                    typeof options.children === "string" &&
                    options.children.toLowerCase().includes(inputValue.toLowerCase())
                  )
                }}
                loading={regionLoading}
                aria-label={"State / Province"}
              >
                {regions.map((x, i) => {
                  return <Select.Option key={`${x.ID}_${i}`} value={x.ID} children={x.Description} />
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label={"Postal Code"}
              {...layout}
              name={props.fieldNames.PostalCode}
              rules={[{ required: true, message: "Please enter postal code!" }]}
            >
              <Input aria-label={"Postal Code"} />
            </Form.Item>
            <Form.Item
              label={"Country"}
              {...layout}
              name={props.fieldNames.CountryCodeID}
              rules={[{ required: true, message: "Please select country!" }]}
            >
              <Select
                showSearch
                filterOption={(inputValue, options) => {
                  return !!(
                    options &&
                    typeof options.children === "string" &&
                    options.children.toLowerCase().includes(inputValue.toLowerCase())
                  )
                }}
                loading={countryLoading}
                aria-label={"Country"}
                onChange={onChangeCountry}
              >
                {countryList.map((x, i) => {
                  return <Select.Option key={`${x.CountryID}_${i}`} value={x.CountryID} children={x.Description} />
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}
