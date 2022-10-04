
const baseSelector = (state) => state.orderBook;

export const getSymbol = (state) => baseSelector(state).symbol;

export const getBids = (state) => baseSelector(state).bids;

export const getAsks = (state) => baseSelector(state).asks;

export const isDataExists = (state) => {
  const bids = getBids(state);
  const asks = getAsks(state);

  return (Object.keys(bids).length > 0) || (Object.keys(asks).length > 0);
}
