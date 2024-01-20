import React
 ,{useState, useEffect, useContext}
 from 'react';
import NavHeader from '../../public/Navigation/NavHeader';
import OwnerSidebar from '../OwnerSidebar/OwnerSidebar';
import {ownerGetBooking, updateConfirmBooking, updateKhachNhanXe} from "../../../services/bookingService"
import { UserContext } from '../../../context/UserContext';
import ModalThongTin from './ModalThongTin'
import {toast} from 'react-toastify';
import dayjs from 'dayjs';
import { differenceInHours, differenceInMinutes} from 'date-fns';
import DataTable from 'react-data-table-component';
// import Button from 'react-bootstrap/esm/Button';


function QLDonDatCho(props) {
    
 

    // const amount = hoursDiff 

    const user = useContext(UserContext)
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit] = useState(1000000);
    const [listBooking,setListBooking] = useState([]);

    const [isShowModalThongTin, setIsShowModalThongTin] = useState(false);
    const [dataModalThongtin, setDataModalThongtin] = useState({});
    const [total, setTotal] = useState(0);
    const [bookingData,setbookingData] = useState({});
    const [records, setRecords] = useState([]);

    useEffect(() => {
        fetchBooking();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentPage])

    const fetchBooking = async () => {
        let parkingid = user.user.account.parking.id
        let response = await ownerGetBooking(currentPage,currentLimit,parkingid);
        // console.log(response.DT.users);
        if(response && +response.EC === 0 ){
            setListBooking(response.DT.users);
            setRecords(response.DT.users)
        }
    }

    const onHideModalThongTin = async() =>{
        setIsShowModalThongTin(false);
    }
    const handleThongTin = async (item) =>{
        const currentTime = dayjs();
        // Thời gian bắt đầu
        const startTime = new Date(item.createdAt);
        // Thời gian kết thúc
        const endTime = new Date(currentTime);
        const minutesDiff = differenceInMinutes(endTime, startTime);
        const hoursDiff = differenceInHours(endTime, startTime);
        const tongtien = minutesDiff % 60 > 5 ? (hoursDiff+1) *item.giagui : hoursDiff *item.giagui;
        setTotal(tongtien) 
        // console.log(total);
        setDataModalThongtin(item);
        setIsShowModalThongTin(true);
        setbookingData(item)
    }
    const confirmBooking =  async()=>{
        let response = await updateConfirmBooking({...bookingData });
        if(response && +response.EC === 0){
            toast.success(response.EM);
            await fetchBooking();
            setIsShowModalThongTin(false);
        }else{
            toast.error(response.EM);
            setIsShowModalThongTin(false);
        }
        // console.log(bookingData.id);
    }

    const khachNhanXe = async()=>{
        const tong = total ===0 ? bookingData.giagui : total
        let response = await updateKhachNhanXe({...bookingData, tong });
        if(response && +response.EC === 0){
            toast.success(response.EM);
            await fetchBooking();
            setIsShowModalThongTin(false);
        }else{
            toast.error(response.EM);
            setIsShowModalThongTin(false);
        }
        console.log(tong);
        
        
    }

    const columns = [
        {
            name: 'Trạng thái',
            selector: row => row.stt,
            cell: (row) => {
                const bgColorClass = row.stt === 0 ? 'bg-warning bg-gradient' : 'bg-success bg-gradient';
                const chuoiXet = row.stt === 0 ? 'Chưa nhận chỗ' : 'đã nhận chỗ';
                return (
                <span className={`text-center fs-6 fw-bolder ${bgColorClass}`}>
                    {chuoiXet}
                </span>
                );
            },
            sortable: true
        },
        {
            name: 'Thời gian đặt',
            selector: row =>  dayjs(row.createdAt).format('HH:mm DD-MM-YYYY'),
            sortable: true
        },
        {
            name: 'Mã đặt chỗ',
            selector: row => row.bookingcode,
            cell: (row) => <span className="text-danger fw-bolder fs-4">{row.bookingcode}</span>,
        },
        {
            name: 'Tên người đặt',
            selector: row => row.name
        },
        {
            name: 'Biển số',
            selector: row => row.bsx
        },
        {
            name: 'Số liên hệ',
            selector: row => row.phone
        },
        {
            name: 'Email',
            selector: row => row.email
        },
        {
            name: 'Actions',
            cell: (row) => <button className='btn btn-success' onClick={() => handleThongTin(row)}>Xem</button>  
        },
    ]

    

    function handleSearch(event){
        const newData = listBooking.filter(row =>{
            return row.bookingcode.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setRecords(newData)
    }


    return(
        <>
        <NavHeader/>
        <div className='content-body row bg'>
            <div className='col-2'>
                <OwnerSidebar/>
            </div>
            <div className='col-10'>
        <div className='container'>
            <div className='manage-users-container'>
                <div className='user-header'>
                    <div className='title mt-4 text-center'>
                        <h2>DANH SÁCH CÁC PHIẾU ĐẶT CHỖ</h2>
                    </div>
                    <hr/>
                </div> 
                <div className='mt-3 fs-5  row'>
                    <div className='d-flex align-items-center text-end mb-4 rounded border col-3'>
                        <i className="fa fa-search" aria-hidden="true"></i>
                        <input type='text' className='form-control' onChange={handleSearch}  placeholder='Mã vé...'/>
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
    </div>
    <ModalThongTin
        onHide={onHideModalThongTin}
        show={isShowModalThongTin}
        dataBooking={dataModalThongtin}
        confirmBooking={confirmBooking}
        khachNhanXe={khachNhanXe}
    />
    
    </div>

    </>)
}
export default QLDonDatCho;