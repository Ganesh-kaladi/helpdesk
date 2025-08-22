function Spinner({ val }) {
  return (
    <div className="flex justify-center h-full">
      <div
        className={`w-${val} h-${val} border-4 border-purple-300 border-dashed rounded-full animate-spin`}
      ></div>
    </div>
  );
}

export default Spinner;
