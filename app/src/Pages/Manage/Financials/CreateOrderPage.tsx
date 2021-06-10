import { Col, Dropdown, Menu, Row } from "antd"
import React, { useEffect, useState } from "react"
import { CartTable } from "~/Component/Feature/Order/CartTable"
import { CartModelFunctionality } from "~/Component/Feature/Order/Model/CartModelFunctionality"
import { IBuyer, IItemRequest } from "~/Component/Feature/Order/Model/Interface/IModel"
import { SelectBuyer } from "~/Component/Feature/Order/SelectBuyer"
import { AddSectionModal } from "~/Component/Feature/Order/Shop/AddSectionModal"
import { eventBus } from "~/utils/EventBus"

export const UPDATE_CART = "UPDATE_CART"
export const UPDATE_BUYER = "UPDATE_BUYER"
export const UPDATE_CART_ITEM_BY_REQUESTID = "UPDATE_CART_ITEM_BY_REQUESTID"

export default function CreateOrderPage() {
  const [buyer, setBuyer] = useState<IBuyer>({})
  const [ItemList, setItemList] = useState<IItemRequest[]>([])
  const [cartModelFunctionality] = useState(new CartModelFunctionality())

  useEffect(() => {
    setItemList([
      {
        RequestID: 606483311526822030,
        ItemType: "RegistrationRequest",
        ItemRequestType: "RegistrationRequest",
        PaymentAmount: 1000.0,
        PaymentGatewayAccountID: 9,
        TranscriptCreditTypeID: 2002,
        ItemTypeID: 1,
        RecipientPersonID: 14889,
        UnitPrice: 1000.0,
        StatusDate: "2021-06-09T12:02:54+06:00",
        GradeScaleTypeID: 2044,
        ItemQuantity: 1,
        ItemName: "SMT.(3) SMT Offering",
        AccessContext: null,
        AnswerMap: null,
        AttendanceExpected: null,
        SectionID: 10852,
        SeatGroupID: 11562,
        OfferingID: 6824,
        RecipientPersonName: "0507, nargis",
        SeatGroups: [
          {
            IsDefault: false,
            AccountID: 4813,
            ReservedSeats: 0,
            TotalSeats: 10,
            SectionID: 8885,
            SeatGroupID: 11933,
            SeatGroupName: "aarosh",
            AvailableSeats: 10
          },
          {
            IsDefault: true,
            AccountID: null,
            ReservedSeats: 122,
            TotalSeats: 123,
            SectionID: 8885,
            SeatGroupID: 9178,
            SeatGroupName: "Default seat group",
            AvailableSeats: 1
          },
          {
            IsDefault: false,
            AccountID: null,
            ReservedSeats: 2,
            TotalSeats: 500,
            SectionID: 8885,
            SeatGroupID: 9638,
            SeatGroupName: "j2ee",
            AvailableSeats: 498
          }
        ],
        issues: {
          RegistrationCheck_passed: false,
          DuplicateRequestCheck_passed: false,
          SectionValidityCheck_passed: false,

          // RegistrationCheck_passed: true,
          // DuplicateRequestCheck_passed: true,
          // SectionValidityCheck_passed: true,
          check_sectionvalidity_issues: [],
          check_prerequisiteconflict_conflicts: [
            {
              Status: "NOT-TAKEN",
              SectionNumber: null,
              CreditHours: null,
              StatusID: null,
              OfferingCode: "COMP-101",
              Grade: null,
              OfferingName: "Java Programming I",
              SectionID: null,
              OfferingID: 5576
            }
          ],
          RegistrationQuestionCheck_passed: false,
          ScheduleConflict_passed: false,
          StudentOnHoldCheck_passed: false,
          PrerequisiteCheck_passed: false,
          check_scheduleconflict_conflicts: [{ SectionNumber: "COMP-201.(1)" }]
        },
        OverrideData: {
          SectionPrerequisiteCheck: false,
          StudentOnHoldCheckWithMessage: false,
          StudentOnHoldCheck: false,
          ScheduleConflictCheck: false,
          AnswerQuestion: false
        }
      } as IItemRequest
    ])
    eventBus.subscribe(UPDATE_CART, (ItemList: IItemRequest[]) => {
      console.log("UPDATE_CART ", ItemList)
      setItemList(ItemList)
      eventBus.publish("REFRESH_CART_TABLE")
    })
    eventBus.subscribe(UPDATE_BUYER, (buyer: IBuyer) => {
      setBuyer(buyer)
      eventBus.publish("REFRESH_CART_TABLE")
    })
    return () => {
      eventBus.unsubscribe("UPDATE_CART")
    }
  }, [])
  return (
    <div className="site-layout-content">
      <div style={{ backgroundColor: "white", padding: "10px" }}>
        <Row justify="center">
          <Col span={18}>
            <SelectBuyer buyer={buyer} cartModelFunctionality={cartModelFunctionality} />
          </Col>
        </Row>
        <Row justify="end">
          <Col>
            <Dropdown.Button
              overlay={
                <Menu>
                  <Menu.Item>
                    <AddSectionModal
                      sectionAddType="buy"
                      buyer={buyer}
                      itemList={ItemList}
                      cartModelFunctionality={cartModelFunctionality}
                    />
                  </Menu.Item>
                  {buyer.PersonID && (
                    <Menu.Item>
                      <AddSectionModal
                        sectionAddType="me"
                        buyer={buyer}
                        itemList={ItemList}
                        cartModelFunctionality={cartModelFunctionality}
                      />
                    </Menu.Item>
                  )}
                  {buyer.PersonID && (
                    <Menu.Item>
                      <AddSectionModal
                        sectionAddType="others"
                        buyer={buyer}
                        itemList={ItemList}
                        cartModelFunctionality={cartModelFunctionality}
                      />
                    </Menu.Item>
                  )}
                </Menu>
              }
              type="primary"
            >
              Add Items
            </Dropdown.Button>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <CartTable itemList={ItemList} cartModelFunctionality={cartModelFunctionality} />
          </Col>
        </Row>
      </div>
    </div>
  )
}
