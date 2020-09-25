import React from "react"
import { Card, Button } from "antd"

interface ISectionEditProps {
  handleCancel: () => void
  handleSubmit: (param: { [key: string]: any }) => void
}

export default function SectionDetails(props: ISectionEditProps) {
  const actions = []
  actions.push(<Button onClick={props.handleCancel}>Cancel</Button>)
  actions.push(<Button onClick={props.handleSubmit}>Save</Button>)
  return <Card actions={actions}>Content of Tab Pane 1</Card>
}
