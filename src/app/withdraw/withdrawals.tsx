import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Box,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { defaultAccount } from "../models/account";
import authStore from "../stores/authStore";
import { getAccountById, updateAccount } from "../apis/accountApi";
import { defaultWithdrawal } from "../models/withdrawalTransaction";
import { addWithdrawal } from "../apis/withdrawalApi";

interface DepositPageProps {
  onClose: () => void;
}

const WithdrawalPage: React.FC<DepositPageProps> = ({ onClose }) => {
  const [account, setAccount] = useState(defaultAccount);
  const [transaction,setTransaction] = useState(defaultWithdrawal);
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [paymentType, setPaymentType] = useState("bank-transfer");
  const [categoryType, setCategoryType] = useState("bank-transfer");

  const me = authStore.currentUserUid;

  useEffect(() => {
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

    fetchAccount();
  }, [me]);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWithdrawalAmount(event.target.value);
  };

  const handlePaymentMethodChange = (event: SelectChangeEvent<string>) => {
    setPaymentType(event.target.value as string);
  };
  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setCategoryType(event.target.value as string);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      console.log("Withdrawal amount:", withdrawalAmount);
      const newBalance = account.balance - parseFloat(withdrawalAmount);
      console.log("New balance after withdrawal:", newBalance);
      const updatedAccount = {
        ...account,
        balance: newBalance,
        paymentType: paymentType,
      };
      await updateAccount(account.id, updatedAccount);
      const newTransaction={
        ...transaction,
        id:updatedAccount.id,
        amount:parseFloat(withdrawalAmount),
        identificationNumber:updatedAccount.identificationNumber,
        categoryName:categoryType
      }
      await addWithdrawal(newTransaction)
      setAccount(updatedAccount);
      onClose();
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  return (
    <Modal open onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          p: 4,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            id="withdrawal-amount"
            label="Amount to Withdraw"
            type="number"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={withdrawalAmount}
            onChange={handleAmountChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="payment-method-label">Payment Method</InputLabel>
            <Select
              labelId="payment-method-label"
              id="payment-method"
              name="payment-method"
              value={paymentType}
              onChange={handlePaymentMethodChange}
              label="Payment Method"
            >
              <MenuItem value="bank-transfer">Bank Transfer</MenuItem>
              <MenuItem value="credit-card">Credit Card</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
          <InputLabel id="payment-method-label">Category</InputLabel>
            <Select
              labelId="category-type-label"
              id="category-method"
              name="category-method"
              value={categoryType}
              onChange={handleCategoryChange}
              label="Category"
            >
              <MenuItem value="groceries">Groceries</MenuItem>
              <MenuItem value="transportation">Transportation</MenuItem>
              <MenuItem value="housing">Housing</MenuItem>
              <MenuItem value="utilities">Utilities</MenuItem>
              <MenuItem value="entertainment">Entertainment</MenuItem>
              <MenuItem value="healthcare">Healthcare</MenuItem>
              <MenuItem value="education">Education</MenuItem>
              <MenuItem value="clothing">Clothing</MenuItem>
              <MenuItem value="dining">Dining</MenuItem>
              <MenuItem value="saving">Saving</MenuItem>
              <MenuItem value="investments">Investments</MenuItem>
              <MenuItem value="gifts">Gifts</MenuItem>
            </Select>
            </FormControl>

          <Button type="submit" variant="contained" fullWidth>
            Withdraw
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default WithdrawalPage;
