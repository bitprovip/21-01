import React, { useState, useEffect } from 'react';
import './Users.scss'
import {fetchAllUser, deleteUser} from "../../../services/userService"
import ReactPaginate from 'react-paginate';
import AdminSidebar from '../Sidebar/AdminSidebar'
import {toast} from 'react-toastify';
import ModalDelete from "./ModalDelete"
import ModalUser from "./ModalUser"
import NavHeader from '../Navigation/NavHeader'
import DataTable from 'react-data-table-component';

const Users = (props) => {
    const [listUsers,setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit] = useState(100);
    const [totalPages, setTotalPages] = useState(0);
    const [records, setRecords] = useState([]);

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
            setRecords(response.DT.users)
        }
    }


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

    const columns = [
        {
            name: 'id ',
            selector: row =>  row.id,
            sortable: true
        },
        {
            name: 'Username',
            selector: row => row.username,
            cell: (row) => <span className="text-primary fw-bold fs-7">{row.username}</span>,
        },
        {
            name: 'Phone',
            selector: row => row.phone
        },
        {
            name: 'Email',
            selector: row => row.email
        },
        {
            name: 'Role',
            selector: row => row.Role.name
        },
        {
    name: 'Actions',
    cell: (row) => (
      <td className='position-relative'>
        <span
          title='Edit'
          className='edit'
          onClick={() => handleEditUser(row)}
        >
          <i className='fa fa-pencil'></i>
        </span>
        <span
          title='Delete'
          className='delete'
          onClick={() => handleDeleteUser(row)}
        >
          <i className='fa fa-trash-o'></i>
        </span>
      </td>
    ),
    // Không hiển thị filter cho cột này (optional)
    allowOverflow: true,
    button: true,
  },
    ]

    

    function handleSearch(event){
        const newData = listUsers.filter(row =>{
            return row.username.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setRecords(newData)
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
                        <hr/>
                        
                        {/* <div className='acctions mb-2 mt-3 text-end'>
                            <button className='btn btn-success' 
                            onClick={()=> {
                                setIsShowModalUser(true);
                                setActionModalUser("CREATE");
                            }}
                            > Add User</button>

                        </div> */}
                    </div> 
                    <div className ='user-body mt-4'>
                        <div className='d-flex col-12 mb-2'>
                            <div className='d-flex align-items-center text-end rounded border col-3'>
                                <i className="fa fa-search" aria-hidden="true"></i>
                                <input type='text' className='form-control' onChange={handleSearch}  placeholder='Tên người dùng...'/>
                            </div>
                            <div className='col-8'></div>
                             <div className='acctions'>
                            <button className='btn btn-success' 
                                onClick={()=> {
                                setIsShowModalUser(true);
                                setActionModalUser("CREATE");
                            }}
                            > Add User</button>

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