// Fab: floatin action button
import React from "react";
import { useDispatch } from "react-redux";
import { uiOpenModal } from "../../redux/actions/ui";

export const AddNewFab = () => {
  const dispatch = useDispatch();
  const handleClickNew = () => {
    dispatch(uiOpenModal());
  };
  return (
    <div>
      <button className="btn fab" onClick={handleClickNew}>
        <i className="fas fa-plus" />
      </button>
    </div>
  );
};
