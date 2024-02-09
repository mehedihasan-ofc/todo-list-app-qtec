const EmptyData = ({ message }) => {
  return (
    <div className="flex items-center justify-center my-20">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">{message}</h2>
      </div>
    </div>
  );
};

export default EmptyData;
