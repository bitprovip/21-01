import React from 'react';
import './Register.scss'
import {useHistory} from "react-router-dom"; 
import { useState } from 'react';
import {toast} from "react-toastify"
import {registerNewUser} from "../../../services/userService";
import NavHeader from "../Navigation/NavHeader";

const Register= (props)=> {
    const [email,setEmail] =useState("");
    const [phone,setPhone] =useState("");
    const [username,setUsername] =useState("");
    const [password,setPassword] =useState("");
    const [confirmPassword,setConfirmPassword] =useState("");
    
    const defaultValidInput={
        isValidEmail:true,
        isValidPhone:true,
        isValidPassword:true,
        isValidConfirmPassword:true
    }
    const[objCheckInput,setObjCheckInput]= useState(defaultValidInput);

    let history =useHistory();
    const handleLogin = ()=>{
    history.push("/login");
    }

    const isStringNumber = (str) => {
    // Sử dụng hàm isNaN để kiểm tra xem chuỗi có phải là số không
        return !isNaN(str) && !isNaN(parseFloat(str));
    }

    const isValidInputs=()=>{
        setObjCheckInput(defaultValidInput);

        if(!email){
            toast.error("email is required");
            setObjCheckInput({...defaultValidInput, isValidEmail:false});
            return false;
        }
        if(!phone){
            toast.error("phone is required");
            setObjCheckInput({...defaultValidInput, isValidPhone:false});
            return false;
        }
        if(!password){
            toast.error("password is required");
            setObjCheckInput({...defaultValidInput, isValidPassword:false});
            return false;
        }
        if(password !== confirmPassword){
            setObjCheckInput({...defaultValidInput, isValidConfirmPassword:false});
            toast.error("pass not same");
            return false;
        }
        let regx=/\S+@\S+\.\S+/;
        if(!regx.test(email)){
            setObjCheckInput({...defaultValidInput, isValidEmail:false});
            toast.error("email không hợp lệ");
            return false;
        } 
        if(isStringNumber(phone)===false)
        {
            setObjCheckInput({...defaultValidInput, isValidPhone:false});
            toast.error("sđt phải là số");
            return false;
        }
        return true;
    }

    const HandleRegister= async()=>{
        let check= isValidInputs();
        if(check===true){
           let response = await registerNewUser(email,phone, username, password);
           if(response.EC === 0){
            toast.success(response.EM);
            history.push("/login");
           } else{
            toast.error(response.EM)
           }
        }
    }
        
    return (
        <>
        <NavHeader />
        <div className='register-container'>
            <div className='container'> 
                <div className=' row px-3 px-sm-0 mt-4 justify-content-center'>
                    {/* <div className='content-left col-12 d-none col-sm-7 d-sm-block'>
                        <div className='brand'>
                            gfdgfdgdfgg
                        </div>
                        <div className='detail'>
                            gfdgfdgfdgdfgfd
                        </div>
                    </div> */}

                    <div className='content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3 '>
                        <h1>Register</h1>
                        <div className='form-group col-10'>
                            <label>Email: </label>
                            <input type='text' className={objCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'} placeholder='Email'
                                value={email} onChange={(event) =>setEmail(event.target.value)}
                            />
                        </div>
                        <div className='form-group col-10 '>
                            <label>sdt: </label>
                            <input type='text' className={objCheckInput.isValidPhone ? 'form-control' : 'form-control is-invalid'} placeholder='sdt'
                                value={phone} onChange={(event) =>setPhone(event.target.value)}
                            />
                        </div>
                        <div className='form-group col-10'>
                            <label>User Name: </label>
                            <input type='text' className='form-control' placeholder='User Name'
                                value={username} onChange={(event) =>setUsername(event.target.value)}
                            />
                        </div>
                        <div className='form-group col-10'>
                            <label>Password: </label>
                            <input type='password' className={objCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'} placeholder='password'
                                value={password} onChange={(event) =>setPassword(event.target.value)}
                            />
                        </div>
                        <div className='form-group col-10'>
                            <label>Re-Password: </label>
                            <input type='password' className={objCheckInput.isValidConfirmPassword ? 'form-control' : 'form-control is-invalid'} placeholder='Nhap lai pass'
                                value={confirmPassword} onChange={(event) =>setConfirmPassword(event.target.value)}
                            />
                        </div>
                        <button className='btn btn-primary col-6 mt-3' type="button" onClick={()=>HandleRegister()}> Register</button>
                        <hr/>

                        <div className='text-center'>
                            <button className='btn btn-success ' onClick={()=>handleLogin()}>
                                da co tai khoan. Login
                            </button>
                        </div>

                        </div>
                    </div>
                </div>
            </div>
            </>
    );
}

export default Register;