import React, { useState, useEffect } from 'react';
import './Users.scss'
import {fetchAllUser, deleteUser} from "../../../services/userService"
import ReactPaginate from 'react-paginate';
import AdminSidebar from '../Sidebar/AdminSidebar'
import {toast} from 'react-toastify';
import ModalDelete from "./ModalDelete"
import ModalUser from "./ModalUser"
import NavHeader from '../Navigation/NavHeader'

const Users = (props) => {
    const [listUsers,setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataModal,setDataModal] = useState({});

    const [isShowModalUser, setIsShowModalUser] = useState(false);

    const [actionModalUser, setActionModalUser] = useState("CREATE");
    const [dataModalUser, setDataModalUser] = useState({});

    useEffect(() => {
        fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentPage])

    const fetchUsers = async () => {
        let response = await fetchAllUser(currentPage,currentLimit);
        if(response && +response.EC === 0 ){
            setTotalPages(response.DT.totalPages);
            setListUsers(response.DT.users);
        }
    }

    const handlePageClick = async(event) =>{
        setCurrentPage(+event.selected + 1);
    };

    const handleDeleteUser = async(user) =>{
        setDataModal(user);
        setIsShowModalDelete(true);
        // console.log(user);
    }

    const handleClose = () =>{
        setIsShowModalDelete(false);
        setDataModal({});
    }

    const confirmDeleteUser = async()=>{
        let response = await deleteUser(dataModal);
        if(response && +response.EC === 0){
            toast.success(response.EM);
            await fetchUsers();
            setIsShowModalDelete(false);
        }else{
            toast.error(response.EM);
        }
    }

    const onHideModalUser = async() =>{
        setIsShowModalUser(false);
        setDataModalUser({});
        await fetchUsers();
    }

    const handleEditUser = (user) =>{
        setActionModalUser("UPDATE");
        setDataModalUser(user);
        setIsShowModalUser(true);
        // console.log(dataModalUser);
    }

    return(
        <div className=''>
        <NavHeader />
        <div className='content-body row bg'>
            <div className='col-2'>
                <AdminSidebar/>
            </div>
            <div className='col-10'>
                <div className='container'>
                <div className='manage-users-container'>
                    <div className='user-header'>
                        <div className='title mt-4 text-center'>
                            <h2>QUẢN LÝ NGƯỜI DÙNG</h2>
                        </div>
                        
                        <div className='acctions mb-2 mt-4'>
                            {/* <button className='btn btn-success mx-1'> Refesh</button> */}
                            <button className='btn btn-success' 
                            onClick={()=> {
                                setIsShowModalUser(true);
                                setActionModalUser("CREATE");
                            }}
                            > Add User</button>

                        </div>
                    </div> 
                    <div className ='user-body mt-4'>
                        <table className ='table table-bordered table-hover border border-dark '>
                            <thead>
                                <tr className='bg-info'>
                                    <th scope='col'>id </th>
                                    <th scope='col'>email</th>
                                    <th scope='col'>username</th>
                                    <th scope='col'>Phone</th>
                                    <th scope='col'>role</th>
                                    <th >actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listUsers && listUsers.length > 0 ? 
                                <>
                                    {listUsers.map((item, index) =>{
                                        return(
                                            <tr key={`row-${index}`}> 
                                                <td className='bg-secondary text-center'> {item.id}</td>
                                                <td>{item.email}</td>
                                                <td>{item.username}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.Role ? item.Role.name: ''}</td>
                                                <td>
                                                    <span
                                                        title='Edit'
                                                        className='edit'
                                                        onClick={()=> handleEditUser(item)}
                                                    >
                                                        <i className='fa fa-pencil'></i>
                                                    </span>
                                                    <span
                                                        title='Delete'
                                                        className='delete'
                                                        onClick={()=> handleDeleteUser(item)}
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
                    confirmDeleteUser={confirmDeleteUser}
                    dataModal={dataModal}
                />

                <ModalUser
                    onHide={onHideModalUser}
                    show={isShowModalUser}
                    action={actionModalUser}
                    dataModalUser={dataModalUser}
                />
            </div>
        </div>

        </div>
    )
}

export default Users;