import React from "react"
import { Link } from "react-router-dom"
import { ReadOutlined } from "@ant-design/icons"
import moment from "moment"
import { DATE_FORMAT, DATE_TIME_FORMAT, TIME_FORMAT } from "~/utils/Constants"

const renderDetailsLink = (url: string): JSX.Element => {
  return (
    <Link to={url}>
      <ReadOutlined />
    </Link>
  )
}
const renderLink = (url: string, text: string, isModal?: boolean) =>
  !isModal ? <Link to={url}>{text}</Link> : <span>{`${text}`}</span>
const renderDecimal = (text: any) => (typeof text === "number" && !isNaN(Number(text)) ? Number(text).toFixed(2) : text)
const renderEmail = (text: any): JSX.Element => (text !== null ? <a href={`mailto:${text}`}>{text}</a> : <></>)
const renderDate = (text: any) => (text !== null ? moment(text).format(DATE_FORMAT) : "")
const renderDateTime = (text: any) => (text !== null ? moment(text).format(DATE_TIME_FORMAT) : "")
const renderTime = (text: any) => (text !== null ? moment(text).format(TIME_FORMAT) : "")
const renderAmount = (text: any) => (text !== null ? (text = `$ ${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")) : "")
const renderBoolean = (text: any) => {
  if (typeof text === "boolean") {
    return text ? "Yes" : "No"
  } else return ""
}

const renderWeek = (text: any[], record: any) => {
  const weeks: string[] = ["Monday", "TuesDay", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  return text && Array.isArray(text) && weeks.filter((x, i) => text.includes(i + 1))
}

const sortByBoolean = (a: boolean, b: boolean) => (a === b ? 0 : a ? -1 : 1)
const sortByString = (a: string, b: string) => a.localeCompare(b)
const sortByTime = (a?: string, b?: string) => {
  const aa = a ? new Date(a).getTime() : 0
  const bb = b ? new Date(b).getTime() : 0

  return aa === bb ? 0 : aa ? -1 : 1
}
const sortByNumber = (a?: number, b?: number) => {
  return (a || 0) > (b || 0) ? -1 : 1
}

export {
  renderDetailsLink,
  renderLink,
  renderDecimal,
  renderEmail,
  renderDate,
  renderDateTime,
  renderTime,
  renderBoolean,
  renderAmount,
  renderWeek,
  sortByBoolean,
  sortByString,
  sortByTime,
  sortByNumber
}
