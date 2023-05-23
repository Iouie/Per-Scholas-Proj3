import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Modal from "../Modal/Modal";
import { getJobs, updateJob } from "../../utilities/dashboard";
import moment from "moment/moment";
import editPic from "../../assets/edit.png";
import deletePic from "../../assets/delete.png";

const Dashboard = () => {
  const [data, setData] = useState([]); // grab data from getJobs read request
  const [form, setForm] = useState({});
  const [columns, setColumns] = useState({
    column1: {
      id: "column1",
      title: "Applied",
    },
    column2: {
      id: "column2",
      title: "Rejected",
    },
    column3: {
      id: "column3",
      title: "Interviewing",
    },
    column4: {
      id: "column4",
      title: "🎉🎉🎉🎉",
    },
  });
  const [childState, setChildState] = useState(true);

  const handleChildStateChange = (newState) => {
    setChildState(newState);
  };

  const handleForm = (formData) => {
    setForm(formData);
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

  const handleEdit = async (jobId) => {
    console.log(form);
    try {
      const jobData = data.find((item) => item._id === jobId);
      jobData.position = "Edited Position";
      await updateJob({ _id: jobData._id, position: "Hi" });
      // console.log(jobData);
    } catch (err) {
      console.error(err);
    }
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
      <Modal onStateChange={handleChildStateChange} onHandleForm={handleForm} />
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
                          className="flex text-xl"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className="flex justify-start flex-col w-3/4">
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
                              {moment(item.date).format("MM-DD-YY")}{" "}
                            </span>
                          </div>
                          <div className="flex justify-center items-center w-2/5">
                            <button
                              className="h-50 w-50"
                              onClick={() => handleEdit(item._id)}
                            >
                              <img src={editPic} alt="edit"></img>
                            </button>
                            <button>
                              <img src={deletePic} alt="delete"></img>
                            </button>
                          </div>
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
