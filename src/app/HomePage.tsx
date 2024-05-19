import { useEffect, useState } from "react";
import "./style/HomePage.css";
import TransactionDataGrid from "./transaction-list/withdrawalTransactions";
import DepositPage from "./deposit/deposits";
import WithdrawalPage from "./withdraw/withdrawals";
import Modal from "@mui/material/Modal";
import { Box, Button, Typography } from "@mui/material";
import LogoutButton from "./LogoutPage";
import authStore from "./stores/authStore";
import { defaultAccount } from "./models/account";
import { getAccountById } from "./apis/accountApi";
import { green } from "@mui/material/colors";
import { getAllWithdrawals, getWithdrawalById } from "./apis/withdrawalApi";
import { IWithdrawal, defaultWithdrawal } from "./models/withdrawalTransaction";
import WithdrawalTransactionDataGrid from "./transaction-list/withdrawalTransactions";
import { getAlldeposits } from "./apis/depositApi";
import { IDeposit } from "./models/depositTransaction";

const HomePage = () => {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [account, setAccount] = useState(defaultAccount);
  const [withdrawals, setWithdrawals] = useState<IWithdrawal[]>([]);
  const [deposits, setDeposits] = useState<IDeposit[]>([]);
  const [loading, setLoading] = useState(true); 

  const me = authStore.currentUserUid;

  const fetchAccount = async () => {
    if (me !== "") {
      try {
        const accountData = await getAccountById(me ?? "");
        if (accountData !== null) {
          setAccount(accountData);
        }
      } catch (error) {
        console.error("Error fetching account:", error);
      }
    }
  };
  const fetchWithdrawal = async () => {
    if (me !== "") {
      try {
        const transaction = await getAllWithdrawals();
        console.log("My Transactions", transaction);
        const myTransactions = transaction.filter(
          (transaction) =>
            transaction.identificationNumber === account.identificationNumber ??
            ""
        );
        if (myTransactions !== null) {
          setWithdrawals(myTransactions);
        }
      } catch (error) {
        console.error("Error fetching account:", error);
      }
    }
  };
  const fetchDeposit = async () => {
    if (me !== "") {
      try {
        const transaction = await getAlldeposits();
        console.log("My Transactions", transaction);
        const myTransactions = transaction.filter(
          (transaction) =>
            transaction.identificationNumber === account.identificationNumber ??
            ""
        );
        if (myTransactions !== null) {
          setDeposits(myTransactions);
        }
      } catch (error) {
        console.error("Error fetching account:", error);
      }
    }
  };
  const onDeposit = () => {
    setShowDepositModal(true);
  };

  const onWithdrawal = () => {
    setShowWithdrawalModal(true);
  };

  const handleCloseModal = () => {
    setShowDepositModal(false);
    setShowWithdrawalModal(false);
    fetchAccount(); // Fetch account data when modals are closed
  };

  const mappedDeposits = deposits.map((deposit) => ({
    id: deposit.id,
    amount: deposit.amount,
    identificationNumber: deposit.identificationNumber,
    categoryName: 'Deposit', // Set category name as 'Deposit'
    date: deposit.date,
    transaction: 'Deposit', // Set transaction type as 'Deposit'
  }));

  // Combine withdrawals and mapped deposits
  const combinedTransactions = [...withdrawals, ...mappedDeposits];
  // Sort transactions by date in descending order
  const sortedTransactions = combinedTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  // Fetch withdrawals and account data
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchAccount(), fetchWithdrawal(),fetchDeposit()]);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchData();
  }, [me,account,withdrawals,deposits]);

  return (
    <div className="home-container">
      {/* Render loading indicator if data is being fetched */}
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          {/* Render account information */}
          <Typography variant="h3" gutterBottom>
            Welcome, {account.name} {account.surname}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Account Balance:{" "}
            <span style={{ color: "green" }}>N${account.balance}</span>
          </Typography>
          {/* Render navigation buttons */}
          <nav>
            <Button variant="contained" onClick={onDeposit} sx={{ mr: 2 }}>
              Deposit
            </Button>
            <Button variant="contained" onClick={onWithdrawal} sx={{ mr: 2 }}>
              Withdraw
            </Button>
            <LogoutButton />
          </nav>
          {/* Render recent transactions */}
          <section>
            <Typography variant="h4" gutterBottom>
              Recent Transactions
            </Typography>
            <WithdrawalTransactionDataGrid data={sortedTransactions} />
          </section>
          {/* Render deposit and withdrawal modals */}
          <Modal open={showDepositModal} onClose={handleCloseModal}>
            <Box sx={{ width: 400, bgcolor: "background.paper", p: 2 }}>
              <DepositPage onClose={handleCloseModal} />
            </Box>
          </Modal>
          <Modal open={showWithdrawalModal} onClose={handleCloseModal}>
            <Box sx={{ width: 400, bgcolor: "background.paper", p: 2 }}>
              <WithdrawalPage onClose={handleCloseModal} />
            </Box>
          </Modal>
        </>
      )}
    </div>
  );
};

export default HomePage;
