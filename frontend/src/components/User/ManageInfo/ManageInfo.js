import React,{useContext,useEffect, useState} from 'react';
import NavHeader from '../../public/Navigation/NavHeader';
import UserSidebar from '../UserSidebar/UserSidebar';
import { UserContext } from '../../../context/UserContext';
import {getProfile} from "../../../services/userService"
import Button from 'react-bootstrap/esm/Button';

function ManageInfoUser(props) {
    const user = useContext(UserContext);
    const [dataUser,setDataUser] = useState([]);
    const [userid, setUserId] = useState(1);
    useEffect(() => {
        fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[userid])

    const fetchProfile = async () => {
        let id = user.user.account.userid;
        let response = await getProfile(id);
        if(response && +response.EC === 0 ){
            setUserId(user.user.account.userid)
            setDataUser(response.DT);
            // console.log(response.DT);
            // console.log(dataUser);
        }
    }
    return (
    <>
        <NavHeader/>

        <div className='content-body row bg'>
            <div className='col-2'>
                <UserSidebar/>
            </div>
            <div className='col-10'>
                <div className='container'>
                    <div className='manage-users-container'>
                        <div className='user-header'>
                            <div className='title mt-4 text-center'>
                                <h2>QUẢN LÝ THÔNG TIN CÁ NHÂN</h2>
                             </div>
                             <hr/>
                        </div>
                    </div>
                    <div className='content-body row mb-3 mt-5'>
                        <div className='col-3'>
                        </div>
                        <div className='col-6 form-group'>
                            <label>Tên người dùng: </label>
                            <input className='form-control' 
                             value={dataUser?.username}
                            />
                        </div>
                        <div className='col-3'>
                        </div>

                        <div className='col-3'>
                        </div>
                        <div className='col-6 form-group mt-3'>
                            <label>Số điện thoại </label>
                            <input className='form-control' 
                            type='text' 
                            value={dataUser?.phone}
                            />
                        </div>
                        <div className='col-3'>
                        </div>

                        <div className='col-3'>
                        </div>
                        <div className='col-6 form-group mt-3'>
                            <label>Email </label>
                            <input className='form-control' 
                             value={dataUser?.email}
                            />
                        </div>
                        <div className='col-3'>
                        </div>

                        <div className='col-3'>
                        </div>
                        <div className='col-6 form-group mt-3'>
                            <label>Biển số xe: </label>
                            <input className='form-control' 
                            type='text'
                            value={dataUser?.bsx}
                            />
                        </div>
                        
                        
                        <hr className='mt-4'/>
                        <div className='col-3'></div>
                        <div className='col-4'>
                        <Button className='btn btn-success'>Sửa</Button>
                        </div>
                </div> </div>
            </div>
        </div>
    </>
    );
}
export default ManageInfoUser;