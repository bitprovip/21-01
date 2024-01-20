import React
 ,{useState, useEffect, useContext}
 from 'react';
import NavHeader from '../../public/Navigation/NavHeader';
import OwnerSidebar from '../OwnerSidebar/OwnerSidebar';
import ReactPaginate from 'react-paginate';
import {ownerGetBooking, updateConfirmBooking, updateKhachNhanXe} from "../../../services/bookingService"
import { UserContext } from '../../../context/UserContext';
import ModalThongTin from './ModalThongTin'
import {toast} from 'react-toastify';
import dayjs from 'dayjs';
import { differenceInHours, differenceInMinutes} from 'date-fns';
import DataTable from 'react-data-table-component';


function QLDonDatCho(props) {
    
 

    // const amount = hoursDiff 

    const user = useContext(UserContext)
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit] = useState(5);
    const [listBooking,setListBooking] = useState([]);

    const [isShowModalThongTin, setIsShowModalThongTin] = useState(false);
    const [dataModalThongtin, setDataModalThongtin] = useState({});
    const [total, setTotal] = useState(0);
    const [bookingData,setbookingData] = useState({});

    useEffect(() => {
        fetchBooking();
        // console.log(user.user.account.parking.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentPage])

    const fetchBooking = async () => {
        let parkingid = user.user.account.parking.id
        let response = await ownerGetBooking(currentPage,currentLimit,parkingid);
        // console.log(response.DT.users);
        if(response && +response.EC === 0 ){
            setTotalPages(response.DT.totalPages);
            setListBooking(response.DT.users);
        }
    }

    const handlePageClick = async(event) =>{
        setCurrentPage(+event.selected + 1);
    };
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
                </div> 
                <div className ='user-body mt-5 text-center fs-6'>
                    <table  className ='table table-bordered table-hover bg-white'>
                        <thead>
                            <tr className='bg-info bg-gradient'>
                                <th scope='col'>Trạng thái</th>
                                <th scope='col'>Thời gian đặt</th>
                                <th scope='col'>Mã đặt chỗ</th>
                                <th scope='col'>Tên bãi đỗ</th>
                                <th scope='col'>Biển số</th>
                                <th scope='col'>Số liên hệ</th>
                                <th scope='col'>Email</th>
                                <th scope='col'>Actions</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                                {listBooking && listBooking.length > 0 ? 
                                <>
                                    {listBooking.map((item, index) =>{
                                        return(
                                            <tr key={`row-${index}`}> 
                                                {item.stt ===0 ? <td className='bg-warning bg-gradient text-center fs-7 fw-bolder'>Chưa nhận chỗ</td> 
                                                : 
                                                <td className='bg-success bg-gradient text-center fs-7 fw-bolder'>Đã nhận chỗ</td>}
                                                <td>{item.createdAt}</td>
                                                <td className='text-danger fw-bolder fs-4 text-center'>{item.bookingcode}</td>
                                                <td>{item.User.username}</td>
                                                <td>{item.bsx}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.email}</td>
                                                <td>
                                                    <button className='btn btn-success' onClick={() => handleThongTin(item)}>Xem</button>    
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </>    
                                :
                                <>
                                <tr className='fs-5'>
                                    <td className='border border-end-0'>Chưa có ai đặt chỗ</td>
                                    
                                </tr>
                                </>
                            }
                            </tbody>

                    </table>
                </div>
            </div>
            {totalPages > 0 &&
                <div className='user-footer'>
                    <ReactPaginate 
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={4}
                        pageCount={totalPages}
                        previousLabel="< prev"
                        pageClassName='page-item'
                        pageLinkClassName='page-link'
                        previousClassName='page-item'
                        previousLinkClassName='page-link'
                        nextClassName='page-item'
                        nextLinkClassName='page-link'
                        breakLabel="..."
                        breakClassName='page-item'
                        breakLinkClassName='page-link'
                        containerClassName='pagination'
                        activeClassName='active'
                        renderOnZeroPageCount={null}       
                    />
                </div>
                }
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