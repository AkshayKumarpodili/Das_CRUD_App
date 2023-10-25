import React, {useState} from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const initialValue = {
  email: '',
  password: ''
}

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px;
`;



const Signup = () => {

  const [user, setUser] = useState(initialValue);
  const { email, password } = user;
  
  let navigate = useNavigate();

  const onValueChange = (e) => {
      setUser({...user, [e.target.name]: e.target.value})
  }

  const addUserDetails = async(email,password) => {
    console.log(email,password);
  }

  return (
    <Container>
    <Typography variant="h4">Let's Go!!!</Typography>
    <FormControl>
        <InputLabel htmlFor="my-input">Email</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name='email' value={email} id="my-input" />
    </FormControl>
   
    <FormControl>
        <InputLabel htmlFor="my-input">Password</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name='password' value={password} id="my-input"/>
    </FormControl>
   
    <FormControl>
        <Button variant="contained" color="primary" onClick={() => addUserDetails(email,password)}>Signup</Button>
    </FormControl>
</Container>
  )
}

export default Signup