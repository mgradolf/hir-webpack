import React, { useEffect, useState } from "react"
import Modal from "~/component/Modal"
import { Card } from "antd"

export default function Offline() {
  const [IsOffline, setIsOffline] = useState(!navigator.onLine)
  useEffect(() => {
    window.addEventListener("online", setIsOffline.bind(null, false))
    window.addEventListener("offline", setIsOffline.bind(null, true))
    return () => {
      window.removeEventListener("online", setIsOffline.bind(null, false))
      window.removeEventListener("offline", setIsOffline.bind(null, true))
    }
  }, [])
  return (
    <React.Fragment>
      {IsOffline && (
        <Modal>
          <Card bordered={true}>
            <Card.Meta
              title="No Internet Connection"
              description="You are offline. Please check your internet connection"
            />
          </Card>
        </Modal>
      )}
    </React.Fragment>
  )
}
