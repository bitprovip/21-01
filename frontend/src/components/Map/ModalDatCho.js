import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState, 
    useContext,
    useEffect
}from 'react';
import {useHistory} from "react-router-dom"; 
import {toast} from 'react-toastify';
// import { Redirect } from "react-router-dom";
import _ from 'lodash';
import {UserContext} from '../../context/UserContext'
import {createBooking} from '../../services/bookingService';

const ModalDatCho = (props) =>{
    const history = useHistory();
    const { dataBooking } = props;
    const {user} = useContext(UserContext)
    const validInputDefault = {
        email: true,
        phone: true,
        name:true,
        bsx:true,
    }
    const [validInputs,setValidInputs] = useState(validInputDefault);
    const defaultthongtindanhan = {
        email: user.account.email,
        phone: user.account.phone,
        name: user.account.username,
        userid: user.account.userid,
        bsx:user.account.bsx,
        thoigian:'1'
    }
    
    const [thongtindanhap,setthongtindanhap] = useState(defaultthongtindanhan);
    useEffect(()=>{
        setthongtindanhap({ ...thongtindanhap });
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dataBooking]);

    const handleOnchangeInput = (value,name) =>{
        let _thongtindanhap = _.cloneDeep(thongtindanhap);
        _thongtindanhap[name] = value;
        setthongtindanhap(_thongtindanhap);
    }
    const isStringNumber = (str) => {
    // Sử dụng hàm isNaN để kiểm tra xem chuỗi có phải là số không
        return !isNaN(str) && !isNaN(parseFloat(str));
    }
    const checkValidateInputs = () =>{
        setValidInputs(validInputDefault);
        let arr = ['email','phone','name','bsx'];
        let check = true;
        for(let i =0; i< arr.length; i++){
            if(!thongtindanhap[arr[i]]){
                let _validInputs = _.cloneDeep(validInputDefault);
                _validInputs[arr[i]]= false;
                setValidInputs(_validInputs);
                toast.error(`Không được để trống ${arr[i]}`);
                check=false;
                break;
            }
            let regx=/\S+@\S+\.\S+/;
            if(!regx.test(thongtindanhap.email)){
                let _validInputs = _.cloneDeep(validInputDefault);
                _validInputs[arr[i]]= false;
                setValidInputs(_validInputs);
                toast.error("email không hợp lệ");
                check=false;
                break;
            }
            if(isStringNumber(thongtindanhap.phone)===false)
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
    const handleConfirmDatCho = async()=>{
        let check = checkValidateInputs();
        let parkingid = props.dataBooking.id
        let giagui = props.dataBooking.price
        if(check === true){
            let res= await createBooking({...thongtindanhap,giagui,parkingid})
            if(res && res.EC === 0){
                props.onHide();
                toast.success(res.EM + ', vui lòng nhận chỗ trong 30p');
            } 
            if(res && res.EC !== 0){
                toast.error(res.EM);
                let _validInputs= _.cloneDeep(validInputDefault);
                _validInputs[res.DT] = false;
                setValidInputs(_validInputs);
            }
            // history.push("/checkout");
        }
        // console.log({...thongtindanhap,giagui,parkingid});
        // console.log(props);
    }

    const handleCloseModalUser = () =>{
        props.onHide();
        setthongtindanhap(defaultthongtindanhan);
    }

    return(
        <>
            <Modal size='lg' show={props.show} className='modal-user' onHide={()=> handleCloseModalUser()}>
                <Modal.Header closeButton className='bg-success'>
                    <Modal.Title id='contained-modal-title-vcenter' >
                        <span>Đặt chỗ đậu xe </span>
                    </Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    <div className='content-body row mb-3'>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Tên bãi xe:</label>
                            <input className='form-control' 
                             value={props.dataBooking.name}
                             onChange={(event) => handleOnchangeInput(event.target.value,"nameparking")} 
                             disabled={true}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>giá/giờ: </label>
                            <input className='form-control' 
                            type='text' 
                            disabled={true}
                            value={props.dataBooking.price}
                            />
                        </div>
                        
                        <hr className='mt-4'/>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Email address (<span className='red'>*</span>) :</label>
                            <input className='form-control' 
                             value={thongtindanhap.email}
                             onChange={(event) => handleOnchangeInput(event.target.value,"email")} 
                            />
                        </div>

                        <div className='col-12 col-sm-6 form-group'>
                            <label>Phone number (<span className='red'>*</span>) :</label>
                            <input className='form-control' 
                            type='text' 
                            value={thongtindanhap.phone}
                            onChange={(event) => handleOnchangeInput(event.target.value,"phone")} 
                            />
                        </div>

                        <div className='col-12 col-sm-6 form-group'>
                            <label>Username:</label>
                            <input className='form-control'
                            type='text' 
                            value={thongtindanhap.name}
                            onChange={(event) => handleOnchangeInput(event.target.value,"name")} 
                            />
                        </div>

                        <div className='col-12 col-sm-6 form-group'>
                            <label>Biển số xe (<span className='red'>*</span>) :</label>
                            <input className='form-control' 
                                type='text' 
                                value={thongtindanhap.bsx}
                                onChange={(event) => handleOnchangeInput(event.target.value,"bsx")} 
                            />
                        </div>
                    </div>
                </Modal.Body>
                {/* <hr/>
                <Modal.Body className='row'>
                    <label className='text-success fw-bolder col-12 col-sm-12'> *Phí dịch vụ: 2000 VNĐ </label>    
                    <div className='col-12 col-sm-3 form-group mt-3 '>
                            <label className=' fs-5'>Thời gian đặt chỗ:</label>
                    </div>
                    <div className='col-12 col-sm-2 form-group mt-3'>
                            <input className='form-control' 
                                type='text' 
                                value={thongtindanhap.thoigian}
                                onChange={(event) => handleOnchangeInput(event.target.value,"thoigian")} 
                            />
                        </div>

                    
                    <h3 className='text-end mt-3 text-danger fw-bolder'> Tổng tiền: {thongtindanhap.thoigian *props.dataBooking.price + 2000} </h3>               
                </Modal.Body> */}


                <Modal.Footer>
                    <Button variant='secondary' onClick={()=> handleCloseModalUser()}> Hủy</Button>
                    <Button variant='primary' onClick={() => handleConfirmDatCho()}>
                        Đặt chỗ
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDatCho;