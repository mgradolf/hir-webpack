import React from "react"
import { IDataTableProps } from "~/Component/Common/ResponsiveTable"
import { IField } from "~/Component/Common/Form/common"
import SearchListWithHiddenSearchForm from "~/Component/Common/Page/SearchPage/SearchListWithHiddenSearchForm"
import SearchListWithVisibleSearchForm from "~/Component/Common/Page/SearchPage/SearchListWithVisibleSearchForm"
import { Redirect, RouteComponentProps, useLocation } from "react-router-dom"
import SearchListWithoutSearchForm from "~/Component/Common/Page/SearchPage/SearchListWithoutSearchForm"
import { message } from "antd"

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

interface IPage extends Partial<RouteComponentProps> {
  permission?: boolean
  hideSearchField?: boolean
  blocks?: JSX.Element[]
  title: string
  meta?: IField[]
  tableProps: IDataTableProps
  initialFormValue?: any
  defaultFormValue?: any
  helpUrl?: string
  stopProducingQueryParams?: boolean
  updatedParams?: (params?: any) => void
}
export function SearchPage(props: IPage) {
  const hideSearchFieldByUrlParam = useQuery().get("hide-search") === "true"
  const { hideSearchField, ...propsToPass } = props
  console.log("props.permission ", props.permission)
  if (props.permission === false) {
    setTimeout(() => {
      message.warning(`You dont have permission to access ${props.title}!`)
    }, 0)
    return <Redirect to="/" />
  }
  if (!props.meta) {
    return <SearchListWithoutSearchForm {...propsToPass} />
  }
  if (props.meta && (hideSearchFieldByUrlParam || props.hideSearchField)) {
    return <SearchListWithHiddenSearchForm {...propsToPass} />
  }
  return <SearchListWithVisibleSearchForm {...propsToPass} />
}
