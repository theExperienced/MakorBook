import { useState, useEffect } from 'react';
import useSocket from '../../hooks/useSocket';

import CurrencyBlock from '../CurrencyBlock';

const Displayer = () => {
  const [asks, setAsks] = useState();
  const [bids, setBids] = useState();

  const socket = useSocket('wss://ws.bitstamp.net/'); // returns socket in case of needed control over socket

  useEffect(() => {
    if (socket) {
      socket.onmessage = (evt) => {
        const message = JSON.parse(evt.data);
        const {
          data: { asks, bids },
        } = message;

        setAsks(() => asks);
        setBids(() => bids);
      };

      socket.onclose = () => {
        console.log('disconnected');
      };

      socket.send(
        JSON.stringify({
          event: 'bts:subscribe',
          data: {
            channel: 'detail_order_book_btcusd',
          },
        })
      );
    }
  }, [socket]);

  return (
    <div
      className='displayer-container'
      style={{ display: 'flex', gap: '4rem', justifyContent: 'center' }}
    >
      {asks && <CurrencyBlock type={'asks'} data={asks} />}
      {bids && <CurrencyBlock type={'bids'} data={bids} />}
    </div>
  );
};

export default Displayer;
