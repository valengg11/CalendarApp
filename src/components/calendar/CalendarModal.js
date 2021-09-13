import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import Swal from "sweetalert2";
import { uiCloseModal } from "../../redux/actions/ui";
import {
  eventAddNew,
  eventClearActiveEvent,
  eventUpdated,
} from "../../redux/actions/events";

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

const initEvent = {
  title: "",
  notes: "",
  start: now.toDate(),
  end: then.toDate(),
};

export const CalendarModal = () => {
  const dispatch = useDispatch();

  const { modalOpen } = useSelector((state) => state.ui);

  const { activeEvent } = useSelector((state) => state.calendar);

  const [startDate, setStartDate] = useState(now.toDate());
  const [endDate, setEndDate] = useState(then.toDate());
  const [titleValid, setTitleValid] = useState(true);

  const [formValues, setFormValues] = useState(initEvent);

  const { title, notes, start, end } = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    } else {
      setFormValues(initEvent);
    }
  }, [activeEvent, setFormValues]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventClearActiveEvent());
    setFormValues(initEvent);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e);
    setFormValues({
      ...formValues,
      start: e,
    });
  };

  const handleEndDateChange = (e) => {
    setEndDate(e);
    setFormValues({
      ...formValues,
      end: e,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire(
        "Ups!",
        "The end date should be after the start date",
        "error"
      );
    }

    if (title.trim().length < 2) {
      return setTitleValid(false);
    }

    if (activeEvent) {
      dispatch(eventUpdated(formValues));
    } else {
      dispatch(
        eventAddNew({
          ...formValues,
          id: new Date().getTime(),
          user: {
            _id: "123",
            name: "Valen",
          },
        })
      );
    }

    setTitleValid(true);
    closeModal();
  };

  return (
    <div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={200}
        className="modal"
        overlayClassName="modal-fondo"
      >
        <h1 className="modal-title"> New event </h1>
        <hr />
        <form className="container" onSubmit={handleSubmitForm}>
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
              minDate={startDate}
            />
          </div>

          <hr />
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className={`form-control ${!titleValid && "is-invalid"}`}
              placeholder="Event title"
              name="title"
              autoComplete="off"
              value={title}
              onChange={handleInputChange}
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
              value={notes}
              onChange={handleInputChange}
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">
              Adicional Information
            </small>
          </div>

          <button type="submit" className="btn btn-block">
            <i className="far fa-save"></i>
            <span> Save</span>
          </button>
        </form>
      </Modal>
    </div>
  );
};
