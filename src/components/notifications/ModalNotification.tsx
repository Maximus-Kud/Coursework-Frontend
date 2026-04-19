import type { AppNotification } from "../../types/Notification";



type Props = {
  notification: AppNotification,
  closeAllNotifications: () => void,
}



function ModalNotification(props: Props) {
  return (
    <div className={`modal-notification ${props.notification.type}`} onClick={props.closeAllNotifications}>
      {props.notification.type === 'info' && 'ℹ️ '}
      {props.notification.type === 'success' && '✅ '}
      {props.notification.type === 'warning' && '⚠️ '}
      {props.notification.type === 'error' && '❌ '}
      
      {props.notification.message}
    </div>
  )
}

export default ModalNotification;