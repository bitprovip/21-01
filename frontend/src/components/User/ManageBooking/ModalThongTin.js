import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ModalThongTin = (props) =>{
    const handleCloseModalUser = () =>{
        props.onHide();
    }
    return(
        <>
            <Modal size='lg' show={props.show} className='modal-user ' onHide={()=> handleCloseModalUser()}>
                <Modal.Header closeButton className='bg-success'>
                    <Modal.Title id='contained-modal-title-vcenter' >
                        <span className='text-white fw-bolder fs-3 col-12 mx-2'>Phiếu đặt chỗ của khách</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row mb-3'>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Người đặt: </label>
                            <input className='form-control text-center' 
                             value={props?.dataBooking?.name}
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
                        <div className='col-12 col-sm-6 form-group mt-3'>
                            <label>Email </label>
                            <input className='form-control text-center' 
                             value={props?.dataBooking?.email}
                             disabled={true}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group mt-3'>
                            <label>Thời gian đặt </label>
                            <input className='form-control text-center' 
                            type='text' 
                            disabled={true}
                            value={props?.dataBooking?.createdAt}
                            />
                        </div>
                        
                        <hr className='mt-4'/>
                        <div className='col-12 form-group'>
                            <label className='fs-5 fw-bold'>Mã đặt chỗ :</label>
                            <input className='form-control fs-1 text-danger fw-bolder text text-center' 
                             value={props?.dataBooking?.bookingcode}
                             disabled={true}
                            />
                        </div>
                        <hr className='mt-4'/>
                        <div className='col-12 form-group'>
                            <label className='fs-5 fw-bold'>Biển số xe :</label>
                            <input className='form-control fs-1 text-success fw-bolder text text-center' 
                             value={props?.dataBooking?.bsx}
                             disabled={true}
                            />
                        </div>
                    </div>
                </Modal.Body>


                <Modal.Footer>
                    <Button variant='secondary' onClick={()=> handleCloseModalUser()}> Đóng</Button>
                    {/* <Button variant='primary' onClick={()=>handleChiDuong()}>
                        chỉ đường
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalThongTin;