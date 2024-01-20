import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const ModalUnConfirm = (props) =>{
    return(
        <>
            <Modal show={props.show} onHide={props.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title> Xác nhận từ chối bãi đỗ xe</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bãi đỗ {props.dataModal.name} không đáp ứng tiêu chuẩn?</Modal.Body>
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

export default ModalUnConfirm;