import { useState, useEffect } from 'react';
import useSocket from '../../hooks/useSocket';

import CurrencyBlock from '../CurrencyBlock';

const Displayer = () => {
  const [asks, setAsks] = useState();
  const [bids, setBids] = useState();

  const { socket, error } = useSocket('ws://localhost:3001'); // returns socket in case of needed control over socket

  useEffect(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.onmessage = ({ data }) => {
        const { asks, bids } = JSON.parse(data);

        setAsks(asks);
        setBids(bids);
      };
    }
  }, [socket]);

  return (
    <div
      className='displayer-container'
      style={{ display: 'flex', gap: '4rem', justifyContent: 'center' }}
    >
      {asks && <CurrencyBlock type={'asks'} data={asks} />}
      {bids && <CurrencyBlock type={'bids'} data={bids} />}
      {error && <p>An error occurred</p>}
    </div>
  );
};

export default Displayer;
