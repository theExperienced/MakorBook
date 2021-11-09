import { useState, useEffect } from 'react';

const useSocket = (URI) => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const ws = new WebSocket(URI);
    ws.onopen = () => {
      console.log('connected');
      setSocket(ws);
    };

    ws.onerror = (err) => {
      console.log(err.msg);

      // setSocket(SocketError)  or something similar, just saying..
    };

    return () => {
      ws.close();
    };
  }, []);

  return socket;
};

export default useSocket;
