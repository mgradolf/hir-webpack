import React from "react"
import { IDataTableProps } from "~/Component/Common/ResponsiveTable"
import { IField } from "~/Component/Common/Form/common"
import SearchListWithHiddenSearchForm from "~/Component/Common/Page/SearchPage/SearchListWithHiddenSearchForm"
import SearchListWithVisibleSearchForm from "~/Component/Common/Page/SearchPage/SearchListWithVisibleSearchForm"
import { RouteComponentProps, useLocation } from "react-router-dom"
import SearchListWithoutSearchForm from "~/Component/Common/Page/SearchPage/SearchListWithoutSearchForm"

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

interface IPage extends Partial<RouteComponentProps> {
  hideSearchField?: boolean
  blocks?: JSX.Element[]
  title: string
  meta?: IField[]
  tableProps: IDataTableProps
  initialFormValue?: any
  defaultFormValue?: any
  helpKey?: string
  stopProducingQueryParams?: boolean
  updatedParams?: (params?: any) => void
}
export function SearchPage(props: IPage) {
  const hideSearchFieldByUrlParam = useQuery().get("hide-search") === "true"
  const { hideSearchField, ...propsToPass } = props
  if (!props.meta) {
    return <SearchListWithoutSearchForm {...propsToPass} />
  }
  if (props.meta && (hideSearchFieldByUrlParam || props.hideSearchField)) {
    return <SearchListWithHiddenSearchForm {...propsToPass} />
  }
  return <SearchListWithVisibleSearchForm {...propsToPass} />
}
