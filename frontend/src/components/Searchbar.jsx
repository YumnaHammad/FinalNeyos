import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";

export default function FullScreenSearchModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      {/* Search Button */}
      <a onClick={handleShow} className="border-0">
        <FiSearch className="cursor-pointer" />
      </a>

      {/* Full-Screen Bootstrap Modal */}
      <Modal show={show} fullscreen={true} onHide={handleClose}>
        <Modal.Header closeButton className="d-flex align-items-center">
          <>Search</>
        </Modal.Header>

        <Modal.Body className="bg-light d-flex flex-column align-items-center justify-content-center">
          <Form.Group className="position-relative w-50">
            {/* Search Input */}
            <div className="search-category style-two d-flex h-48 search-form d-sm-flex d-none">
              <div className="search-form__wrapper position-relative w-100">
                <input
                  type="text"
                  className="search-form__input common-input py-13 ps-16 pe-50 rounded-30 w-100"
                  placeholder="Search"
                />
                <i className="ph ph-magnifying-glass position-absolute end-0 top-50 translate-middle-y pe-16 text-gray-500"></i>
              </div>
            </div>
          </Form.Group>
        </Modal.Body>
      </Modal>
    </div>
  );
}
