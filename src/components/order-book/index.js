import React, { useState, useEffect } from 'react';
import useWebSocket  from 'react-use-websocket';
import { useDispatch, useSelector } from 'react-redux';
import {addPrices} from '../../state/slices/orderbook';
import {getSymbol, isDataExists} from '../../state/selectors/orderbook';
import {BidsTable} from './bids-table';
import {AsksTable} from './asks-table';

// TODO: Move URL to .env
const SOCKET_URL='wss://api-pub.bitfinex.com/ws/2';

export const OrderBook = () => {
  const [isConnected, setIsConnected] = useState(false);
  const dispatch = useDispatch();
  const symbol = useSelector(getSymbol);
  const isDataExist = useSelector(isDataExists);

  const { sendJsonMessage } = useWebSocket(SOCKET_URL, {
    onOpen: () => handleOnOpen(),
    onClose: () => handleOnClose(),
    shouldReconnect: (closeEvent) => true,
    onMessage: (event) => processMessages(event),
  });

  const handleOnOpen = () => {

    console.log('WebSocket connection opened.');
  }

  const handleOnClose = () => {
    setIsConnected(false);
    console.log('WebSocket connection closed.');
  };

  const processMessages = ({ data }) => {
    const values = JSON.parse(data);
    dispatch(addPrices(values[1]));
  }

  const disconnect = () => {
    if (isConnected === true) {
      const unSubscribeMessage = {
        event: 'unsubscribe',
        feed: 'book',
        symbol,
      };
      sendJsonMessage(unSubscribeMessage);
      setIsConnected(false);
    }
  }

  useEffect(() => {
    return () => {
      // perform socket connection clean-up
      disconnect();
    };
  }, []);

  const onConnect = () => {
    if (isConnected !== true) {
      const subscribeMessage = {
        event: 'subscribe',
        channel: 'book',
        symbol,
      };
      sendJsonMessage(subscribeMessage);
      setIsConnected(true);
    }
  };

  const onDisconnect = () => {
    disconnect();
  };


  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-8 justify-center">
        <button className="py-2 px-4 bg-green-300 hover:bg-green-600" onClick={onConnect}>Connect</button>
        <button className="py-2 px-4 bg-red-300 hover:bg-red-600" onClick={onDisconnect}>Disconnect</button>
      </div>
      {
        isDataExist === true && (
          <div className="flex flex-row justify-center">
            <BidsTable />
            <AsksTable />
          </div>
        )
      }
    </div>
  );
}
