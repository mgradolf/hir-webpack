import React, { useState, useEffect } from "react"
import { Card, Button, Input, Row, Col, DatePicker, Select } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import { OldFormError } from "~/Component/Common/OldForm/OldFormError"
import { IPersonFieldNames } from "~/Component/Person/Interfaces"
import { findDefaultCountry } from "~/ApiServices/BizApi/person/addressBookIF"
import { findCountry, createPersonRecordInRoles, getRegions } from "~/ApiServices/Service/PersonService"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import Notification from "~/utils/notification"
import { DATE_FORMAT, CREATE_SUCCESSFULLY, PERSON_ROLE } from "~/utils/Constants"
import { FormMultipleCheckbox } from "~/Component/Common/Form/FormMultipleCheckbox"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import "~/Sass/global/index.scss"

interface IPersonFormProps {
  editMode: boolean
  title: string
  formInstance: FormInstance
  fieldNames: IPersonFieldNames
  initialFormValue: { [key: string]: any }
  closeModal?: () => void
  setApiCallInProgress: (flag: boolean) => void
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
}

const rolesOption = [
  { label: "Student", value: PERSON_ROLE.STUDENT },
  { label: "Instructor", value: PERSON_ROLE.INSTRUCTOR },
  { label: "Purchaser", value: PERSON_ROLE.PURCHASER }
]

export default function PersonForm(props: IPersonFormProps) {
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [countryList, setCountryList] = useState<Array<any>>([])
  const [regions, setRegions] = useState<Array<any>>([])
  const [countryCodeID, setCountryCodeID] = useState<number>()
  const [countryLoading, setCountryLoading] = useState<boolean>(false)
  const [regionLoading, setRegionLoading] = useState<boolean>(false)
  const [isPurchaserRole, setIsPurchaserRole] = useState<boolean>(false)

  useEffect(() => {
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

  const onSelectRoles = (values: any) => {
    if (values.includes(PERSON_ROLE.PURCHASER)) {
      setIsPurchaserRole(true)
    } else {
      setIsPurchaserRole(false)
    }
  }

  const onFormSubmission = async () => {
    await props.formInstance.validateFields()
    const params = props.formInstance.getFieldsValue()

    const serviceMethoToCall: (params: { [key: string]: any }) => Promise<IApiResponse> = props.editMode
      ? createPersonRecordInRoles
      : createPersonRecordInRoles

    setErrorMessages([])
    props.setApiCallInProgress(true)
    const response = await serviceMethoToCall(params)
    console.log(response)
    props.setApiCallInProgress(false)

    if (response && response.success) {
      props.closeModal && props.closeModal()
      Notification(CREATE_SUCCESSFULLY)
    } else {
      console.log(response.error)
      setErrorMessages(response.error)
    }
  }

  return (
    <Card
      title={props.editMode ? `Edit ${props.title}` : `Create New ${props.title}`}
      actions={[
        <Row justify="end" gutter={[8, 8]} style={{ marginRight: "10px" }}>
          <Col>
            <Button type="primary" aria-label="Cancel" danger onClick={() => props.closeModal && props.closeModal()}>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button type="primary" aria-label="Submit" onClick={onFormSubmission}>
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
          maxHeight: "80vh",
          overflowY: "scroll"
        }}
      >
        <OldFormError errorMessages={errorMessages} />
        <Row>
          <Col xs={24} sm={24} md={12}>
            <FormMultipleCheckbox
              onChangeCallback={onSelectRoles}
              label={"Roles"}
              fieldName={props.fieldNames.Roles}
              formInstance={props.formInstance}
              options={rolesOption}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label={"First Name"}
              {...layout}
              name={props.fieldNames.FirstName}
              rules={[{ required: true, message: "Please enter first name!" }]}
            >
              <Input aria-label={"Frist Name"} />
            </Form.Item>
            <Form.Item
              label={"Last Name"}
              {...layout}
              name={props.fieldNames.LastName}
              rules={[{ required: true, message: "Please enter last name!" }]}
            >
              <Input aria-label={"Last Name"} />
            </Form.Item>
            <Form.Item label={"Date Of Birth"} {...layout} name={props.fieldNames.Birthday}>
              <DatePicker aria-label="Pick BirthDate" placeholder="YYYY/MM/DD" format={DATE_FORMAT} />
            </Form.Item>
            <Form.Item
              label={"Email Address"}
              {...layout}
              name={props.fieldNames.EmailAddress}
              rules={[{ required: isPurchaserRole, message: "Please enter email address!" }]}
            >
              <Input type="email" aria-label={"Email Address"} />
            </Form.Item>
            <Form.Item
              label={"Telephone"}
              {...layout}
              name={props.fieldNames.TelephoneNumber}
              rules={[{ required: isPurchaserRole, message: "Please enter telephone number!" }]}
            >
              <Input aria-label={"Telephone"} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label={"Address Line 1"}
              {...layout}
              name={props.fieldNames.AddressLine1}
              rules={[{ required: isPurchaserRole, message: "Please enter address!" }]}
            >
              <Input aria-label={"Address Line 1"} />
            </Form.Item>
            <Form.Item label={"Address Line 2"} {...layout} name={props.fieldNames.AddressLine2}>
              <Input aria-label={"Address Line 2"} />
            </Form.Item>
            <Form.Item label={"Address Line 3"} {...layout} name={props.fieldNames.AddressLine3}>
              <Input aria-label={"Address Line 3"} />
            </Form.Item>
            <Form.Item label={"City"} {...layout} name={props.fieldNames.Locality}>
              <Input aria-label={"City"} />
            </Form.Item>
            <Form.Item label={"State/Province"} {...layout} name={props.fieldNames.RegionCodeID}>
              <Select loading={regionLoading} aria-label={"State / Province"}>
                {regions.map((x, i) => {
                  return (
                    <Select.Option key={1000 + i} value={x.RegionCodeID}>
                      {x.Description}
                    </Select.Option>
                  )
                })}
              </Select>
            </Form.Item>
            <Form.Item label={"Postal Code"} {...layout} name={props.fieldNames.PostalCode}>
              <Input aria-label={"Postal Code"} />
            </Form.Item>
            <Form.Item label={"Country"} {...layout} name={props.fieldNames.CountryCodeID}>
              <Select loading={countryLoading} aria-label={"Country"} onChange={onChangeCountry}>
                {countryList.map((x, i) => {
                  return (
                    <Select.Option key={1000 + i} value={x.CountryID}>
                      {x.Description}
                    </Select.Option>
                  )
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}
