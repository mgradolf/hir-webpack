export interface IBuyer {
  PersonID?: number
  AccountID?: number
  PersonProfile?: { [key: string]: any }
  AccountAffiliation?: any[]

  assignPerson: (PersonID: { [key: string]: any }) => void
}
