import React, { useEffect, useState } from "react"
import { getHelpConfig } from "~/Help/getHelpConfig"
import { QuestionOutlined } from "@ant-design/icons"
import { Button, Tooltip } from "antd"

export function HelpButton(props: { helpKey?: string }) {
  const [helpUrl, setHelpUrl] = useState<string>()

  useEffect(() => {
    getHelpConfig(props.helpKey).then((x) => {
      if (x) setHelpUrl(x)
    })
  }, [props.helpKey])

  return (
    <>
      {helpUrl && (
        <Tooltip title="Help">
          <Button icon={<QuestionOutlined />} type="primary" shape="circle" onClick={() => window.open(helpUrl)} />
        </Tooltip>
      )}
    </>
  )
}
