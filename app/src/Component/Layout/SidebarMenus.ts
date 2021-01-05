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
          { title: "Accounts", url: "/account", submenu: [] },
          { title: "Forget Me Requests", url: "/forget-me-request", submenu: [] }
        ]
      },
      // { title: "Accounts", url: "/account", submenu: [] },
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
          { title: "Order Credits", url: "/order/credits", submenu: [] },
          { title: "Payments", url: "/order/payments", submenu: [] },
          { title: "Transactions", url: "/transaction", submenu: [] }
          // { title: "Discount Programs", url: "/discount-programs", submenu: [] }
        ]
      },
      { title: "Requests", url: "/request", submenu: [] },
      {
        title: "Questions",
        url: "",
        submenu: [
          { title: "Repository", url: "/question", submenu: [] },
          { title: "Tagging", url: "/question/tagging", submenu: [] },
          { title: "Responses", url: "/question/response", submenu: [] }
        ]
      },
      {
        title: "Marketing",
        url: "",
        submenu: [
          { title: "Catalogs", url: "/catalog", submenu: [] },
          { title: "Discount Programs", url: "/discount-programs", submenu: [] },
          { title: "Codes", url: "/marketing-codes/repository", submenu: [] },
          { title: "Response", url: "/marketing-codes/response", submenu: [] }
        ]
      },
      { title: "Products", url: "/product", submenu: [] },
      { title: "Tags", url: "/tags", submenu: [] },
      { title: "Batches", url: "", submenu: [] }
    ]
  },
  {
    title: "Discovery",
    url: "",
    submenu: [
      { title: "Reports", url: "/report", submenu: [] },
      { title: "Charts", url: "/chart", submenu: [] },
      { title: "Mail Merge", url: "", submenu: [] },
      {
        title: "Analysis",
        url: "",
        submenu: [
          { title: "Discount Analyzer", url: "", submenu: [] },
          { title: "Master P & L Calculator", url: "", submenu: [] }
        ]
      },
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
          },
          {
            title: "Financial",
            url: "",
            submenu: [
              { title: "Credits", url: "", submenu: [] },
              { title: "Payment Dues", url: "", submenu: [] },
              { title: "Agent Enrollment Revenue", url: "", submenu: [] }
            ]
          },
          {
            title: "Activity",
            url: "",
            submenu: [
              { title: "Student Academic", url: "/search/activity/academic-log", submenu: [] },
              { title: "Student Enrollment", url: "/search/activity/enrollment-log", submenu: [] },
              { title: "Enrollment History", url: "/search/activity/enrollment-history", submenu: [] },
              { title: "Order Activity", url: "/search/activity/order-log", submenu: [] }
            ]
          },
          {
            title: "System",
            url: "",
            submenu: [
              { title: "Gateway Activity", url: "", submenu: [] },
              { title: "System Schedule", url: "", submenu: [] }
            ]
          }
        ]
      }
    ]
  },
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
    title: "Setup/Administration",
    url: "",
    submenu: [
      {
        title: "Course",
        url: "",
        submenu: [
          { title: "Offering Type", url: "", submenu: [] },
          { title: "Section Type", url: "", submenu: [] }
        ]
      },
      {
        title: "Locations",
        url: "",
        submenu: [
          { title: "Building", url: "", submenu: [] },
          { title: "Site", url: "", submenu: [] }
        ]
      },
      { title: "Certificates", url: "", submenu: [] },
      { title: "Marketing Programs", url: "", submenu: [] },
      { title: "Resources", url: "", submenu: [] },
      { title: "Grade Score Definitions", url: "", submenu: [] },
      { title: "Reference Data", url: "", submenu: [] },
      {
        title: "Organization",
        url: "",
        submenu: [
          { title: "Setup", url: "", submenu: [] },
          { title: "Calender", url: "", submenu: [] }
        ]
      },
      { title: "Configuration Management", url: "", submenu: [] },
      { title: "Users", url: "", submenu: [] }
    ]
  }
]
