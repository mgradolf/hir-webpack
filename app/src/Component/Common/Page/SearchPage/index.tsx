import React, { useEffect, useState } from "react"
import { IDataTableProps } from "~/Component/Common/ResponsiveTable"
import { IField } from "~/Component/Common/Form/common"
import SearchListWithHiddenSearchForm from "~/Component/Common/Page/SearchPage/SearchListWithHiddenSearchForm"
import SearchListWithVisibleSearchForm from "~/Component/Common/Page/SearchPage/SearchListWithVisibleSearchForm"
import { RouteComponentProps, useLocation } from "react-router-dom"
import SearchListWithoutSearchForm from "~/Component/Common/Page/SearchPage/SearchListWithoutSearchForm"
import { getHelpConfig } from "~/Help/getHelpConfig"

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

interface IPage extends Partial<RouteComponentProps> {
  hideSearchField?: boolean
  blocks?: JSX.Element[]
  title: string
  meta?: IField[]
  metaName?: string
  tableProps: IDataTableProps
  initialFormValue?: any
  defaultFormValue?: any
  helpKey?: string
  stopProducingQueryParams?: boolean
  updatedParams?: (params?: any) => void
}
export function SearchPage(props: IPage) {
  const [helpUrl, setHelpUrl] = useState<string>()
  const hideSearchFieldByUrlParam = useQuery().get("hide-search") === "true"
  const { hideSearchField, ...propsToPass } = props

  useEffect(() => {
    getHelpConfig(props.helpKey).then((x) => {
      if (x) setHelpUrl(x)
    })
  }, [props.helpKey])

  if (!props.meta) {
    return <SearchListWithoutSearchForm {...propsToPass} helpUrl={helpUrl} />
  }
  if (props.meta && (hideSearchFieldByUrlParam || props.hideSearchField)) {
    return <SearchListWithHiddenSearchForm {...propsToPass} helpUrl={helpUrl} />
  }
  return <SearchListWithVisibleSearchForm {...propsToPass} helpUrl={helpUrl} />
}
