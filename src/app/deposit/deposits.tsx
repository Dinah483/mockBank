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
import { addDeposit } from "../apis/depositApi";
import { defaultDeposit } from "../models/depositTransaction";

interface DepositPageProps {
  onClose: () => void;
}

const DepositPage: React.FC<DepositPageProps> = ({ onClose }) => {
  const [account, setAccount] = useState(defaultAccount);
  const [depositAmount, setDepositAmount] = useState('');
  const [transaction,setTransaction] = useState(defaultDeposit);
  const [paymentType, setPaymentType] = useState('bank-transfer');
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
          console.error('Error fetching account:', error);
        }
      }
    };

    fetchAccount();
  }, [me]);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDepositAmount(event.target.value);
  };

  const handlePaymentMethodChange = (event: SelectChangeEvent<string>) => {
    setPaymentType(event.target.value as string);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const newBalance =account.balance+ parseFloat(depositAmount);
      const updatedAccount = {
        ...account,
        balance: newBalance, 
        paymentType: paymentType
      };
      await updateAccount(account.id, updatedAccount);
      const newTransaction={
        ...transaction,
        id:updatedAccount.id,
        amount:parseFloat(depositAmount),
        identificationNumber:updatedAccount.identificationNumber,
      }
      await addDeposit(newTransaction)
      setAccount(updatedAccount);
      onClose();
    } catch (error) {
      console.error('Error updating account:', error);
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
            id="deposit-amount"
            label="Amount to Deposit"
            type="number"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={depositAmount}
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
          <Button type="submit" variant="contained" fullWidth>
            Deposit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default DepositPage;
