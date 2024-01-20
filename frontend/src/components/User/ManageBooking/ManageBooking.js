import React
 ,{useState, useEffect, useContext}
 from 'react';
import NavHeader from '../../public/Navigation/NavHeader'
import UserSidebar from '../../User/UserSidebar/UserSidebar'
import ReactPaginate from 'react-paginate';
import {getBookingCard} from "../../../services/bookingService"
import { UserContext } from '../../../context/UserContext';
import ModalThongTin from './ModalThongTin'
import dayjs from 'dayjs';

function ManageBooking(props) {
    const user = useContext(UserContext)
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit] = useState(5);
    const [listBooking,setListBooking] = useState([]);

    const [isShowModalThongTin, setIsShowModalThongTin] = useState(false);
    const [dataModalThongtin, setDataModalThongtin] = useState({});

    useEffect(() => {
        fetchBooking();
        // console.log('>>>>',listBooking);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentPage])

    const fetchBooking = async () => {
        let userid = user.user.account.userid
        let response = await getBookingCard(currentPage,currentLimit,userid);
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
    setDataModalThongtin(item);
    setIsShowModalThongTin(true);
    // console.log(item);
  }
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
                        <h2>PHIẾU ĐẶT CHỖ CỦA BẠN</h2>
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
                                                <td>{dayjs(item.createdAt).format('HH:mm DD-MM-YYYY')}</td>
                                                <td className='text-danger fw-bolder fs-4 text-center'>{item.bookingcode}</td>
                                                <td>{item.Parking.name}</td>
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
    <ModalThongTin
        onHide={onHideModalThongTin}
        show={isShowModalThongTin}
        dataBooking={dataModalThongtin}
    />
    
    </div>

    </>)
}
export default ManageBooking;