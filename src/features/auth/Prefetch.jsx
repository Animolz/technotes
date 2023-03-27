import { store } from "../../app/store";
import { usersApiSlice } from "../users/usersApiSlice";
import { notesApiSlice } from "../notes/notesApiSlice";
import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  const shouldRun = useRef(true);

  useEffect(() => {
    if (!shouldRun) return;

    console.log("subcribing");
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
    const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate());

    return () => {
      console.log("unsubscribing");
      notes.unsubscribe();
      users.unsubscribe();
      shouldRun.current = false;
    };
  });

  return <Outlet />;
};
export default Prefetch;
