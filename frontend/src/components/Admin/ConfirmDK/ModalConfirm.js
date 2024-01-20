import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const ModalConfirm = (props) =>{
    return(
        <>
            <Modal show={props.show} onHide={props.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title> Xác nhận thông tin bãi đỗ xe</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bãi đỗ {props.dataModal.name} đã đúng thông tin?</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={props.handleClose}>
                        Đóng
                    </Button>
                    <Button variant='primary' onClick={props.confirmParking}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalConfirm;