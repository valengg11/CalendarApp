import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
  const closeModal = () => {
    console.log("closing");
  };
  return (
    <div>
      <Modal
        isOpen={true}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={200}
        className="modal"
        overlayClassName="modal-fondo"
      >
        <h1 className='modal-title'> New event </h1>
        <hr />
        <form className="container">
          <div className="form-group">
            <label>Start date and time</label>
            <input className="form-control" placeholder="Start date" />
          </div>

          <div className="form-group">
            <label>End date and time</label>
            <input className="form-control" placeholder="End date" />
          </div>

          <hr />
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Event title"
              name="title"
              autoComplete="off"
            />
            <small id="emailHelp" className="form-text text-muted">
              A short description
            </small>
          </div>

          <div className="form-group">
            <textarea
              type="text"
              className="form-control"
              placeholder="Notes"
              rows="5"
              name="notes"
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">
              Adicional Information
            </small>
          </div>

          <button type="submit" className="btn btn-outline-primary btn-block">
            <i className="far fa-save"></i>
            <span> Save</span>
          </button>
        </form>
      </Modal>
    </div>
  );
};
