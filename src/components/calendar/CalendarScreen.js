import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Navbar } from "../ui/Navbar";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import { useDispatch } from "react-redux";
import { uiOpenModal } from "../../redux/actions/ui";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { eventSetActive } from "../../redux/actions/events";

const localizer = momentLocalizer(moment);
const events = [
  {
    title: "Cumpleaños del jefe",
    start: moment().toDate(),
    end: moment().add(2, "hours").toDate(),
    notes: "Comprar el pastel",
    user: {
      _id: "123",
      name: "Valen Gomez",
    },
  },
];

export const CalendarScreen = () => {

  // const state = useSelector(state => state.events)
  // const {activeEvent} = state


  const dispatch = useDispatch()

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const onDoubleClick = () => {
    dispatch(uiOpenModal())
  };

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e))
    console.log(e);
  };

  const onViewChange = (e) => {
    setLastView(e)
    localStorage.setItem("lastView", e);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#900C3F",
      color: "white",
      border: "none",
    };

    return {
      style,
    };
  };
  return (
    <div className=".calendar-screen">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        view= {lastView}
        components={{
          event: CalendarEvent,
        }}
      />
      <CalendarModal/>
    </div>
  );
};
