import { getUsername } from "@packages/api/lib/utils/UserInfoStore"
import { Avatar, Card } from "antd"
import { UserOutlined, MailOutlined } from "@ant-design/icons"
import React, { useEffect, useState } from "react"
import { getUserByUserLogin } from "~/ApiServices/Service/HRUserService"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"

export default function Home() {
  const [userInfo, setUserInfo] = useState<{ [key: string]: any }>()
  const loadUserInfo = () => {
    getUserByUserLogin({ UserLogin: getUsername() }).then((x) => {
      if (x.success) setUserInfo(x.data)
    })
  }
  useEffect(() => {
    eventBus.subscribe(REFRESH_PAGE, loadUserInfo)
    eventBus.publish(REFRESH_PAGE)
    return () => {
      eventBus.unsubscribe(REFRESH_PAGE)
    }
  }, [])
  return (
    <>
      {userInfo && (
        <Card title="Logged in as">
          <Card.Meta
            avatar={<Avatar icon={<UserOutlined />} />}
            title={userInfo.FormattedName}
            description={
              <>
                {" "}
                <MailOutlined />
                <span style={{ marginLeft: "10px" }}>{userInfo.EmailAddress}</span>
              </>
            }
          />
        </Card>
      )}
    </>
  )
}
