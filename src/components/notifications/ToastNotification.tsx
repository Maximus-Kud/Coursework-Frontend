import type { AppNotification } from "../../types/Notification";



type Props = {
  notification: AppNotification,
  closeAllNotifications: () => void,
}



function ToastNotification(props: Props) {
  return (
    <div className={`toast-notification ${props.notification.type}`} onClick={props.closeAllNotifications}>
      {props.notification.type === 'info' && 'ℹ️ '}
      {props.notification.type === 'success' && '✅ '}
      {props.notification.type === 'warning' && '⚠️ '}
      {props.notification.type === 'error' && '❌ '}
      
      {props.notification.message}

      <div className="toast-progress" onAnimationEnd={props.closeAllNotifications}></div>
    </div>
  )
}

export default ToastNotification;