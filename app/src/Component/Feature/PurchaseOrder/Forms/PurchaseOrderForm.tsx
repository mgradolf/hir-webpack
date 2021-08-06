import React, { useEffect, useState } from "react"
import { Form, Select, Divider, Row, Col, message } from "antd"
import { FormInstance } from "antd/lib/form"
import { CREATE_SUCCESSFULLY, UPDATE_SUCCESSFULLY } from "~/utils/Constants"
import { FormDatePicker } from "~/Component/Common/Form/FormDatePicker"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { CustomFormModalOpenButton } from "~/Component/Common/Modal/FormModal/CustomFormModalOpenButton"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import { EditOutlined, PlusOutlined } from "@ant-design/icons"
import { iconType } from "~/Component/Common/Form/Buttons/IconButton"
import { IPurchaseOrderFieldNames } from "~/Component/Feature/PurchaseOrder/Interfaces"
import { getCountries } from "~/ApiServices/Service/RefLookupService"
import { findAddresses, findPreferredTelephone, getRegions } from "~/ApiServices/Service/PersonService"
import { FormNumberInput } from "~/Component/Common/Form/FormNumberInput"
import { FormTextArea } from "~/Component/Common/Form/FormTextArea"
import { findDefaultCountry } from "~/ApiServices/BizApi/person/addressBookIF"
import { createOrUpdatePurchaseOrder } from "~/ApiServices/Service/POService"
import { FormInputNumber } from "~/Component/Common/Form/FormInputNumber"
import "~/Sass/utils.scss"

interface IPurchaseOrderFormProps {
  editMode: boolean
  initialValue: { [key: string]: any }
  formInstance: FormInstance
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
}

const fieldNames: IPurchaseOrderFieldNames = {
  PurchaseOrderID: "PurchaseOrderID",
  OrderID: "OrderID",
  POName: "POName",
  PONumber: "PONumber",
  AccountName: "AccountName",
  ContactPerson: "ContactPerson",
  POAmount: "POAmount",
  PaymentDueDate: "PaymentDueDate",
  Address1: "Address1",
  Address2: "Address2",
  Address3: "Address3",
  City: "City",
  RegionCodeID: "RegionCodeID",
  PostalCode: "PostalCode",
  CountryCodeID: "CountryCodeID",
  Telephone: "Telephone",
  Description: "Description",
  Note: "Note"
}

function PurchaseOrderForm(props: IPurchaseOrderFormProps) {
  const [defaultCountryCodeID, setDefaultCountryCodeID] = useState()
  const [countries, setCountries] = useState<any[]>([])
  const [regiondCodes, setRegiondCodes] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (props.initialValue.PersonID) {
      findPreferredTelephone({ PersonID: props.initialValue.PersonID }).then((result) => {
        if (result.success && result.data) {
          props.formInstance.setFieldsValue({ [fieldNames.Telephone]: result.data.TelephoneNumber })
        }
      })

      findAddresses({ PersonID: props.initialValue.PersonID }).then((result) => {
        let countryCodeID = undefined
        if (result.success && result.data) {
          result.data = { ...result.data[0] }
          countryCodeID = result.data.CountryCodeID
          props.formInstance.setFieldsValue({
            [fieldNames.Address1]: result.data.AddressLine1,
            [fieldNames.Address2]: result.data.AddressLine2,
            [fieldNames.Address3]: result.data.AddressLine3,
            [fieldNames.CountryCodeID]: result.data.CountryCodeID,
            [fieldNames.RegionCodeID]: result.data.RegionCodeID,
            [fieldNames.PostalCode]: result.data.PostalCode,
            [fieldNames.City]: result.data.Locality
          })
        }

        if (countryCodeID !== undefined) {
          setDefaultCountryCodeID(countryCodeID)
        } else {
          findDefaultCountry().then((result) => {
            if (result.success && result.data) {
              setDefaultCountryCodeID(result.data.CountryID)
              props.formInstance.setFieldsValue({
                CountryCodeID: result.data.CountryID
              })
            }
          })
        }
      })
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    getCountries().then((x) => {
      if (x.success && Array.isArray(x.data)) {
        setCountries(x.data)
        if (props.initialValue.Country !== undefined) {
          x.data.map((val: any) => {
            if (val.Name === props.initialValue.Country) {
              setDefaultCountryCodeID(val.ID)
              props.formInstance.setFieldsValue({
                CountryCodeID: val.ID
              })
              return false
            }
            return false
          })
        }
      }
    })
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (defaultCountryCodeID) {
      setLoading(true)
      getRegions({ CountryCodeID: defaultCountryCodeID }).then((x) => {
        if (x.success && Array.isArray(x.data)) {
          setRegiondCodes(x.data)
          if (props.initialValue.Region !== undefined) {
            x.data.map((val: any) => {
              if (val.Name === props.initialValue.Region) {
                setDefaultCountryCodeID(val.ID)
                props.formInstance.setFieldsValue({
                  RegionCodeID: val.ID
                })
                return false
              }
              return false
            })
          }
        }
        setLoading(false)
      })
    } else {
      setRegiondCodes([])
    }
    // eslint-disable-next-line
  }, [defaultCountryCodeID])

  return (
    <>
      <Row>
        <Col xs={24} sm={24} md={12}>
          <FormInput
            formInstance={props.formInstance}
            label="PurchaseOrderID"
            fieldName={fieldNames.PurchaseOrderID}
            hidden
          />
          <FormInput formInstance={props.formInstance} label="OrderID" fieldName={fieldNames.OrderID} hidden />

          <FormNumberInput
            {...layout}
            formInstance={props.formInstance}
            label={"PO Number"}
            ariaLabel={"PO Number"}
            fieldName={fieldNames.PONumber}
            rules={[{ required: true, message: "Please enter PO Number!" }]}
          />
          <FormInputNumber
            {...layout}
            formInstance={props.formInstance}
            label={"Amount"}
            ariaLabel={"Amount"}
            fieldName={fieldNames.POAmount}
            rules={[{ required: true, message: "Please enter amount!" }]}
          />
          <FormTextArea
            {...layout}
            formInstance={props.formInstance}
            label={"Description"}
            ariaLabel={"Description"}
            fieldName={fieldNames.Description}
          />
        </Col>
        <Col xs={24} sm={24} md={12}>
          <FormDatePicker
            label={"Due Date"}
            formInstance={props.formInstance}
            {...layout}
            aria-label="Pick Due Date"
            placeholder="YYYY/MM/DD"
            fieldName={fieldNames.PaymentDueDate}
            defaultValue={props.initialValue.PaymentDueDate}
          />
          <FormTextArea
            {...layout}
            formInstance={props.formInstance}
            label={"Note"}
            ariaLabel={"Note"}
            fieldName={fieldNames.Note}
          />
        </Col>
      </Row>
      <Row>
        <Divider orientation="left">Contact Details</Divider>
        <Col xs={24} sm={24} md={12}>
          <FormInput
            {...layout}
            formInstance={props.formInstance}
            label={"Issuer"}
            ariaLabel={"Issuer"}
            fieldName={fieldNames.AccountName}
          />
          <FormInput
            {...layout}
            formInstance={props.formInstance}
            label={"Phone Number"}
            ariaLabel={"Phone Number"}
            fieldName={fieldNames.Telephone}
          />
          <FormInput
            {...layout}
            formInstance={props.formInstance}
            label={"Address Line 1"}
            ariaLabel={"Address Line 1"}
            fieldName={fieldNames.Address1}
          />
          <FormInput
            {...layout}
            formInstance={props.formInstance}
            label={"Address Line 2"}
            ariaLabel={"Address Line 2"}
            fieldName={fieldNames.Address2}
          />
          <FormInput
            {...layout}
            formInstance={props.formInstance}
            label={"Address Line 3"}
            ariaLabel={"Address Line 3"}
            fieldName={fieldNames.Address3}
          />
        </Col>
        <Col xs={24} sm={24} md={12}>
          <FormInput
            {...layout}
            formInstance={props.formInstance}
            label={"Contact Person"}
            ariaLabel={"Contact Person"}
            fieldName={fieldNames.ContactPerson}
          />
          <FormInput
            {...layout}
            formInstance={props.formInstance}
            label={"City"}
            ariaLabel={"City"}
            fieldName={fieldNames.City}
            rules={[{ required: true, message: "Please enter city!" }]}
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
            {...layout}
            formInstance={props.formInstance}
            label={"Postal Code"}
            ariaLabel={"Postal Code"}
            fieldName={fieldNames.PostalCode}
          />
          <Form.Item
            colon={false}
            label="Country"
            name={fieldNames.CountryCodeID}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            rules={[{ required: true, message: "Please select country!" }]}
          >
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
                console.log("value: ", value)
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
        </Col>
      </Row>
    </>
  )
}

export function PurchaseOrderFormOpenButton(props: {
  editMode: boolean
  iconType?: iconType
  initialValues: { [key: string]: any }
}) {
  const [loading] = useState(false)
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [initialValues] = useState<{ [key: string]: any }>(
    {
      ...props.initialValues,
      PONumber: props.initialValues.PurchaseOrderDescriptor,
      ContactPerson: props.initialValues.BuyerName ? props.initialValues.BuyerName : props.initialValues.ContactPerson
    } || {}
  )

  const onFormSubmission = async (closeModal: () => void) => {
    formInstance.validateFields().then((x) => {
      const params = formInstance.getFieldsValue()

      setApiCallInProgress(true)
      setErrorMessages([])
      createOrUpdatePurchaseOrder(params)
        .then((response) => {
          setApiCallInProgress(false)
          if (response && response.success) {
            formInstance.resetFields()
            message.success(props.editMode ? UPDATE_SUCCESSFULLY : CREATE_SUCCESSFULLY)
            eventBus.publish(REFRESH_PAGE)
            closeModal()
          } else {
            console.log("validation failed ", response.error)
            setErrorMessages(response.error)
          }
        })
        .catch((y) => console.error(y))
    })
  }

  return (
    <CustomFormModalOpenButton
      formTitle={props.editMode ? "Update Purchase Order" : "Add Purchase Order"}
      helpKey={
        props.editMode
          ? `financialsOrderPurchaseOrdersUpdatePurchaseOrderForm`
          : `financialsOrderPurchaseOrdersAddPurchaseOrderForm`
      }
      customForm={<PurchaseOrderForm editMode={true} initialValue={props.initialValues} formInstance={formInstance} />}
      formInstance={formInstance}
      onFormSubmission={onFormSubmission}
      initialValues={initialValues}
      apiCallInProgress={apiCallInProgress}
      iconType={props.iconType}
      loading={loading}
      errorMessages={errorMessages}
      buttonLabel={props.editMode ? "Update Purchase Order" : "Add Purchase Order"}
      buttonProps={{ type: "primary", icon: props.editMode ? <EditOutlined /> : <PlusOutlined />, shape: "circle" }}
    />
  )
}
