import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './app/HomePage';
import DepositPage from './app/deposit/deposits';
import WithdrawalPage from './app/withdraw/withdrawals';
import TransactionPage from './app/transaction-list/withdrawalTransactions';
import LoginPage from './app/LoginPage';
import SignUpPage from './app/SignUpPage';
import { observer } from 'mobx-react-lite';
import authStore from './app/stores/authStore';
import LogoutButton from './app/LogoutPage';


const AppRoutes: React.FC = observer(() => {
  return (
    <Router>
    <Routes>
      {!authStore.isAuthenticated ? (
        <>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </>
      ) : (
        <>
          <Route path="/" element={<HomePage />} />
        </>
      )}
    </Routes>
  </Router>
  );
});

export default AppRoutes;
