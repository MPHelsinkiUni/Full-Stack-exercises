import { createContext, useState } from 'react'

const NotificationContext = createContext()

export default NotificationContext

export const NotificationContextProvider = (props) => {
  const [notification, setNotification] = useState('')

  const alert = (message) => setNotification(message)
  const empty = () => setNotification('')

  return (
    <NotificationContext.Provider value={{ notification, alert, empty }}>
      {props.children}
    </NotificationContext.Provider>
  )
}
