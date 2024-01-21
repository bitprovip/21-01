import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import dayjs from 'dayjs';
import { differenceInHours, differenceInMinutes  } from 'date-fns';
import {thanhToanMomo} from '../../../services/bookingService';
// import { useState } from 'react';


const ModalThongTin = (props) =>{
    const currentTime = dayjs();
    const startTime = new Date(props?.dataBooking?.updatedAt);
    // Thời gian kết thúc
    const endTime = new Date(currentTime);
    // Tính khoảng thời gian giữa hai thời điểm
    // const daysDiff = differenceInDays(endTime, startTime);
    const hoursDiff = differenceInHours(endTime, startTime);
    
    const minutesDiff = differenceInMinutes(endTime, startTime);

   
    let thoigian = minutesDiff%60 >= 0 ? hoursDiff +1 : hoursDiff
    const amount = thoigian *props?.dataBooking?.giagui

    const formattedAmount = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    }).format(amount);

    const handleCloseModalUser = () =>{
            props.onHide();
            // console.log(thoigian);
    }

    const thanhtoan = async() =>{
            let id = props?.dataBooking?.id;
            let gia = thoigian *props?.dataBooking?.giagui;
            let parkingid = props?.dataBooking?.parkingid;
            // console.log(props.dataBooking.parkingid);
            let res = await thanhToanMomo({id,gia,parkingid});
            // window.open(res?.data?.DT?.payUrl);
            window.location.href= res?.data?.DT?.payUrl;
            
    }
    return(
        <>
            <Modal size='lg' show={props.show} className='modal-user ' onHide={()=> handleCloseModalUser()}>
                <Modal.Header closeButton className='bg-success'>
                    <Modal.Title id='contained-modal-title-vcenter' >
                        <span className='text-white fw-bolder fs-3 col-12 mx-2'>Phiếu đặt chỗ của {props?.dataBooking?.name}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row'>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Email </label>
                            <input className='form-control text-center' 
                             value={props?.dataBooking?.email}
                             disabled={true}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Số điện thoại </label>
                            <input className='form-control text-center' 
                            type='text' 
                            disabled={true}
                            value={props?.dataBooking?.phone}
                            />
                        </div>

                        {props?.dataBooking?.stt === 0 ? 
                           <> <div className='col-12 col-sm-6 form-group mt-3'>
                                <label>Thời gian đặt </label>
                                <input className='form-control text-center' 
                                type='text' 
                                disabled={true}
                                value={dayjs(props?.dataBooking?.createdAt).format('HH:mm DD-MM-YYYY')} 
                                />
                            </div></>
                        : 
                        <>
                            <div className='col-12 col-sm-6 form-group mt-3'>
                                <label>Thời gian vào bãi </label>
                                <input className='form-control text-center' 
                                type='text' 
                                disabled={true}
                                value={dayjs(props?.dataBooking?.updatedAt).format('HH:mm DD-MM-YYYY')} 
                                />
                            </div></>
                        }
            
                        <div className='col-12 col-sm-6 form-group mt-3'>
                            <label>Thời gian hiện tại </label>
                            <input className='form-control text-center' 
                            type='text' 
                            disabled={true}
                            value={currentTime.format('HH:mm DD-MM-YYYY')}
                            />
                        </div>
                        
                        <hr className='mt-4'/>
                        <div className='col-12 form-group'>
                            <label className='fs-5 fw-bold'>Mã đặt chỗ :</label>
                            <input className='form-control fs-1 text-primary fw-bolder text text-center' 
                             value={props?.dataBooking?.bookingcode}
                             disabled={true}
                            />
                        </div>
                        <div className='col-12 form-group'>
                            <label className='fs-5 fw-bold'>Biển số xe :</label>
                            <input className='form-control fs-2 text-success fw-bolder text text-center' 
                             value={props?.dataBooking?.bsx}
                             disabled={true}
                            />
                        </div>
                        {props?.dataBooking?.stt === 1 ? 
                        <>
                            <hr className='mt-4'/>
                            <div className='col-12 col-sm-6 form-group '>
                                <label>Số giờ: </label>
                                <input className='form-control text-center' 
                                value={hoursDiff + ' giờ ' + minutesDiff % 60 + ' phút'}
                                disabled={true}
                                />
                            </div>
                            <div className='col-12 col-sm-6 form-group'>
                                <label>Thành tiền: <label className='fw-bolder'> {props?.dataBooking?.giagui  + 'đ/giờ'}</label> </label>
                                <input className='form-control text-center text-danger fw-bolder fs-3' 
                                type='text' 
                                disabled={true}
                                value= {formattedAmount }
                                />
                            </div>
                        </>
                        :
                        <></>
                        }
                    </div>
                </Modal.Body>


                <Modal.Footer>
                    <Button variant='secondary' onClick={()=> handleCloseModalUser()}> Đóng</Button>
                    {props?.dataBooking?.stt === 0 ?
                    <Button variant='primary' onClick={props.confirmBooking}>
                        Nhận xe
                    </Button>
                    :
                    <Button variant='primary' onClick={props.khachNhanXe}>
                        Trả tiền mặt 
                    </Button>
                    }
                    {props?.dataBooking?.stt === 0 ?
                    <></>
                    :
                    <Button variant='warning' onClick={()=> thanhtoan()}> Momo</Button>
                    }
                    
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalThongTin;