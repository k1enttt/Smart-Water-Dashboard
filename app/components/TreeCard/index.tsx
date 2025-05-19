const TreeCard = ({data}:{data: any}) => {

  return (
    <button className="flex justify-between w-full bg-gray-300 dark:bg-gray-200 px-4 py-2 hover:bg-gray-100 cursor-pointer">
      <div>{data.name}</div>
      <div className="flex gap-4">
        <div>Age: {data.age}</div>
        <div>Humidity: {data.humidity}%</div>
      </div>
    </button>
  );
};

export default TreeCard;
