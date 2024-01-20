import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const ModalDelete = (props) =>{
    return(
        <>
            <Modal show={props.show} onHide={props.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title> Xác nhận xóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>bạn muốn xóa người dùng: {props.dataModal.email} ?</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={props.handleClose}>
                        close
                    </Button>
                    <Button variant='primary' onClick={props.confirmDeleteUser}>
                        confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDelete;