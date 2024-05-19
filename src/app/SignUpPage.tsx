import React, { useState } from 'react';
import authStore from './stores/authStore';
import { signUp } from './apis/userApi';
import './style/SignUpPage.css';
import { useNavigate } from 'react-router-dom';
import { defaultUser } from './models/user';
import { defaultAccount } from './models/account';
import { addAccount } from './apis/accountApi';

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user,setUser] = useState(defaultUser);
  const [account,setAccount] = useState(defaultAccount)
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleSignUp = async () => {
    try {
      const updatedUser = { 
        ...user,
        email: email,
      };
      const newAccount = { 
        ...account,
        name:user.name,
        surname:user.surname,
        email: email,
        identificationNumber:user.identificationNumber
      };
      console.log("Updated User", updatedUser);  
      await signUp(email, password, updatedUser,newAccount);  
      navigate('/');
    } catch (error) {
      setError("Failed to sign up. Please try again.");
    }
  };
  
  
  const handleBack =  () => {
    navigate("/")
  };
  
  return (
    <div className="sign-up-page">
         <div className="signup-container"> {/* Apply styles using CSS class */}
      <h1>Sign Up</h1>
      <div className="input-container">
      <div className="input-fields">
      <input
        type="text"
        placeholder="Name"
        value={user.name??""}
        onChange={(e) => setUser({
          ...user,
          name:e.target.value
        })}
        className="input-field" // Apply styles to input fields
      />
        <input
        type="text"
        placeholder="Surname"
        value={user.surname??""}
        onChange={(e) => setUser({
          ...user,
          surname:e.target.value
        })}
        className="input-field" // Apply styles to input fields
      />
      <input
        type="text"
        placeholder="ID"
        value={user.identificationNumber??""}
        onChange={(e) => setUser({
          ...user,
          identificationNumber:e.target.value
        })}
        className="input-field" // Apply styles to input fields
      />
      </div>
      <div className="input-fields">
      <input
        type="text"
        placeholder="Account Number"
        value={account.accountNumber??""}
        onChange={(e) => setAccount({
          ...account,
          accountNumber:e.target.value
        })}
        className="input-field" // Apply styles to input fields
      />
            <input
        type="text"
        placeholder="Branch Code"
        value={account.branchCode??""}
        onChange={(e) => setAccount({
          ...account,
          branchCode:e.target.value
        })}
        className="input-field" // Apply styles to input fields
      />
       <select
        value={account.bank ?? ""}
        onChange={(e) =>
          setAccount({
            ...account,
            bank: e.target.value,
          })
        }
        className="input-field"
      >
        <option value="">Select Bank</option>
        <option value="FNB">FNB</option>
        <option value="Standard Bank">Standard Bank</option>
        <option value="Bank Windhoek">Bank Windhoek</option>
        <option value="Nedbank">Nedbank</option>
      </select>
      </div>
      </div>
      <div className="credentials">
      <input
        type="text"
        placeholder="Email"
        value={email??""}
        onChange={(e) => setEmail(e.target.value)}
        className="input-field" // Apply styles to input fields
      />
      <input
        type="password"
        placeholder="Password"
        value={password??""}
        onChange={(e) => setPassword(e.target.value)}
        className="input-field" // Apply styles to input fields
      />
      </div>
  
      {error && <p className="error-message">{error}</p>} {/* Apply styles to error message */}
      <button onClick={handleSignUp} className="signup-button">Sign Up</button> {/* Apply styles to signup button */}
      <button onClick={handleBack} className="back-button">Back</button> {/* Apply styles to signup button */}

    </div>
    </div>
 
  );
};

export default SignUpPage;
