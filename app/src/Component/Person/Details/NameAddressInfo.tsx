import { Card } from "antd"
import React from "react"

export function NameAddressInfo({ person }: { person: { [key: string]: any } }) {
  return (
    <>
      <Card title="Address">
        <table style={{ width: "400px" }}>
          <tbody>
            {person.Addresses &&
              Array.isArray(person.Addresses) &&
              person.Addresses.map((x) => (
                <tr>
                  <td>Address {x.SortPosition}</td>
                  <td>
                    <div>
                      <span>Type: {x.AddressTypeDescriptor}</span> <br />
                      {x.AddressLine1 && <span>{x.AddressLine1}</span>}
                      {x.AddressLine2 && <span>, {x.AddressLine2}</span>}
                      {x.AddressLine3 && <span>, {x.AddressLine3}</span>}
                      <br />
                      <span>
                        {x.Locality} {x.CountryDescriptor}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Card>
      <Card title="Email">
        <table style={{ width: "400px" }}>
          <tbody>
            {person.Emails &&
              Array.isArray(person.Emails) &&
              person.Emails.map((x) => (
                <tr>
                  <td>
                    Email {x.SortPosition} ({x.EmailTypeDescriptor})
                  </td>
                  <td>{x.EmailAddress}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </Card>
      <Card title="Telephone">
        <table style={{ width: "400px" }}>
          <tbody>
            {person.Telephones &&
              Array.isArray(person.Telephones) &&
              person.Telephones.map((x) => (
                <tr>
                  <td>
                    Phone {x.SortPosition} ({x.TelephoneTypeDescriptor})
                  </td>
                  <td>{x.TelephoneNumber}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </Card>
    </>
  )
}
