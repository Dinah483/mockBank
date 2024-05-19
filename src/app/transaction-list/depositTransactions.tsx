import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'date', headerName: 'Date', width: 150 },
  { field: 'transaction', headerName: 'Transaction Type', width: 200 },
  { field: 'amount', headerName: 'Amount', width: 150 },
];

const rows = [
  { id: 1, date: '2022-05-20', transactionType: 'Expense', amount: 100, },
  { id: 2, date: '2022-05-21', transactionType: 'Income', amount: 200, },
  { id: 3, date: '2022-05-22', transactionType: 'Expense', amount: 50,  },
  { id: 4, date: '2022-05-23', transactionType: 'Income', amount: 150,  },
];

const DepositDataGrid: React.FC = () => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
      />
    </div>
  );
};

export default DepositDataGrid;
