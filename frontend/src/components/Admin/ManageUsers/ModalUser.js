import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import {fetchRole, createNewUser, updateCurrentUser} from '../../../services/userService';
import {toast} from 'react-toastify';
import _ from 'lodash';


const ModalUser = (props) =>{
    const { action, dataModalUser } = props;
    const defaultUserData = {
        email: '',
        phone: '',
        username:'',
        password:'',
        address:'',
        role:''
    }

    const validInputDefault = {
        email: true,
        phone: true,
        username:true,
        password:true,
        address:true,
        role:true
    }
    const [userRoles, setUserRoles] = useState([]);

    const [userData,setUserData] = useState(defaultUserData);
    const [validInputs,setValidInputs] = useState(validInputDefault);

    useEffect(()=>{
        getRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(()=>{
        if(action === 'UPDATE'){
            setUserData({...dataModalUser, role: dataModalUser.Role ? dataModalUser.Role.id : ''});
        }
            // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dataModalUser]);

    useEffect(()=>{
        if(action === 'CREATE'){
            if(userRoles){
                // setUserData({ ...userData, role: userRoles[0].id})
                setUserData(userData)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[action])

    const getRoles = async() =>{
        let res = await fetchRole();
        if(res && res.EC ===0 ){
            setUserRoles(res.DT);
            if(res.DT && res.DT.length > 0){
                let roles = res.DT;
                setUserData({...userData, role: roles[0].id})
            }
        }else{
            toast.error(res.EM);
        }
    }

    const handleOnchangeInput = (value,name) =>{
        let _userData = _.cloneDeep(userData);
        _userData[name] = value;
        setUserData(_userData);
    }
    const isStringNumber = (str) => {
    // Sử dụng hàm isNaN để kiểm tra xem chuỗi có phải là số không
        return !isNaN(str) && !isNaN(parseFloat(str));
    }
    const checkValidateInputs = () =>{
        if(action === "UPDATE") return true;
        setValidInputs(validInputDefault);
        let arr = ['email','phone','username','password','role','address'];
        let check = true;
        for(let i =0; i< arr.length; i++){
            if(!userData[arr[i]]){
                let _validInputs = _.cloneDeep(validInputDefault);
                _validInputs[arr[i]]= false;
                setValidInputs(_validInputs);
                toast.error(`Không được để trống ${arr[i]}`);
                check=false;
                break;
            }
            let regx=/\S+@\S+\.\S+/;
            if(!regx.test(userData.email)){
                let _validInputs = _.cloneDeep(validInputDefault);
                _validInputs[arr[i]]= false;
                setValidInputs(_validInputs);
                toast.error("email không hợp lệ");
                check=false;
                break;
            }
            if(isStringNumber(userData.phone)===false)
            {
            let _validInputs = _.cloneDeep(validInputDefault);
            _validInputs[arr[i]]= false;
            setValidInputs(_validInputs);
            toast.error("sđt phải là số");
            check=false;
            break;
            }
        }
        return check;
    }

    const handleConfirmUser = async()=>{
        let check = checkValidateInputs();
        if(check === true){
            let res = action === 'CREATE' ? 
                await createNewUser({...userData, roleid: userData['role'] })
                : await updateCurrentUser({...userData, roleid: userData['role'] });

            if(res && res.EC === 0){
                props.onHide();
                setUserData({
                    ...defaultUserData, 
                    role: userRoles && userRoles.length > 0 ? userRoles[0].id : '' });
                toast.success(res.EM);

            } 
            if(res && res.EC !== 0){
                toast.error(res.EM);
                let _validInputs= _.cloneDeep(validInputDefault);
                _validInputs[res.DT] = false;
                setValidInputs(_validInputs);
            }
        }
        // console.log({...userData, roleid: userData['role'] });
    }

    const handleCloseModalUser = () =>{
        props.onHide();
        setUserData(defaultUserData);
        setValidInputs(validInputDefault);
    }

    return(
        <>
            <Modal size='lg' show={props.show} className='modal-user' onHide={()=> handleCloseModalUser()}>
                <Modal.Header closeButton>
                    <Modal.Title id='contained-modal-title-vcenter'>
                        <span>{props.action === 'CREATE' ? 'CREATE NEW USER' : 'UPDATE USER'}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row'>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Email address (<span className='red'>*</span>) :</label>
                            <input className={validInputs.email ? 'form-control' : 'form-control is-invalid'}
                             type='email' value={userData.email}
                             disabled={action ==='CREATE' ? false : true}
                            onChange={(event) => handleOnchangeInput(event.target.value,"email")} 
                            />
                        </div>

                        <div className='col-12 col-sm-6 form-group'>
                            <label>Phone number (<span className='red'>*</span>) :</label>
                            <input className= {validInputs.phone ? 'form-control' : 'form-control is-invalid'}
                            type='text' value={userData.phone}
                            disabled={action ==='CREATE' ? false : true}
                            onChange={(event) => handleOnchangeInput(event.target.value,"phone")} 
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Username:</label>
                            <input className='form-control'
                            type='text' value={userData.username}
                            onChange={(event) => handleOnchangeInput(event.target.value,"username")} 
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            {action === 'CREATE'
                                &&
                                <>
                                    <label>Password (<span className='red'>*</span>) :</label>
                                    <input className={validInputs.phone ? 'form-control' : 'form-control is-invalid'}
                                    type='password' value={userData.password}
                                    onChange={(event) => handleOnchangeInput(event.target.value,"password")} 
                                    
                                />
                                </>}
                            
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Address:</label>
                            <input className='form-control' type='text' value={userData.address}
                            onChange={(event) => handleOnchangeInput(event.target.value,"address")} 
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Role (<span className='red'>*</span>) :</label>
                            <select className={validInputs.role ? 'form-select' : 'form-select is-invalid' }
                                value={userData.role}
                                onChange={(event)=> handleOnchangeInput(event.target.value, "role")}
                            >
                                {userRoles.length > 0 &&
                                userRoles.map((item,index) =>{
                                    return(
                                        <option key={`role-${index}`} value={item.id}> {item.name}</option>
                                        // <option key={`group-${index}`} value={item.id}> {item.name}</option>
                                    )
                                })
                            }
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={()=> handleCloseModalUser()}> Close</Button>
                    <Button variant='primary' onClick={() => handleConfirmUser()}>
                        {action === 'CREATE' ? 'Save' : 'Update'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalUser;