import React
 ,{useState, useEffect}
 from 'react';
import NavHeader from '../Navigation/NavHeader'
import AdminSidebar from '../Sidebar/AdminSidebar'
import {fetchAllBooking} from "../../../services/bookingService"
// import {toast} from 'react-toastify';
import DataTable from 'react-data-table-component';
import dayjs from 'dayjs';
import { differenceInHours, differenceInMinutes} from 'date-fns';
import ModalThongTin from './ModalThongTin'


function QLBooking(props) {
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit] = useState(100);
    const [listBooking,setListBooking] = useState([]);
    const [bookingData,setbookingData] = useState({});
    const [records, setRecords] = useState([]);
    const [total, setTotal] = useState(0);
    const [dataModalThongtin, setDataModalThongtin] = useState({});
    const [isShowModalThongTin, setIsShowModalThongTin] = useState(false);

    useEffect(() => {
        fetchBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentPage])

    const fetchBooking = async () => {
        let response = await fetchAllBooking(currentPage,currentLimit);
        if(response && +response.EC === 0 ){
            setTotalPages(response.DT.totalPages);
            setListBooking(response.DT.users);
            setRecords(response.DT.users)
        }
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
    const onHideModalThongTin = async() =>{
        setIsShowModalThongTin(false);
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
                <AdminSidebar/>
            </div>
            <div className='col-10'>
        <div className='container'>
            <div className='manage-users-container'>
                <div className='user-header'>
                    <div className='title mt-4 text-center'>
                        <h2>QUẢN LÝ ĐƠN ĐẶT CHỖ</h2>
                    </div>
                    <hr/>
                </div> 
                <div className ='user-body mt-3 text-center fs-6'>
                    <div className='d-flex align-items-center text-end mb-2 rounded border col-3'>
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
        <ModalThongTin
            onHide={onHideModalThongTin}
            show={isShowModalThongTin}
            dataBooking={dataModalThongtin}
        />
    </div>
    
    </div>

    </>)
}
export default QLBooking;