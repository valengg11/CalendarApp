import moment from "moment";
import { types } from "../types/types";

const initialState = {
  events: [
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
  ],
  activeEvent: null,
};

export const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload,
      }

    default:
      return state;
  }
};
