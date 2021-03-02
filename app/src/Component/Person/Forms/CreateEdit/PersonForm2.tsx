import React, { useState } from "react"
import { Row, Col } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import { IPersonFieldNames } from "~/Component/Person/Interfaces"
import { createPersonRecordInRoles } from "~/ApiServices/Service/PersonService"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { FormMultipleCheckbox } from "~/Component/Common/Form/FormMultipleCheckbox"
import { CustomFormModalOpenButton } from "~/Component/Common/Modal/FormModal/CustomFormModalOpenButton"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { FormDatePicker } from "~/Component/Common/Form/FormDatePicker"
import { SearchRegion } from "~/Component/Common/Form/CustomFormFields/SearchRegion"

interface IPersonFormProps {
  editMode: boolean
  formInstance: FormInstance
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
}

const rolesOption = [
  { label: "Student", value: 1 },
  { label: "Instructor", value: 2 },
  { label: "Purchaser", value: 3 }
]

const fieldNames: IPersonFieldNames = {
  Roles: "Roles",
  FirstName: "FirstName",
  LastName: "LastName",
  Birthday: "Birthday",
  EmailAddress: "EmailAddress",
  TelephoneNumber: "TelephoneNumber",
  AddressLine1: "AddressLine1",
  AddressLine2: "AddressLine2",
  AddressLine3: "AddressLine3",
  Locality: "Locality",
  PostalCode: "PostalCode",
  RegionCodeID: "RegionCodeID",
  CountryCodeID: "CountryCodeID"
}
// const formConfig: IPersonFieldNames = {
//   Roles: {
//     label: "Roles",
//     // sortOrder: 0,
//     placeholder: "",
//     ariaLabel: "",
//     hidden: false,
//     // displayKey: "string",
//     required: false
//   },
//   FirstName: {
//     label: "FirstName",
//     // sortOrder: 0,
//     placeholder: "",
//     ariaLabel: "",
//     hidden: false,
//     // displayKey: "string",
//     required: false
//   },
//   LastName: {
//     label: "LastName",
//     // sortOrder: 0,
//     placeholder: "",
//     ariaLabel: "",
//     hidden: false,
//     // displayKey: "string",
//     required: false
//   },
//   Birthday: {
//     label: "Birthday",
//     // sortOrder: 0,
//     placeholder: "",
//     ariaLabel: "",
//     hidden: false,
//     // displayKey: "string",
//     required: false
//   },
//   EmailAddress: {
//     label: "EmailAddress",
//     // sortOrder: 0,
//     placeholder: "",
//     ariaLabel: "",
//     hidden: false,
//     // displayKey: "string",
//     required: false
//   },
//   TelephoneNumber: {
//     label: "TelephoneNumber",
//     // sortOrder: 0,
//     placeholder: "",
//     ariaLabel: "",
//     hidden: false,
//     // displayKey: "string",
//     required: false
//   },
//   AddressLine1: {
//     label: "AddressLine1",
//     // sortOrder: 0,
//     placeholder: "",
//     ariaLabel: "",
//     hidden: false,
//     // displayKey: "string",
//     required: false
//   },
//   AddressLine2: {
//     label: "AddressLine2",
//     // sortOrder: 0,
//     placeholder: "",
//     ariaLabel: "",
//     hidden: false,
//     // displayKey: "string",
//     required: false
//   },
//   AddressLine3: {
//     label: "AddressLine3",
//     // sortOrder: 0,
//     placeholder: "",
//     ariaLabel: "",
//     hidden: false,
//     // displayKey: "string",
//     required: false
//   },
//   Locality: {
//     label: "Locality",
//     // sortOrder: 0,
//     placeholder: "",
//     ariaLabel: "",
//     hidden: false,
//     // displayKey: "string",
//     required: false
//   },
//   PostalCode: {
//     label: "PostalCode",
//     // sortOrder: 0,
//     placeholder: "",
//     ariaLabel: "",
//     hidden: false,
//     // displayKey: "string",
//     required: false
//   },
//   RegionCodeID: {
//     label: "RegionCodeID",
//     // sortOrder: 0,
//     placeholder: "",
//     ariaLabel: "",
//     hidden: false,
//     // displayKey: "string",
//     required: false
//   },
//   CountryCodeID: {
//     label: "CountryCodeID",
//     // sortOrder: 0,
//     placeholder: "",
//     ariaLabel: "",
//     hidden: false,
//     // displayKey: "string",
//     required: false
//   }
// }

export default function PersonForm2(props: IPersonFormProps) {
  // const [countryList, setCountryList] = useState<Array<any>>([])
  // const [regions, setRegions] = useState<Array<any>>([])
  // const [countryCodeID, setCountryCodeID] = useState<number>()
  // const [countryLoading, setCountryLoading] = useState<boolean>(false)
  // const [regionLoading, setRegionLoading] = useState<boolean>(false)

  // useEffect(() => {
  //   ;(async function () {
  //     setCountryLoading(true)
  //     const result = await findCountry({})
  //     if (result.success && result.data) {
  //       setCountryList(result.data)
  //     }
  //     setCountryLoading(false)
  //   })()
  //   ;(async function () {
  //     setCountryLoading(true)
  //     const result = await findDefaultCountry()
  //     if (result.success && result.data) {
  //       setCountryCodeID(result.data.CountryID)
  //       props.formInstance.setFieldsValue({
  //         [fieldNames.CountryCodeID]: result.data.CountryID
  //       })
  //     }
  //     setCountryLoading(false)
  //   })()
  //   // eslint-disable-next-line
  // }, [])

  // useEffect(() => {
  //   if (countryCodeID) {
  //     ;(async function () {
  //       setRegionLoading(true)
  //       const result = await getRegions({ CountryCodeID: countryCodeID })
  //       if (result.success && result.data) {
  //         setRegions(result.data)
  //       }
  //       setRegionLoading(false)
  //     })()
  //   }
  // }, [countryCodeID])

  // const onChangeCountry = (countryID: any) => {
  //   props.formInstance.setFieldsValue({
  //     [fieldNames.CountryCodeID]: countryID
  //   })
  //   props.formInstance.setFieldsValue({
  //     [fieldNames.RegionCodeID]: undefined
  //   })
  //   setRegions([])
  //   setCountryCodeID(countryID)
  // }

  return (
    <>
      <Row>
        <Col xs={24} sm={24} md={12}>
          <FormMultipleCheckbox
            label={"Roles"}
            fieldName={fieldNames.Roles}
            formInstance={props.formInstance}
            options={rolesOption}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={24} md={12}>
          <FormInput
            {...layout}
            formInstance={props.formInstance}
            label={"First Name"}
            ariaLabel={"Frist Name"}
            fieldName={fieldNames.FirstName}
            defaultValue={{}}
            rules={[{ required: true, message: "Please enter first name!" }]}
          />

          <FormInput
            {...layout}
            formInstance={props.formInstance}
            fieldName={fieldNames.LastName}
            label={"Last Name"}
            ariaLabel={"Last Name"}
            rules={[{ required: true, message: "Please enter last name!" }]}
          />

          <FormDatePicker
            label={"Date Of Birth"}
            formInstance={props.formInstance}
            {...layout}
            fieldName={fieldNames.Birthday}
            aria-label="Pick BirthDate"
            placeholder="YYYY/MM/DD"
          />

          <FormInput
            {...layout}
            formInstance={props.formInstance}
            fieldName={fieldNames.EmailAddress}
            label={"Email Address"}
            ariaLabel={"Email Address"}
            rules={[{ required: true, message: "Please enter valid email address!", type: "email" }]}
          />

          <FormInput
            {...layout}
            formInstance={props.formInstance}
            fieldName={fieldNames.TelephoneNumber}
            label={"Telephone"}
            ariaLabel={"Telephone"}
          />
        </Col>
        <Col xs={24} sm={24} md={12}>
          <FormInput
            {...layout}
            formInstance={props.formInstance}
            fieldName={fieldNames.AddressLine1}
            label={"Address Line 1"}
            ariaLabel={"Address Line 1"}
          />

          <FormInput
            {...layout}
            formInstance={props.formInstance}
            fieldName={fieldNames.AddressLine2}
            label={"Address Line 2"}
            ariaLabel={"Address Line 2"}
          />

          <FormInput
            {...layout}
            formInstance={props.formInstance}
            fieldName={fieldNames.AddressLine3}
            label={"Address Line 3"}
            ariaLabel={"Address Line 3"}
          />

          <FormInput
            {...layout}
            formInstance={props.formInstance}
            fieldName={fieldNames.Locality}
            label={"City"}
            ariaLabel={"City"}
          />

          <FormInput
            {...layout}
            formInstance={props.formInstance}
            fieldName={fieldNames.PostalCode}
            label={"Postal Code"}
            ariaLabel={"Postal Code"}
          />

          <SearchRegion
            {...layout}
            label={"State/Province"}
            formInstance={props.formInstance}
            {...layout}
            fieldName={fieldNames.RegionCodeID}
          />
          {/* <Form.Item label={"State/Province"} {...layout} name={fieldNames.RegionCodeID}>
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
          <Form.Item label={"Country"} {...layout} name={fieldNames.CountryCodeID}>
            <Select loading={countryLoading} aria-label={"Country"} onChange={onChangeCountry}>
              {countryList.map((x, i) => {
                return (
                  <Select.Option key={1000 + i} value={x.CountryID}>
                    {x.Description}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item> */}
        </Col>
      </Row>
    </>
  )
}

export function PersonFormOpenButton() {
  const [formInstance] = Form.useForm()
  const [showModal, setShowModal] = useState(false)
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  // const [loading, setLoading] = useState(false)
  const [loading] = useState(false)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [initialValues] = useState<{ [key: string]: any }>({})

  const onFormSubmission = async () => {
    await formInstance.validateFields()
    const params = formInstance.getFieldsValue()

    setErrorMessages([])
    setApiCallInProgress(true)
    const response = await createPersonRecordInRoles(params)
    console.log(response)
    setApiCallInProgress(false)

    if (response && response.success) {
      setShowModal(false)
    } else {
      console.log(response.error)
      setErrorMessages(response.error)
    }
  }
  return (
    <CustomFormModalOpenButton
      formTitle={"Create Person"}
      customForm={<PersonForm2 editMode={false} formInstance={formInstance} />}
      formInstance={formInstance}
      onFormSubmission={onFormSubmission}
      initialValues={initialValues}
      apiCallInProgress={apiCallInProgress}
      loading={loading}
      errorMessages={errorMessages}
      buttonLabel="+ Create Person"
      buttonProps={{ type: "primary" }}
      showModal={showModal}
      setShowModal={(show: boolean) => setShowModal(show)}
    />
  )
}
