import { useState } from "react";
import { marketplaceGetLogs } from "../../services/api";
import parseError from "../../services/helper";
import type { NotificationType } from "../../types/Notification";
import type { LogType } from "../../types/logs/LogType";
import Log from "../Log";



type Props = {
  showModalNotification: (newMessage: string, type?: NotificationType) => void,
  logWindowClose: () => void,
}



function LogsWindow(props: Props) {
  const [logs, setLogs] = useState<LogType[]>([]);



  const handleGetLogs = async () => {
    try {
      const returnLogs = await marketplaceGetLogs();
      setLogs(returnLogs);
    }
    catch (e) {
      props.showModalNotification(parseError(e), 'error');
    }
  }



  return (
    <div id="logs-window">
      <div id="logs-title">Logs</div>
      <div style={{color: '#ffffff', display: 'flex', justifyContent: 'center'}}>Big Brother is watching you</div>
      
      <div id="logs">
        {logs.length > 0 ? logs.map((log, index) => (
          <div className="log">
            <Log
              key={index}
              date={log.date}
              logLevel={log.logLevel}
              user={log.user}
              role={log.role}
              description={log.description}
              details={log.details}
            />
          </div>
        )) : <button onClick={handleGetLogs} id="load-logs-button">Load logs</button>}
      </div>

      <svg className='close-button close-logs' onClick={props.logWindowClose} width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.293 5.293a1 1 0 0 1 1.414 0L12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 0 1 0-1.414z" fill="#0D0D0D"/></svg>
    </div>
  )
}


export default LogsWindow;