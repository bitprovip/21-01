import React, {useState, useEffect}from 'react';
import NavHeader from '../Navigation/NavHeader'
import AdminSidebar from '../Sidebar/AdminSidebar'
import {fetchParkingConfirm,updateOn, updateOff} from "../../../services/parkingService"
import ModalOn from "./ModalOn"
import ModalOff from "./ModalOff"
import {toast} from 'react-toastify';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import DataTable from 'react-data-table-component';
// import dayjs from 'dayjs';



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
    const [records, setRecords] = useState([]);
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


    const [listParking, setListParking] = useState([]);

    const dataParking = async () => {
        let response = await fetchParkingConfirm();
        if(response && +response.EC === 0 ){
            setListParking(response.DT);
            setRecords(response.DT);
        }
    }
    const handleDuyetDK = () =>{
        history.push("/admin/confirmparking");
    }


    const columns = [
        {
            name: 'Tên bãi đỗ',
            selector: row => row.name,
            cell: (row) => <span className="text-primary fw-bold fs-7">{row.name}</span>,
            
        },
        {
            name: 'Tên chủ bãi',
            selector: row => row.User.username,
        },
        {
            name: 'Giá/giờ',
            selector: row => row.price,
            cell: (row) => <span className="fw-bold">{row.price}đ</span>,
        },
        {
            name: 'Địa chỉ',
            selector: row => row.address
        },
        {
            name: 'Số chỗ',
            selector: row => row.soluong,
            sortable: true
        },
        {
            name: 'Số liên hệ',
            selector: row => row.User.phone
        },
        {
            name: 'email',
            selector: row => row.User.email
        },
        {
            name: 'Actions',
            cell: (row) => (
            <td className='position-relative'>
                {row.tc === 1 ? (
                <span
                    title='Edit'
                    className='delete position-absolute start-50 text-danger'
                    onClick={() => HandleUnConfirm(row)}
                >
                    <i className='fa fa-lock'></i>
                </span>
                ) : (
                <span
                    title='Delete'
                    className='unblock position-absolute start-50 text-success'
                    onClick={() => HandleConfirm(row)}
                >
                    <i className='fa fa-unlock'></i>
                </span>
                )}
            </td>
            ),
            // Không hiển thị filter cho cột này (optional)
            allowOverflow: true,
            button: true,
        },
    ]

    

    function handleSearch(event){
        const newData = listParking.filter(row =>{
            return row.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setRecords(newData)
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
                    <hr/>
                    
                </div> 
                <div className='mt-4 fs-5  row'>
                    <div className='col-12 d-flex'>
                        <div className='d-flex align-items-center text-end mb-2 rounded col-3'>
                            <i className="fa fa-search" aria-hidden="true"></i>
                            <input type='text' className='form-control' onChange={handleSearch} placeholder='Tên bãi xe...'/>
                        </div>
                        <div className='col-7'></div>
                        <div className='acctions ms-5'>
                            <button className='btn btn-warning' onClick={()=>{handleDuyetDK()}}> Duyệt đăng kí </button>
                        </div>
                    </div>
                    
                    <DataTable className='fw-bold'
                        columns={columns}
                        data={records}
                        fixedHeader
                        pagination >
                    </DataTable>
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