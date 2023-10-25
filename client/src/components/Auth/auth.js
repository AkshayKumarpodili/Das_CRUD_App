import {useEffect, useState} from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import { useNavigate } from 'react-router-dom';
import {signUp,signIn} from '../../Service/api';
import Icon from './Icon';
import  GoogleLogin  from 'react-google-login';
import {gapi} from 'gapi-script';


const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {

  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  const clientId = '11987242782-mao1lhlcem2pqhs3e9nuie5rgl4e9auj.apps.googleusercontent.com';
  const [isSignup, setIsSignup] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    gapi.load("client:auth2",()=>{
        gapi.auth2.init({clientId:clientId})
    })
  },[])

  const switchMode = () => {
    setFormData(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  }  
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
       e.preventDefault();
       console.log(formData);
      if (isSignup) {
       const {data}= await signUp(formData);
       console.log("signupdata = ",data);
        localStorage.setItem('profile', JSON.stringify( data ));
        navigate('/');
    
      } else {
        const {data}= await signIn(formData);
        console.log("signindata = ",data);
        localStorage.setItem('profile', JSON.stringify( data ));
        navigate('/add');
      }
  }

  const googleSuccess = async (res) => {
        
    //console.log("res = ",res);

    const result = res?.profileObj;
    const token = res?.tokenId;
    const data={result,token};
    console.log("data");

    try {
      //console.log("DAta = ",data);
      localStorage.setItem('profile', JSON.stringify( data ));
      navigate("/");
    } catch (error) {
      console.log(error);
    }  
};

const googleError = (error) => {
  console.log(error);
}
   

  return (
    <Container component="main" maxWidth="xs">
       
       <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>


        <form className={classes.form} onSubmit={handleSubmit}>

        <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange}  half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
            
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>

          <GoogleLogin 
            
            clientId={clientId}
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy={"single_host_origin"}

          />

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
               
        </form>

      </Paper>

    </Container>
  )
}

export default Auth;