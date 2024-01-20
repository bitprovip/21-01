import React, {useState, useEffect}from 'react';
import NavHeader from '../Navigation/NavHeader'
import AdminSidebar from '../Sidebar/AdminSidebar'
import {fetchAllParking,updateConfirmParking, updateUnConfirmParking} from "../../../services/parkingService"
import ModalConfirm from "./ModalConfirm"
import ModalUnConfirm from "./ModalUnConfirm"
import {toast} from 'react-toastify';

const ConfirmDK = (props) => {
    const defaultParkingData = {
        name: '',
        address: '',
        price:'',
        status:'',
        soluong:'',
        // userid:'',
    }
    const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
    const [isShowModalUnConfirm, setIsShowModalUnConfirm] = useState(false);
    const [dataModal,setDataModal] = useState({});
    const [parkingData,setParkingData] = useState(defaultParkingData);
    // const [isShowModalParking, setIsShowModalParking] = useState(false);

    // const [dataModalParking, setDataModalParking] = useState({});


    const HandleConfirm = async(parking) =>{
        setDataModal(parking);
        setIsShowModalConfirm(true);
        setParkingData(parking);
        // console.log(parking);
    }

    const HandleUnConfirm = async(parking) =>{
        setDataModal(parking);
        setIsShowModalUnConfirm(true);
        setParkingData(parking);
    }

    
    const confirmParking =  async()=>{
        let response = await updateConfirmParking({...parkingData });
        if(response && +response.EC === 0){
            toast.success(response.EM);
            await dataParking();
            setIsShowModalConfirm(false);
        }else{
            toast.error(response.EM);
            setIsShowModalConfirm(false);
        }
        // console.log(...parkingData);
    }
    const unConfirmParking = async ()=>{
        let response = await updateUnConfirmParking({...parkingData });
        if(response && +response.EC === 0){
            toast.error(response.EM);
            await dataParking();
            setIsShowModalUnConfirm(false);
        }else{
            toast.error(response.EM);
            setIsShowModalUnConfirm(false);
        }
    }



    useEffect(()=>{
        dataParking();
    },[])
    
    const [listParking, setListParking] = useState([]);

    const dataParking = async () => {
        let response = await fetchAllParking();
        if(response && +response.EC === 0 ){
            setListParking(response.DT);
            // console.log(response);
        }
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

    return(
        <>
        <NavHeader/>
        <div className='content-body row bg'>
            <div className='col-2'>
                <AdminSidebar/>
            </div>
            <div className='col-10'>
        <div className='container'>
            <div className='manage-users-container'>
                <div className='user-header'>
                    <div className='title mt-4 text-center'>
                        <h2>BÃI XE CHỜ XÁC THỰC</h2>
                    </div>
                </div> 
                <div className ='user-body mt-5'>
                    <table className ='table table-bordered table-hover '>
                        <thead>
                            <tr className='bg-info bg-gradient'>
                                <th scope='col'>Tên chủ bãi</th>
                                <th scope='col'>Tên bãi đỗ</th>
                                <th scope='col'>Giá/giờ</th>
                                <th scope='col'>Địa chỉ</th>
                                <th scope='col'>Số lượng</th>
                                <th scope='col'>Số liên hệ</th>
                                <th scope='col'>Email</th>
                                <th >actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listParking && listParking.length > 0 ? 
                            <>
                                {listParking.map((item, index) =>{
                                        return(
                                        <tr key={`row-${index}`}> 
                                            {/* <td>{item.User.username} </td> */}
                                            <td>{item.User ? item.User.username: ''}</td>
                                            <td>{item.name}</td>
                                            <td>{item.price}</td>
                                            <td>{item.address}</td>
                                            <td>{item.soluong}</td>
                                            <td>{item.User ? item.User.phone: ''}</td>
                                            <td>{item.User ? item.User.email: ''}</td>
                                            {/* <td>{item.User.phone}</td>
                                            <td>{item.User.email}</td> */}
                                            <td>
                                                <span
                                                    title='Edit'
                                                    className='edit'
                                                    onClick={()=> HandleConfirm(item)}
                                                >
                                                    <i className='fa fa-check'></i>
                                                </span>
                                                <span
                                                    title='Delete'
                                                    className='delete'
                                                    onClick={()=> HandleUnConfirm(item)}
                                                >
                                                    <i className='fa fa-ban'></i>
                                                </span>
                                            </td>
                                        </tr>
                                        )
                                    })}
                            </>
                            :
                            <>
                            <tr><td>Không có đăng kí mới</td></tr>
                            </>
                            }
                        </tbody>
                    </table>
                </div>
            </div>   
         </div>
         <ModalConfirm 
            show={isShowModalConfirm}
            handleClose={handleClose}
            confirmParking={confirmParking}
            dataModal={dataModal}
        />
        <ModalUnConfirm 
            show={isShowModalUnConfirm}
            handleClose={handleCloseTC}
            unConfirmParking={unConfirmParking}
            dataModal={dataModal}
        />
    </div>
    
    </div>

    </>)
}

export default ConfirmDK;