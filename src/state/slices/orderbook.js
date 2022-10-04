import { createSlice } from '@reduxjs/toolkit'


const orderBookSlice = createSlice({
  name: 'orderBook',
  initialState: {
    symbol: 'tBTCUSD',
    bids: {},
    asks: {},
  },
  reducers: {
    addPrices: (state, action) => {
      if (action.payload == undefined) return;

      const data = action.payload;
      let [priceLevel, count, amount] = action.payload;
      amount = parseFloat(amount).toFixed(4);

      if (count === 0) {
        if (amount === 1) {
          // remove from bids
          delete state.bids[priceLevel];


        } else if (amount === -1) {
          // remove from asks
          delete state.asks[priceLevel];
        }

      } else if (count > 0) {
        if (amount > 0) {
          // update bids
          state.bids = {
            ...state.bids,
            [priceLevel]: { price: priceLevel, amount, count },
          };

        } else if (amount < 0) {
          // update asks
          state.asks = {
            ...state.asks,
            [priceLevel]: { price: priceLevel, amount, count },
          };
        }
      }
    },
  }
});


export const { addPrices } = orderBookSlice.actions;
export default orderBookSlice.reducer;
