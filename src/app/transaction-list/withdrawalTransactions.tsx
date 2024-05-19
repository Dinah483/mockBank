import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IWithdrawal } from '../models/withdrawalTransaction';

const columns: GridColDef[] = [
  { field: 'date', headerName: 'Date', width: 150 },
  { field: 'transaction', headerName: 'Transaction Type', width: 200 },
  { field: 'categoryName', headerName: 'Category Name', width: 150 },
  { field: 'amount', headerName: 'Amount', width: 150 },
];

interface WithdrawalTransactionDataGridProps {
  data: IWithdrawal[];
}

const WithdrawalTransactionDataGrid: React.FC<WithdrawalTransactionDataGridProps> = ({ data }) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
      />
    </div>
  );
};

export default WithdrawalTransactionDataGrid;
