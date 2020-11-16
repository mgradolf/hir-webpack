import React from "react"
import { Link } from "react-router-dom"

import { findRegistrations } from "~/ApiServices/Service/RegistrationService"
import SearchPage from "~/Component/Common/Page/SearchPage"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { IFilterField } from "~/Component/Common/SearchFilters/common"
import { SectionLookupOpenButton } from "~/Component/LookupModals/SectionLookupModal"

export default function SectionCatalog() {
  const columns: TableColumnType = [
    {
      title: "ID",
      dataIndex: "StudentSerialNumber",
      render: (text: any, record: any) => (
        <Link to={`/section/${record.SectionID}/registration/${record.StudentID}`}>{record.StudentSerialNumber}</Link>
      ),
      width: 100
    },
    {
      title: "Name",
      dataIndex: "StudentName",
      render: (text: any, record: any) => <Link to={`/person/student/${record.StudentID}`}>{record.StudentName}</Link>,
      width: 150,
      ellipsis: true
    },
    {
      title: "Grade Scale",
      dataIndex: "GradeScaleType",
      width: 150,
      ellipsis: true
    },
    {
      title: "Transcript Credit",
      dataIndex: "TranscriptCreditType",
      width: 150,
      ellipsis: true
    },
    {
      title: "Repeat/Retake",
      dataIndex: "IsRepeat",
      width: 150,
      ellipsis: true
    },
    {
      title: "Seat Group",
      dataIndex: "SeatGroup",
      width: 150,
      ellipsis: true
    },
    {
      title: "Source",
      dataIndex: "Source",
      width: 150,
      ellipsis: true
    },
    {
      title: "Status in Section",
      dataIndex: "SectionRosterStatusCodeName",
      width: 150,
      ellipsis: true
    },
    {
      title: "Completion Date",
      dataIndex: "CompletionDate",
      width: 150,
      ellipsis: true
    },
    {
      title: "GPA Value",
      dataIndex: "GPAValue",
      width: 150,
      ellipsis: true
    },
    {
      title: "Attempted Hours",
      dataIndex: "AttemptedHours",
      width: 150,
      ellipsis: true
    },
    {
      title: "Earned Hours",
      dataIndex: "EarnedHours",
      width: 150,
      ellipsis: true
    },
    {
      title: "GPA Hours",
      dataIndex: "GPAHours",
      width: 150,
      ellipsis: true
    },
    {
      title: "CEU Hours",
      dataIndex: "CEUHours",
      width: 150,
      ellipsis: true
    },
    {
      title: "Expected Attendance",
      dataIndex: "AttendanceExpected",
      width: 150,
      ellipsis: true
    },
    {
      title: "Attendance Actual",
      dataIndex: "AttendanceActual",
      width: 150,
      ellipsis: true
    }
  ]

  // const expandableRowData = (data: any, mobileView: boolean): JSX.Element => {
  //   const generatedValue = [
  //     {
  //       title: "Grade Scale",
  //       value: data["GradeScaleType"]
  //     },
  //     {
  //       title: "Transcript Credit",
  //       value: data["TranscriptCreditType"]
  //     },
  //     {
  //       title: "Repeat/Retake",
  //       value: data["IsRepeat"]
  //     },
  //     {
  //       title: "Seat Group",
  //       value: data["SeatGroup"]
  //     },
  //     {
  //       title: "Source",
  //       value: data["Source"]
  //     },
  //     {
  //       title: "Status in Section",
  //       value: data["SectionRosterStatusCodeName"]
  //     },
  //     {
  //       title: "Completion Date",
  //       value: data["CompletionDate"]
  //     },
  //     {
  //       title: "GPA Value",
  //       value: data["GPAValue"]
  //     },
  //     {
  //       title: "Attempted Hours",
  //       value: data["AttemptedHours"]
  //     },
  //     {
  //       title: "Earned Hours",
  //       value: data["EarnedHours"]
  //     },
  //     {
  //       title: "GPA Hours",
  //       value: data["GPAHours"]
  //     },
  //     {
  //       title: "CEU Hours",
  //       value: data["CEUHours"]
  //     },
  //     {
  //       title: "Expected Attendance",
  //       value: data["AttendanceExpected"]
  //     },
  //     {
  //       title: "Attendance Actual",
  //       value: data["AttendanceActual"]
  //     }
  //   ]
  //   return (
  //     <ul>
  //       {generatedValue.map((x, i) => {
  //         return (
  //           <>
  //             {x.value && (
  //               <li key={i}>
  //                 <span>{x.title} : </span>
  //                 <span> {x.value}</span>
  //               </li>
  //             )}
  //           </>
  //         )
  //       })}
  //     </ul>
  //   )
  // }

  const registrationMeta: IFilterField[] = [
    {
      label: "Section Lookup",
      fieldName: "SectionID",
      customFilterComponent: SectionLookupOpenButton
    }
  ]
  return (
    <SearchPage
      title="Registrations"
      initialFilter={{}}
      meta={registrationMeta}
      hideSearchField={false}
      tableProps={{
        columns: columns,
        searchFunc: findRegistrations,
        bordered: true,
        responsiveColumnIndices: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        expandableColumnIndices: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        // responsiveColumnIndices: [1, 2, 3],
        // expandableRowRender: expandableRowData,
        pagination: { position: ["topLeft"], pageSize: 20 }
      }}
    ></SearchPage>
  )
}
