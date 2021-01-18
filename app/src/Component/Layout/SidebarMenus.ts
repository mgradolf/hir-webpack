export interface ISidebarMenu {
  title: string
  url: string
  submenu: ISidebarMenu[]
}

export const sidebarMenus: ISidebarMenu[] = [
  {
    title: "Manage",
    url: "",
    submenu: [
      {
        title: "Constituents",
        url: "",
        submenu: [
          { title: "Persons", url: "/person", submenu: [] },
          { title: "Students", url: "/student", submenu: [] },
          { title: "Instructors", url: "/instructor", submenu: [] },
          { title: "Accounts", url: "/account", submenu: [] }
        ]
      },
      {
        title: "Courses",
        url: "",
        submenu: [
          { title: "Offerings ", url: "/offering", submenu: [] },
          { title: "Sections", url: "/section", submenu: [] },
          { title: "Registrations", url: "/registration", submenu: [] },
          { title: "Certificates", url: "/course/certificate", submenu: [] },
          { title: "Waitlist Entries", url: "/waitlist", submenu: [] }
        ]
      },
      {
        title: "Programs",
        url: "",
        submenu: [
          { title: "Offerings", url: "/program/offering", submenu: [] },
          { title: "Programs", url: "/program/program", submenu: [] },
          { title: "Applications", url: "/program/application", submenu: [] },
          { title: "Certificates", url: "/program/certificate", submenu: [] },
          { title: "Enrollments", url: "/program/enrollment", submenu: [] }
        ]
      },
      {
        title: "Financials",
        url: "",
        submenu: [
          { title: "Order", url: "/order", submenu: [] },
          { title: "Order Items", url: "/order/items", submenu: [] },
          { title: "Credits", url: "/order/credits", submenu: [] },
          { title: "Payments", url: "/order/payments", submenu: [] },
          { title: "Transactions", url: "/transaction", submenu: [] }
        ]
      },
      { title: "Requests", url: "/request", submenu: [] },
      { title: "Membership", url: "/membership", submenu: [] },
      {
        title: "Questions",
        url: "",
        submenu: [
          { title: "Repository", url: "/question", submenu: [] },
          { title: "Responses", url: "/question/response", submenu: [] }
        ]
      },
      {
        title: "Marketing",
        url: "",
        submenu: [
          { title: "Catalogs", url: "/catalog", submenu: [] },
          { title: "Discount Programs", url: "/discount-program", submenu: [] },
          { title: "Programs", url: "/marketing-programs", submenu: [] },
          { title: "Codes", url: "/marketing-codes/repository", submenu: [] },
          { title: "Response", url: "/marketing-codes/response", submenu: [] }
        ]
      },
      { title: "Resources", url: "/resource", submenu: [] },
      { title: "Products", url: "/product", submenu: [] },
      { title: "Packages", url: "/package", submenu: [] },
      { title: "Tags", url: "/tags", submenu: [] },
      { title: "Batches", url: "/batch", submenu: [] }
    ]
  },
  {
    title: "Discovery",
    url: "",
    submenu: [
      { title: "Reports", url: "/report", submenu: [] },
      { title: "Charts", url: "/chart", submenu: [] },
      { title: "Queries", url: "", submenu: [] },
      { title: "Master P & L Calculator", url: "", submenu: [] },
      {
        title: "Search",
        url: "",
        submenu: [
          {
            title: "Sections",
            url: "",
            submenu: [
              { title: "Section Instructors", url: "", submenu: [] },
              { title: "Section Schedule and Location", url: "", submenu: [] }
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Administration",
    url: "",
    submenu: [
      {
        title: "Tools",
        url: "",
        submenu: [
          { title: "Data Import Service (DIS)", url: "", submenu: [] },
          { title: "Job Schedule", url: "", submenu: [] },
          { title: "Student Email Notification", url: "", submenu: [] }
        ]
      },
      {
        title: "Data",
        url: "",
        submenu: [
          { title: "Offering Type", url: "", submenu: [] },
          { title: "Section Type", url: "", submenu: [] },
          { title: "Building", url: "", submenu: [] },
          { title: "Site", url: "", submenu: [] },
          { title: "Grade Score Definitions", url: "", submenu: [] },
          { title: "Reference Data", url: "", submenu: [] },
          { title: "Organizations", url: "/organization", submenu: [] },
          { title: "Certificates", url: "", submenu: [] }
        ]
      },
      { title: "Users", url: "/user", submenu: [] },
      { title: "Forget Me Requests", url: "/forget-me-request", submenu: [] },
      { title: "Configuration Management", url: "", submenu: [] },
      {
        title: "Audits",
        url: "",
        submenu: [
          { title: "Gateway Activity", url: "/gateway-activity", submenu: [] },
          { title: "System Schedule", url: "", submenu: [] }
        ]
      }
    ]
  }
]
