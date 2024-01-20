
import NavHeader from '../../public/Navigation/NavHeader'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useContext, useState } from 'react';
import {toast} from "react-toastify"
import {registerNewParking} from "../../../services/parkingService";
import {UserContext} from '../../../context/UserContext'
import './RegParkings.scss'
import axios from 'axios';

const RegPaking=(props)=> {
    const {user} = useContext(UserContext)
    const history = useHistory();
    const HandlePushHome = ()=> history.push('/')
   
    const [name,setName] =useState("");
    const [address,setAddress] =useState("");
    const [price,setPrice] =useState("");
    const [soluong,setSoluong] =useState("");
    
    const defaultValidInput={
        isValidName:true,
        isValidAddress:true,
        isValidPrice:true,
        isValidSoluong:true
    }
    const isStringNumber = (str) => {
    // Sử dụng hàm isNaN để kiểm tra xem chuỗi có phải là số không
        return !isNaN(str) && !isNaN(parseFloat(str));
    }
    const[objCheckInput,setObjCheckInput]= useState(defaultValidInput);
    const isValidInputs=()=>{
        setObjCheckInput(defaultValidInput);

        if(!name){
            toast.error("Tên bãi đỗ không được để trống!");
            setObjCheckInput({...defaultValidInput, isValidName:false});
            return false;
        }
        if(!address){
            toast.error("Địa chỉ không được để trống!");
            setObjCheckInput({...defaultValidInput, isValidAddress:false});
            return false;
        }
        if(!price){
            toast.error("Hãy nhập giá đậu xe!");
            setObjCheckInput({...defaultValidInput, isValidPrice:false});
            return false;
        }
        if(isStringNumber(price)===false)
        {
            setObjCheckInput({...defaultValidInput, isValidPrice:false});
            toast.error("Giá đỗ xe phải là 1 số!");
            return false;
        }
        if(!soluong){
            toast.error("Hãy nhập số lượng chỗ đậu xe!");
            setObjCheckInput({...defaultValidInput, isValidSoluong:false});
            return false;
        }
        if(isStringNumber(soluong)===false)
        {
            setObjCheckInput({...defaultValidInput, isValidSoluong:false});
            toast.error("Số lượng chỗ đậu xe phải là 1 số!");
            return false;
        }
        return true;
    }
    
    const HandleRedParking= async()=>{
        try {
            let check= isValidInputs();
            if(check===true){
                const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyArVizBbMBDY027MKq7kGrwuAPZB-am0oE`);
                if (response.data.results.length > 0) {
                    const location = response.data.results[0].geometry.location;
                    let lat = location.lat;
                    let lng = location.lng;
                    let userid = user.account.userid;
                    let status = 1;
                    let res = await registerNewParking(name,address,price,soluong, userid, status,lng,lat);
                    if(res.EC === 0){
                        toast.success(res.EM);
                        history.push("/");
                    } else{
                        alert.error(res.EM)
                    
                    }
                    // console.log(name,address,price,soluong, userid, status,lng,lat);
                } else {
                toast.error('Không tìm thấy tọa độ');
                }
            }
        } catch (error) {
            toast.error('Lỗi khi chuyển đổi địa chỉ:', error);
        }
    }


    return (
        <>
        <NavHeader />
        <div className='register-container'>
            <div className='container '> 
                <div className=' row px-3 px-sm-0 justify-content-center mt-4'>
                    <div className='content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3'>
                        <h1>Đăng kí bãi đỗ xe</h1>
                        <div className='form-group col-8'>
                            <label>Tên bãi đỗ </label>
                            <input type='text' className= {objCheckInput.isValidName ? 'form-control' : 'form-control is-invalid'}  placeholder='abc...'
                                value={name} onChange={(event) =>setName(event.target.value)}
                            
                            />
                        </div>
                        <div className='form-group col-8'>
                            <label>Địa chỉ:  </label>
                            <input type='text' className={objCheckInput.isValidAddress ? 'form-control' : 'form-control is-invalid'} placeholder='Hãy nhập địa chỉ chính xác'
                                value={address} onChange={(event) =>setAddress(event.target.value)}
                            />
                        </div>
                        <div className='form-group  col-8'>
                            <label>Giá: </label>
                            <input type='text' className={objCheckInput.isValidPrice ? 'form-control' : 'form-control is-invalid'} placeholder='tính trên mỗi giờ'
                                value={price} onChange={(event) =>setPrice(event.target.value)}
                            />
                        </div>
                        <div className='form-group col-8'>
                            <label>Số lượng chỗ đậu xe: </label>
                            <input type='text' className={objCheckInput.isValidSoluong ? 'form-control' : 'form-control is-invalid'}
                                value={soluong} onChange={(event) =>setSoluong(event.target.value)}
                            />
                        </div> 

                        <button className='btn btn-primary col-8 mt-4' type="button"  onClick={()=>HandleRedParking()}> Gửi</button>
                        <hr/>

                        <div className='text-center'>
                            <button className='btn btn-success' onClick={()=>HandlePushHome()}>
                                Trang chủ
                            </button>
                        </div>

                        </div>
                    </div>
                </div>
            </div>
            </>
    );
}

export default RegPaking;