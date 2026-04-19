import type { AppNotification } from "../../types/Notification";
import InlineNotification from "../notifications/InlineNotification";

type Props = {
  username: string,
  setUsername: (newUsername: string) => void,

  email: string,
  setEmail: (newUsername: string) => void,

  password: string,
  setPassword: (newUsername: string) => void,

  inlineNotification: AppNotification | null,
  clearAllNotifications: () => void,

  handleRegister: () => void,

  openLogin: () => void,

  closeRegister: () => void,
}





function RegisterWindow(props: Props) {
  return (
    <div className='register-and-login-window'>
      <div className="title">Registration</div>
      
      <div className='inputs'>
        <input type='text' placeholder='Username' value={props.username} onChange={e => props.setUsername(e.target.value)} />
        <input type='text' placeholder='Email' value={props.email} onChange={e => props.setEmail(e.target.value)} />
        <input type='password' placeholder='Password' value={props.password} onChange={e => props.setPassword(e.target.value)} />
      </div>

      <button className="action-button" onClick={props.handleRegister}>Register</button>

      <div className="link">Already have an account? <span className='redirect' onClick={props.openLogin}>Login</span></div>

      
      {props.inlineNotification && (
        <InlineNotification
          notification={props.inlineNotification}
          closeAllNotifications={props.clearAllNotifications}
        />
      )}

      <svg className='close-button' onClick={props.closeRegister} width="800px" height="800px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.293 5.293a1 1 0 0 1 1.414 0L12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 0 1 0-1.414z"/></svg>
    </div>
  )
}


export default RegisterWindow;