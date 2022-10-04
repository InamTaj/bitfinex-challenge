import { OrderBook } from './components/order-book';

function App() {
  return (
    <div className="flex flex-col">
      <header className="flex justify-center text-4xl">
        Bitfinex Challenge
      </header>
      <div className="my-8">
        <OrderBook />
      </div>
    </div>
  );
}

export default App;
