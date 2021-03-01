import { Rule } from "antd/lib/form"
import { IField } from "~/Component/Common/Form/common"
import axios from "axios"
import FormConfigMap from "~/Config/FormMap.json"

export interface IUserFormMetaConfig {
  label?: string
  sortOrder?: number
  placeholder?: string
  ariaLabel?: string
  hidden?: string
  displayKey?: string
  required?: boolean
}

const getUserFormMetaConfig = async (metaName: string): Promise<{ [key: string]: any }> => {
  const _FormConfigMap = FormConfigMap as { [key: string]: string }
  const url = `http://127.0.0.1:8081${_FormConfigMap[metaName]}`
  let userFormMeta: { [key: string]: any } = {}
  try {
    userFormMeta = (await axios.request({ url })).data
  } catch (error) {
    console.log("userFormMeta error ", error)
  }

  if (userFormMeta && Object.keys(userFormMeta).length > 0) {
    Object.keys(userFormMeta).forEach((key: string) => {
      const config = userFormMeta[key]
      if (
        !(
          ("label" in config && typeof config["label"] === "string") ||
          ("sortOrder" in config && typeof config["sortOrder"] === "number") ||
          ("placeholder" in config && typeof config["placeholder"] === "string") ||
          ("ariaLabel" in config && typeof config["ariaLabel"] === "string") ||
          ("hidden" in config && typeof config["hidden"] === "boolean") ||
          ("displayKey" in config && typeof config["displayKey"] === "string") ||
          ("required" in config && typeof config["required"] === "boolean")
        )
      )
        delete userFormMeta[key]
    })
  }
  console.log("userFormMeta ", userFormMeta)
  return Promise.resolve(userFormMeta)
}

const FormMetaShadowingProcessor = (meta: IField[], userMetaConfig: { [key: string]: any }): IField[] => {
  return meta
    .map((x) => {
      if (userMetaConfig[x.fieldName]) {
        const { required, ...others } = userMetaConfig[x.fieldName]
        x = { ...x, ...(others as IField) }
        if (required) {
          const rule: Rule = { required: true, message: `Please input ${x.label}` }
          if (x.rules && x.rules?.length) {
            x.rules.push(rule)
          } else {
            x.rules = [rule]
          }
        } else if (required === false && x.rules && x.rules.length > 0) {
          x.rules = x.rules.filter((r: any) => !r.required)
        }
      }
      return x
    })
    .sort((a, b) => (a.sortOrder || 1000) - (b.sortOrder || 1000))
}

export const processFormMeta = (meta: IField[], metaName: string): Promise<IField[]> => {
  return getUserFormMetaConfig(metaName).then((x) => {
    console.log("x ", x)
    return FormMetaShadowingProcessor(meta, x)
  })
}
