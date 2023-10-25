//import { AUTH } from '../constants/actionTypes';
import {signIn,signUp}  from '../Service/api.js';

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    
    const { data } = await signIn(formData);

    //dispatch({ type: AUTH, data });

    navigate('/all');

    
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    
    const { data } = await signUp(formData);

    //dispatch({ type: AUTH, data });

    navigate('/signin');

  } catch (error) {
    console.log(error);
  }
};