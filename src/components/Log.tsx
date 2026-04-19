import type { ApplicationUser } from "../types/ApplicationUser";

type Props = {
  date: string,
  logLevel: string,
  user: ApplicationUser,
  role: string,
  description: string,
  details: string,
}



function Log(props: Props) {
  return (
    <div className="log">
      <div className="date">{props.date}</div>
      <div className="log-level">{props.logLevel}</div>
      <div className="user">{props.user.username}</div>
      <div className="role">{props.role}</div>
      <div className="description">{props.description}</div>
      <div className="details">{props.details}</div>
    </div>
  )
}


export default Log;