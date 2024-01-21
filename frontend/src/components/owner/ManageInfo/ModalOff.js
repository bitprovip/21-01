import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const ModalOff = (props) =>{
    return(
        <>
            <Modal show={props.show} onHide={props.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title> Mở bãi đỗ</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bãi đỗ {props.dataModal.name} sẽ được mở cửa trở lại?</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={props.handleClose}>
                        Đóng
                    </Button>
                    <Button variant='primary' onClick={props.unConfirmParking}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalOff;