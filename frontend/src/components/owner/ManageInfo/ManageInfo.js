import React,{useContext,useEffect, useState} from 'react';
import NavHeader from '../../public/Navigation/NavHeader';
import OwnerSidebar from '../OwnerSidebar/OwnerSidebar';
import { UserContext } from '../../../context/UserContext';
import {getProfile} from "../../../services/parkingService"
import Button from 'react-bootstrap/esm/Button';

function ManageInfo(props) {
    const user = useContext(UserContext);
    const [dataUser,setDataUser] = useState([]);
    const [userid, setUserId] = useState(1);
    useEffect(() => {
        fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[userid])

    const fetchProfile = async () => {
        let id = user.user.account.parking.id
        let response = await getProfile(id);
        if(response && +response.EC === 0 ){
            setUserId(user.user.account.userid)
            setDataUser(response.DT);
            console.log(response.DT);
        }
    }

    
    return (
    <>
        <NavHeader/>

        <div className='content-body row bg'>
            <div className='col-2'>
                <OwnerSidebar/>
            </div>
            <div className='col-10'>
                <div className='container'>
                    <div className='manage-users-container '>
                        
                        <div className='user-header'>
                            <div className='title mt-4 text-center'>
                                <h2 className='text-uppercase text-danger'>{dataUser?.name}</h2>
                             </div>
                             <hr/>
                             {/* <div className='col-3'></div>
                             <div className='col-4'>
                                <Button className='btn btn-success'>Đóng bãi xe</Button>
                            </div> */}
                        </div>
                    </div>
                    <div className='content-body row mb-3 mt-5'>
                        <div className='col-3'>
                        </div>
                        <div className='col-6 form-group'>
                            <label>Tên bãi xe: </label>
                            <input className='form-control' 
                             value={dataUser?.name}
                            />
                        </div>
                        <div className='col-3'>
                        </div>

                        <div className='col-3'>
                        </div>
                        <div className='col-6 form-group mt-3'>
                            <label>Địa chỉ </label>
                            <input className='form-control' 
                            type='text' 
                            value={dataUser?.address}
                            />
                        </div>
                        <div className='col-3'>
                        </div>

                        <div className='col-3'>
                        </div>
                        <div className='col-6 form-group mt-3'>
                            <label>Giá/giờ </label>
                            <input className='form-control' 
                             value={dataUser?.price}
                            />
                        </div>
                        <div className='col-3'>
                        </div>

                        <div className='col-3'>
                        </div>
                        <div className='col-6 form-group mt-3'>
                            <label>Số lượng chỗ còn lại: </label>
                            <input className='form-control' 
                            type='text'
                            value={dataUser?.soluong}
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
export default ManageInfo;