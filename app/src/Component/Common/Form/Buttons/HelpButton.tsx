import React, { CSSProperties, useEffect, useState } from "react"
import { getHelpConfig } from "~/Help/getHelpConfig"
import { QuestionOutlined } from "@ant-design/icons"
import { Button, Tooltip } from "antd"

export function HelpButton(props: { helpKey?: string; skipIcon?: boolean; style?: CSSProperties }) {
  const [helpUrl, setHelpUrl] = useState<string>()

  useEffect(() => {
    getHelpConfig(props.helpKey).then((x) => {
      console.log("this is help key ", props.helpKey)
      console.log(x)
      if (x) setHelpUrl(x)
    })
  }, [props.helpKey])

  return (
    <>
      {helpUrl && (
        <Tooltip title="Help">
          {props.skipIcon ? (
            <Button style={props.style} type="link" shape="circle" onClick={() => window.open(helpUrl)}>
              Help
            </Button>
          ) : (
            <Button
              style={props.style}
              icon={<QuestionOutlined />}
              type="primary"
              shape="circle"
              onClick={() => window.open(helpUrl)}
            />
          )}
        </Tooltip>
      )}
    </>
  )
}
