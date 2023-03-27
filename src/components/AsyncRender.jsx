const AsyncRender = ({ isLoading, isError, error }) => {
  if (isLoading) {
    <p>Loading...</p>;
  } else if (isError) {
    <p>{error}</p>;
  }

  return;
};
export default AsyncRender;
