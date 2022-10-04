import React from 'react';
import { useSelector } from 'react-redux';
import { getBids } from '../../state/selectors/orderbook';
import { Table } from './table';
import { TABLE_COLUMNS } from './table-columns';


export const BidsTable = () => {
  const bids = useSelector(getBids);

  return (
    <div className="px-4 border border-emerald-600">
      <Table columns={TABLE_COLUMNS}  data={Object.values(bids)} />
    </div>
  );
};
