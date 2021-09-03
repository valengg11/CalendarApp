import React, { useState } from "react";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";

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

const now = moment().minutes(0).seconds(0).add(1, "hours");
const then = now.clone().add(1, "hours");

export const CalendarModal = () => {
  const [startDate, setStartDate] = useState(now.toDate());
  const [endDate, setEndDate] = useState(then.toDate());

  const closeModal = () => {
    console.log("closing");
  };

  const handleStartDateChange = (e) => {
    setStartDate(e);
    console.log(e);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e);
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
        <h1 className="modal-title"> New event </h1>
        <hr />
        <form className="container">
          <div className="form-group">
            <label>Start date and time</label>
            <br />

            <DateTimePicker
              onChange={handleStartDateChange}
              value={startDate}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>End date and time</label>
            <br />

            <DateTimePicker
              onChange={handleEndDateChange}
              value={endDate}
              className="form-control"
              minDate = {startDate}
            />
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
