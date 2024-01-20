import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
const ModalThongTin = (props) =>{
    const handleCloseModalUser = () =>{
        props.onHide();
    }
    // const handleChiDuong = (props) =>{
    //     props.chiduong(props);
    // }
    return(
        <>
            <Modal size='lg' show={props.show} className='modal-user ' onHide={()=> handleCloseModalUser()}>
                <Modal.Header closeButton className='bg-success'>
                    <Modal.Title id='contained-modal-title-vcenter' >
                        <span className='text-white fw-bolder fs-4 col-12 mx-2'>{`${props.dataBooking.name} `}</span>
                    </Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    <div className='content-body row mb-3'>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Địa chỉ</label>
                            <input className='form-control' 
                             value={props?.dataBooking.address}
                             disabled={true}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>giá/giờ: </label>
                            <input className='form-control' 
                            type='text' 
                            disabled={true}
                            value={props?.dataBooking.price}
                            />
                        </div>
                        
                        <hr className='mt-4'/>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Số chỗ còn lại :</label>
                            <input className='form-control' 
                             value={props.dataBooking.soluong}
                             disabled={true}
                            />
                        </div>

                        <div className='col-12 col-sm-6 form-group'>
                            <label>Lượt xem:</label>
                            <input className='form-control' 
                             value={props.dataBooking.luotxem}
                             disabled={true}
                            />
                        </div>
                    </div>
                </Modal.Body>


                <Modal.Footer>
                    <Button variant='secondary' onClick={()=> handleCloseModalUser()}> Hủy</Button>
                    <Button variant='primary' onClick={props.chiDuongfromModal}>
                        chỉ đường
                    </Button>
                    <Button variant='success' onClick={props.createBooking}>
                        Đặt chỗ
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalThongTin;