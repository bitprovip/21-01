import React, {useState, useEffect}from 'react';
import NavHeader from '../Navigation/NavHeader'
import AdminSidebar from '../Sidebar/AdminSidebar'
import {fetchParkingConfirm,updateOn, updateOff} from "../../../services/parkingService"
import ModalOn from "./ModalOn"
import ModalOff from "./ModalOff"
import {toast} from 'react-toastify';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const Parkings = (props) => {
    const history = useHistory();
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

    const HandleConfirm = async(parking) =>{
        setDataModal(parking);
        setIsShowModalConfirm(true);
        setParkingData(parking);
    }

    const HandleUnConfirm = async(parking) =>{
        setDataModal(parking);
        setIsShowModalUnConfirm(true);
        setParkingData(parking);
    }

    
    const confirmParking = async ()=>{
        let response = await updateOn({...parkingData });
        if(response && +response.EC === 0){
            toast.error(response.EM);
            await dataParking();
            setIsShowModalConfirm(false);
        }else{
            toast.error(response.EM);
            setIsShowModalConfirm(false);
        }
        console.log(parkingData);
    }

    const unConfirmParking = async ()=>{
        let response = await updateOff({...parkingData });
        if(response && +response.EC === 0){
            toast.success(response.EM);
            await dataParking();
            setIsShowModalUnConfirm(false);
        }else{
            toast.error(response.EM);
            setIsShowModalUnConfirm(false);
        }
        console.log(parkingData);
    }



    useEffect(()=>{
        dataParking();
    },[])

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

    useEffect(()=>{
        dataParking();
    },[])

    const [listParking, setListParking] = useState([]);

    const dataParking = async () => {
        let response = await fetchParkingConfirm();
        if(response && +response.EC === 0 ){
            setListParking(response.DT);
        }
    }
    const handleDuyetDK = () =>{
        history.push("/admin/confirmparking");
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
                        <h2>QUẢN LÝ DANH SÁCH BÃI ĐỖ</h2>
                    </div>
                    <div className='acctions mt-4'>
                  <button className='btn btn-success' onClick={()=>{handleDuyetDK()}}> Duyệt đăng kí </button>
            </div>
                </div> 
                <div className ='user-body mt-5'>
                    <table className ='table table-bordered table-hover border border-dark'>
                        <thead>
                            <tr className ='bg-info bg-gradient'>
                                <th scope='col'>Tên chủ bãi</th>
                                <th scope='col'>Tên bãi đỗ</th>
                                <th scope='col'>Giá/giờ</th>
                                <th scope='col'>Địa chỉ</th>
                                <th scope='col'>Số lượng</th>
                                <th scope='col'>Số liên hệ</th>
                                <th scope='col'>Email</th>
                                <th >Khóa</th>
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
                                            <td className='position-relative'>
                                                {item.tc === 1 ?
                                                <span
                                                    title='Edit'
                                                    className='delete position-absolute start-50'
                                                    onClick={()=> HandleUnConfirm(item)}
                                                >
                                                    <i className='fa fa-lock'></i>
                                                </span>
                                                :
                                                <span
                                                    title='Delete'
                                                    className='unblock position-absolute start-50'
                                                    onClick={()=> HandleConfirm(item)}
                                                >
                                                    <i className='fa fa-unlock'></i>
                                                </span>
                                                }
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

    </>)
}

export default Parkings;