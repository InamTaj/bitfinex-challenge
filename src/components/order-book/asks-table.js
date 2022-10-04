import React from 'react';
import { useSelector } from 'react-redux';
import { getAsks } from '../../state/selectors/orderbook';
import {Table} from './table';
import { TABLE_COLUMNS } from './table-columns';


export const AsksTable = () => {
  const asks = useSelector(getAsks);

  return (
    <div className="px-4 border border-red-700">
      <Table columns={TABLE_COLUMNS.reverse()} data={Object.values(asks)} />
    </div>
  );
};
