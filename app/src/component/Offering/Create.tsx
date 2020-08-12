import * as React from "react"
import { Modal, Form } from "antd"
import { Store } from "antd/lib/form/interface"
import { FormInstance } from "antd/lib/form"
import { getOfferingTypes } from "~/ApiServices/Service/RefLookupServiceWrap"
import { useEffect, useState } from "react"
import CreateForm1 from "~/component/Offering/CreateForm1"
import CreateForm2 from "~/component/Offering/CreateForm2"

interface ICreateNewOffering {
  visible: boolean
  onClose: (flag: boolean) => void
}

interface IFormContentsProps {
  formInstance: FormInstance
  activePage: number
  values: {
    [key: string]: string | number | boolean | null
  }
  onChange: (values: Store) => void
}

export default function CreateNewOffering(props: ICreateNewOffering) {
  const [offeringTypes, setofferingTypes] = useState([])
  const [formInstance] = Form.useForm()
  const [firstFormVisible, setFirstFormVisible] = useState(true)
  const [secondFormVisible, setSecondFormVisible] = useState(false)

  useEffect(() => {
    ;(async () => {
      const [response] = await getOfferingTypes()
      setofferingTypes(response.data)
    })()
  }, [])

  const handleOk = () => {
    if (firstFormVisible && formInstance.getFieldValue("OfferingTypeID")) {
      onOfferingTypeSelected()
    } else if (secondFormVisible) {
      formInstance.validateFields().then(() => {
        handleCancel()
      })
    }
  }
  const handleCancel = () => {
    props.onClose(false)
  }

  const onOfferingTypeSelected = () => {
    setFirstFormVisible(false)
    setSecondFormVisible(true)
  }

  const goBackToOfferingTypeForm = () => {
    setSecondFormVisible(false)
    setFirstFormVisible(true)
  }

  return (
    <Modal
      title="Create offering"
      visible={props.visible}
      okText="Create"
      maskClosable={false}
      bodyStyle={{ maxHeight: "60vh", overflow: "auto" }}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {firstFormVisible && (
        <CreateForm1
          formInstance={formInstance}
          offeringTypes={offeringTypes}
          onOfferingTypeSelected={onOfferingTypeSelected}
        />
      )}
      {secondFormVisible && (
        <CreateForm2
          formInstance={formInstance}
          onFormSubmission={() => {
            console.log(formInstance)
          }}
          goBackToFirstForm={goBackToOfferingTypeForm}
        />
      )}
    </Modal>
  )
}
