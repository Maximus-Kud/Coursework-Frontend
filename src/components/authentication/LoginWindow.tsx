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

  handleLogin: () => void,

  openRegister: () => void,

  closeLogin: () => void,
}





function LoginWindow(props: Props) {
  return (
    <div className='register-and-login-window'>
      <div className="title">Login</div>
      
      <div className='inputs'>
        <input type='text' placeholder='Username' value={props.username} onChange={e => props.setUsername(e.target.value)}></input>
        <input type='text' placeholder='Email' value={props.email} onChange={e => props.setEmail(e.target.value)}></input>
        <input type='password' placeholder='Password' value={props.password} onChange={e => props.setPassword(e.target.value)}></input>
      </div>

      <button className="action-button" onClick={props.handleLogin}>Login</button>

      <div className="link">Don't have an account? <span className='redirect' onClick={props.openRegister}>Register</span></div>

      
      {props.inlineNotification && (
        <InlineNotification
          notification={props.inlineNotification}
          closeAllNotifications={props.clearAllNotifications}
        />
      )}

      <svg className='close-button' onClick={props.closeLogin} width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.293 5.293a1 1 0 0 1 1.414 0L12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 0 1 0-1.414z" fill="#0D0D0D"/></svg>
    </div>
  )
}


export default LoginWindow;