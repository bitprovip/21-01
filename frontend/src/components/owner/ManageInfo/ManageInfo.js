import React,{useContext,useEffect, useState} from 'react';
import NavHeader from '../../public/Navigation/NavHeader';
import OwnerSidebar from '../OwnerSidebar/OwnerSidebar';
import { UserContext } from '../../../context/UserContext';
import {getProfile,updateMo, updateDong} from "../../../services/parkingService"
import Button from 'react-bootstrap/esm/Button';
import ModalOn from "./ModalOn"
import ModalOff from "./ModalOff"
import {toast} from 'react-toastify';

function ManageInfo(props) {
    const user = useContext(UserContext);
    const [dataUser,setDataUser] = useState([]);
    const [userid, setUserId] = useState(1);

    const defaultParkingData = {
        name: '',
        address: '',
        price:'',
        status:'',
        soluong:'',
        userid:''
    }
    const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
    const [isShowModalUnConfirm, setIsShowModalUnConfirm] = useState(false);
    const [dataModal,setDataModal] = useState({});
    const [parkingData,setParkingData] = useState(defaultParkingData);
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
    
    const HandleUnConfirm = async(parking) =>{
        setDataModal(parking);
        setIsShowModalUnConfirm(true);
        setParkingData(parking);
    }
    const HandleConfirm = async(parking) =>{
        setDataModal(parking);
        setIsShowModalConfirm(true);
        setParkingData(parking);
    }

    const confirmParking = async ()=>{
        let response = await updateDong({...parkingData });
        if(response && +response.EC === 0){
            toast.error(response.EM);
            await fetchProfile();
            setIsShowModalConfirm(false);
            // window.location.reload();
        }else{
            toast.error(response.EM);
            setIsShowModalConfirm(false);
        }
        console.log(parkingData);
    }

    const unConfirmParking = async ()=>{
        let response = await updateMo({...parkingData });
        if(response && +response.EC === 0){
            toast.success(response.EM);
            await fetchProfile();
            setIsShowModalUnConfirm(false);
            // window.location.reload();
        }else{
            toast.error(response.EM);
            setIsShowModalUnConfirm(false);
            
        }
        console.log(parkingData);
    }
    const handleClose = () =>{
        setParkingData(defaultParkingData);
        setIsShowModalConfirm(false);
        setDataModal({})
    }
    const handleCloseTC = () =>{
        setParkingData(defaultParkingData);
        setIsShowModalUnConfirm(false);
        setDataModal({})
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
                            <div className='title mt-4 text-center d-flex align-items-center'>
                                {dataUser.onoff === 1 ?
                                        <span
                                            title='Edit'
                                            className="text-success fs-2 col-4" aria-hidden="true"
                                            onClick={()=> HandleConfirm(dataUser)}
                                        >
                                            <i className='fa fa-toggle-on'></i>
                                        </span>
                                    :
                                    <span
                                        title='Edit'
                                        className="text-danger fs-2 col-4" aria-hidden="true"
                                        onClick={()=> HandleUnConfirm(dataUser)}
                                    >
                                        <i className='fa fa-toggle-off'></i>
                                    </span>
                                }
                                <h2 className='text-uppercase text-black'>{dataUser?.name}</h2>
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
                <ModalOn 
                show={isShowModalConfirm}
                handleClose={handleClose}
                confirmParking={confirmParking}
                dataModal={dataModal}
                />
                <ModalOff
                    show={isShowModalUnConfirm}
                    handleClose={handleCloseTC}
                    unConfirmParking={unConfirmParking}
                    dataModal={dataModal}
                />
            </div>
        </div>
    </>
    );
}
export default ManageInfo;