import { useState, useEffect } from 'react';

const useSocket = (URI) => {
  const [socket, setSocket] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(URI);
    ws.onopen = () => {
      console.log('connected to socket');
      setSocket(ws);
    };

    ws.onerror = (err) => {
      console.log(err.msg);

      setError(true);
    };

    return () => {
      ws.close();
    };
  }, []);

  return { socket, error };
};

export default useSocket;
