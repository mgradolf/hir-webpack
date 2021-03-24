import React, { useEffect, useState } from "react"
import { Button } from "antd"
import { getHelpConfig } from "~/Help/getHelpConfig"

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
        <Button type="link" onClick={() => window.open(helpUrl)}>
          help
        </Button>
      )}
    </>
  )
}
