import React
 ,{useState, useEffect, useContext}
 from 'react';
import NavHeader from '../../Admin/Navigation/NavHeader'
import UserSidebar from '../../User/UserSidebar/UserSidebar'
import ReactPaginate from 'react-paginate';
import {fechHistory} from "../../../services/bookingService"
import { UserContext } from '../../../context/UserContext';
import dayjs from 'dayjs';

function BookingHistory(props) {
    const user = useContext(UserContext)
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit] = useState(5);
    const [listBooking,setListBooking] = useState([]);

    useEffect(() => {
        fetchBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentPage])

    const fetchBooking = async () => {
        let userid = user.user.account.userid
        let response = await fechHistory(currentPage,currentLimit,userid);
        if(response && +response.EC === 0 ){
            setTotalPages(response.DT.totalPages);
            setListBooking(response.DT.users);
        }
    }

    const handlePageClick = async(event) =>{
        setCurrentPage(+event.selected + 1);
    };
    
    return(
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
                        <h2>LỊCH SỬ ĐẶT CHỖ</h2>
                    </div>
                </div> 
                <div className ='user-body mt-5 text-center fs-6'>
                    <table className ='table table-bordered table-hover bg-white'>
                        <thead>
                            <tr className='bg-info bg-gradient'>
                                <th scope='col'>Trạng thái</th>
                                <th scope='col'>Thời gian đặt</th>
                                <th scope='col'>Mã đặt chỗ</th>
                                <th scope='col'>Tên bãi đỗ</th>
                                <th scope='col'>Biển số</th>
                                <th scope='col'>Số liên hệ</th>
                                <th scope='col'>Email</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                                {listBooking && listBooking.length > 0 ? 
                                <>
                                    {listBooking.map((item, index) =>{
                                        return(
                                            <tr key={`row-${index}`}> 
                                                {item.stt ===2 ? <td className='bg-success bg-gradient text-white  text-center fs-7 fw-bolder'>Đã hoàn thành</td> 
                                                : 
                                                <td className='bg-secondary bg-gradient text-center fs-7 fw-bolder'>Đã hủy</td>}
                                                <td>{dayjs(item.createdAt).format('HH:mm DD-MM-YYYY')}</td>
                                                <td className='text-danger fw-bolder fs-4'>{item.bookingcode}</td>
                                                <td>{item.parkingid}</td>
                                                <td>{item.bsx}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.email}</td>
                                            </tr>
                                        )
                                    })}
                                </>    
                                :
                                <>
                                <tr className='fs-5'>
                                    <td className='border border-end-0'>Chưa có lịch sử đặt chỗ</td>
                                    
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
    
    </div>

    </>)
}

export default BookingHistory;