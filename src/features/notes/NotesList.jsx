import { useGetNotesQuery } from "./notesApiSlice";
import Note from "./Note";
import useAuth from "../hooks/useAuth";

const NotesList = () => {
  const { username, isAdmin, isManager } = useAuth();

  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery("notesList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const Content = () => {
    if (isLoading) return <p>Loading...</p>;

    if (isError) {
      return <p className="errmsg">{error.data.message}</p>;
    }

    if (isSuccess) {
      const { ids, entities } = notes;

      let filteredIds;
      if (isManager || isAdmin) {
        filteredIds = [...ids];
      } else {
        filteredIds = ids.filter(
          (note) => entities[note].username === username
        );
      }

      const tableContent = filteredIds?.length
        ? filteredIds.map((noteId) => <Note key={noteId} noteId={noteId} />)
        : null;

      return (
        <table className="table table--notes">
          <thead className="table__thead">
            <tr>
              <th scope="col" className="table__th note__status">
                Completed
              </th>
              <th scope="col" className="table__th note__created">
                Created
              </th>
              <th scope="col" className="table__th note__updated">
                Updated
              </th>
              <th scope="col" className="table__th note__title">
                Title
              </th>
              <th scope="col" className="table__th note__username">
                Owner
              </th>
              <th scope="col" className="table__th note__edit">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      );
    }
  };

  return <Content />;
};
export default NotesList;
