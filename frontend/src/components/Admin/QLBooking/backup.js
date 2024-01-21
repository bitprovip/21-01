import React
 ,{useState, useEffect}
 from 'react';
import NavHeader from '../Navigation/NavHeader'
import AdminSidebar from '../Sidebar/AdminSidebar'
import ReactPaginate from 'react-paginate';
import {fetchAllBooking, deleteBooking} from "../../../services/bookingService"
import {toast} from 'react-toastify';
import ModalDelete from "./ModalDelete"

function QLBooking(props) {
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit] = useState(5);
    const [listBooking,setListBooking] = useState([]);
    const [dataModal,setDataModal] = useState({});

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    useEffect(() => {
        fetchBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentPage])

    const fetchBooking = async () => {
        let response = await fetchAllBooking(currentPage,currentLimit);
        if(response && +response.EC === 0 ){
            setTotalPages(response.DT.totalPages);
            setListBooking(response.DT.users);
        }
    }

    const handlePageClick = async(event) =>{
        setCurrentPage(+event.selected + 1);
    };
    
    const handleDelete = async(user) =>{
        setDataModal(user);
        setIsShowModalDelete(true);
        // console.log(user);
    }
    const confirmDelete = async()=>{
        let response = await deleteBooking(dataModal);
        if(response && +response.EC === 0){
            toast.success(response.EM);
            await fetchBooking();
            setIsShowModalDelete(false);
        }else{
            toast.error(response.EM);
        }
    }
    const handleClose = () =>{
        setIsShowModalDelete(false);
        setDataModal({});
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
                </div> 
                <div className ='user-body mt-5 text-center fs-6'>
                    <table className ='table table-bordered table-hover border border-dark'>
                        <thead>
                            <tr className='bg-info bg-gradient'>
                                <th scope='col'>Trạng thái</th>
                                <th scope='col'>Thời gian đặt</th>
                                <th scope='col'>Mã đặt chỗ</th>
                                <th scope='col'>Tên bãi đỗ</th>
                                <th scope='col'>Người đặt</th>
                                <th scope='col'>Biển số</th>
                                <th scope='col'>Số liên hệ</th>
                                <th scope='col'>Email</th>
                                <th >actions</th>
                            </tr>
                        </thead>
                        <tbody>
                                {listBooking && listBooking.length > 0 ? 
                                <>
                                    {listBooking.map((item, index) =>{
                                        return(
                                            <tr key={`row-${index}`}> 
                                                {item.stt ===0 ? <td className='bg-warning bg-gradient text-center fs-7 fw-bolder'>Chưa nhận chỗ</td> 
                                                // : item.stt === 1 ?
                                                :
                                                <td className='bg-success bg-gradient text-white text-center fs-7 fw-bolder'>Đã nhận chỗ</td>}
                                                {/* // :
                                                // <td className='bg-secondary bg-gradient text-white text-center fs-7 fw-bolder'>Đã hủy</td>} */}
                                                <td>{item.createdAt}</td>
                                                <td className='text-danger fw-bolder fs-4'>{item.bookingcode}</td>
                                                <td>{item.parkingid}</td>
                                                <td>{item.userid}</td>
                                                <td>{item.bsx}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.email}</td>
                                                <td className='position-relative'>
                                                    <span
                                                        title='Delete'
                                                        className='delete position-absolute start-50'
                                                        onClick={()=> handleDelete(item)}
                                                    >
                                                        <i className='fa fa-trash-o'></i>
                                                    </span>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </>    
                                :
                                <>
                                <tr>
                                    <td>not found User</td>
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
        <ModalDelete 
                    show={isShowModalDelete}
                    handleClose={handleClose}
                    confirmDeleteUser={confirmDelete}
                    dataModal={dataModal}
        />
    </div>
    
    </div>

    </>)
}
export default QLBooking;