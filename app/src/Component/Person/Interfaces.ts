export interface IPersonFieldNames {
  Roles: any
  FirstName: any
  LastName: any
  Birthday: any
  EmailAddress: any
  TelephoneNumber: any
  AddressLine1: any
  AddressLine2: any
  AddressLine3: any
  Locality: any
  PostalCode: any
  RegionCodeID: any
  CountryCodeID: any
}

export interface IPersonBasicFieldNames {
  PersonID: any
  Prefix: any
  FirstName: any
  LastName: any
  Suffix: any
  MiddleName: any
  MaidenName: any
  OtherName: any
}

export interface IPersonAddressFieldNames {
  PersonID: any
  PersonAddressID: any
  AddressTypeID: any
  AddressLine1: any
  AddressLine2: any
  AddressLine3: any
  Locality: any
  PostalCode: any
  RegionCodeID: any
  CountryCodeID: any
  IsConfidential: any
}

export interface IPersonAccountFieldNames {
  AccountAffiliationID: any
  AccountID: any
  PersonID: any
  StatusID: any
  AffiliationRoleTypeID: any
  IsContactShared: any
  AsnwerList: any
}
