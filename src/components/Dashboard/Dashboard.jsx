import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Modal from "../Modal/Modal";
import { getJobs } from "../../utilities/dashboard";
import moment from "moment/moment";
import editPic from "../../assets/edit.png";
import deletePic from "../../assets/delete.png";

const Dashboard = () => {
  const [data, setData] = useState([]); // grab data from getJobs read request
  const [columns, setColumns] = useState({
    column1: {
      id: "column1",
      title: "Applied",
      items: [],
    },
    column2: {
      id: "column2",
      title: "Rejected",
      items: [],
    },
    column3: {
      id: "column3",
      title: "Interviewing",
      items: [],
    },
    column4: {
      id: "column4",
      title: "🎉🎉🎉🎉",
      items: [],
    },
  });
  const [childState, setChildState] = useState(true);

  const handleChildStateChange = (newState) => {
    setChildState(newState);
  };

  const handleDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    // If the item is dropped in the same position, do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Retrieve the source and destination columns based on their IDs
    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];

    // Get the item that was dragged
    const item = data[source.index];

    // Update the data array by removing the dragged item from the source index
    // and inserting it at the destination index
    setData((prevData) => {
      const newData = [...prevData];
      newData.splice(source.index, 1);
      newData.splice(destination.index, 0, item);
      return newData;
    });

    // Update the columns state with the updated items array
    setColumns({
      ...columns,
      [sourceColumn.id]: {
        ...sourceColumn,
        items: [...data],
      },
      [destinationColumn.id]: {
        ...destinationColumn,
        items: [...data],
      },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const jobData = await getJobs();
      setData(jobData);
    };

    fetchData();
  }, [childState]);

  return (
    <>
      <Modal onStateChange={handleChildStateChange} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex justify-evenly">
          {/* COL 1 */}
          <Droppable droppableId={columns.column1.id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="my-5 border-double border-4 border-sky-400 rounded-lg p-6 w-1/4 min-h-fit"
              >
                <h3 className="text-center text-3xl font-bold underline text-[#211572]">
                  {columns.column1.title}
                </h3>
                {/* DRAGGABLE DIV HERE */}
                {data.map((item, index) => (
                  <Draggable
                    key={item._id}
                    draggableId={item._id}
                    index={index}
                  >
                    {(provided) => (
                      <div className="flex border-double border-4 border-[#00008B] rounded-lg justify-evenly ">
                        <div
                          className="flex justify-start w-3/4 text-xl flex-col"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <span>
                            <b>Position:</b> {item.position}{" "}
                          </span>
                          <span>
                            <b>Company:</b> {item.company}{" "}
                          </span>
                          <span>
                            <b>Location:</b> {item.location}{" "}
                          </span>
                          <span>
                            <b> Date Applied:</b>{" "}
                            {moment(item.date).format("MM-DD-YYYY")}{" "}
                          </span>
                        </div>
                        <div className="flex justify-center items-center w-2/4">
                          <button className="h-50 w-50">
                            <img src={editPic} alt="edit"></img>
                          </button>
                          <button>
                            <img src={deletePic} alt="delete"></img>
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* COL 2 */}
          <Droppable droppableId="column2">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="my-5 border-double border-4 border-sky-400 rounded-lg p-6 w-1/4 min-h-fit"
              >
                <h3 className="text-center text-3xl font-bold underline text-[#211572]">
                  {columns.column2.title}
                </h3>
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* COL 3 */}
          <Droppable droppableId="column3">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="my-5 border-double border-4 border-sky-400 rounded-lg p-6 w-1/4 min-h-fit"
              >
                <h3 className="text-center text-3xl font-bold underline text-[#211572]">
                  {columns.column3.title}
                </h3>
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* COL 4 */}
          <Droppable droppableId="column4">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="my-5 border-double border-4 border-sky-400 rounded-lg p-6 w-1/4 min-h-fit"
              >
                <h3 className="text-center text-3xl font-bold underline text-[#211572]">
                  {columns.column4.title}
                </h3>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </>
  );
};

export default Dashboard;
