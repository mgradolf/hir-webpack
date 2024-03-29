import React, { useState, useEffect } from "react"
import { Row, Col, Typography, Select } from "antd"
import { ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import { getAffiliationRoleTypes } from "~/ApiServices/BizApi/account/accountIF"
import { getAccountQuestionTableColumns } from "~/TableSearchMeta/AccountQuestion/AccountQuestionTableColumns"
import { HelpButton } from "~/Component/Common/Form/Buttons/HelpButton"
import { ACC_AFFILIATED } from "~/utils/Constants"

interface IAccountQuestionTabProp {
  AccountID: number
}

export default function AccountQuestionTab(props: IAccountQuestionTabProp) {
  const [roleTypeID, setRoleTypeID] = useState<number>()
  const [affiliationRoleTypes, setAffilationRoleTypes] = useState<Array<any>>([])

  useEffect(() => {
    ;(async () => {
      const response = await getAffiliationRoleTypes({ AccountTypeID: ACC_AFFILIATED, IsActive: true })
      if (response && response.success && response.data) {
        setAffilationRoleTypes(response.data)
      }
    })()
  }, [])

  return (
    <>
      <Row justify="end">
        <HelpButton helpKey="accountQuestionsTab" />
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ marginBottom: "10px" }}>
        <Col className="gutter-row" xs={24} sm={24} md={4}>
          <Typography.Title level={4} style={{ paddingTop: ".5rem", paddingBottom: ".5rem", paddingLeft: ".5rem" }}>
            Affiliation Role Type
          </Typography.Title>
        </Col>
        <Col
          className={`gutter-row`}
          style={{ paddingTop: ".5rem", paddingBottom: ".5rem", textAlign: "left" }}
          xs={24}
          sm={24}
          md={8}
        >
          {affiliationRoleTypes.length > 0 && (
            <Select
              style={{ width: "250px" }}
              showSearch
              placeholder="Select role type"
              optionFilterProp="children"
              onChange={(e: any) => setRoleTypeID(e)}
            >
              {affiliationRoleTypes.map((x) => {
                return (
                  <Select.Option key={x.AffiliationRoleTypeID} value={x.AffiliationRoleTypeID}>
                    {x.Name}
                  </Select.Option>
                )
              })}
            </Select>
          )}
        </Col>
      </Row>

      {roleTypeID && (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={"padding-top-10"}>
          <Col className="gutter-row" xs={24} sm={24} md={{ span: 24, offset: 0 }}>
            <ResponsiveTable
              pagination={false}
              searchParams={{ AffiliationRoleTypeID: roleTypeID }}
              {...getAccountQuestionTableColumns(false)}
              refreshEventName={"REFRESH_ACCOUNT_QUESTION_TAB"}
              style={{ paddingTop: "10px" }}
            />
          </Col>
        </Row>
      )}
    </>
  )
}
