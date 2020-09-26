import { Form, Input } from "antd"
import { FormItemProps } from "antd/lib/form"
import { InputProps } from "antd/lib/input"
import { InputState } from "antd/lib/input/Input"
import React from "react"

interface ITextInput {
  item: FormItemProps
  input: InputProps | InputState
}

export default function TextInput(props: ITextInput) {
  return (
    <Form.Item {...props.item}>
      <Input {...props.input} />
    </Form.Item>
  )
}
