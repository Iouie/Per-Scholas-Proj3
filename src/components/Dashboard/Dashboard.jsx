import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Modal from "../Modal/Modal";
import { getJobs, updateJob, deleteJob } from "../../utilities/dashboard";
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
  const [job, setJob] = useState(null);
  const [modal, setModal] = useState(false);
  const [delJob, setdelJob] = useState(false);

  // needed to update my useeffect state each time i open and close the modal
  const handleChildStateChange = (newState) => {
    setChildState(newState);
  };

  const handleDragEnd = (result) => {
    const { destination, source } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const sourceColumnId = source.droppableId;
    const destinationColumnId = destination.droppableId;

    // Retrieve the source column based on its ID
    const sourceColumn = columns[sourceColumnId];
    const destinationColumn = columns[destinationColumnId];

    // Get the item that was dragged
    const item = sourceColumn.items[source.index];

    // Remove the item from the source column
    const newSourceItems = Array.from(sourceColumn.items);
    newSourceItems.splice(source.index, 1);

    // Insert the item into the destination column at the specified index
    let newDestinationItems = Array.from(destinationColumn.items);

    if (sourceColumnId === destinationColumnId) {
      // Reordering within the same column
      newDestinationItems.splice(source.index, 1);
      newDestinationItems.splice(destination.index, 0, item);
    } else {
      // Moving to a different column
      newDestinationItems.splice(destination.index, 0, item);
    }

    // Create new source and destination columns with the updated item arrays
    const newSourceColumn = {
      ...sourceColumn,
      items: newSourceItems,
    };

    const newDestinationColumn = {
      ...destinationColumn,
      items: newDestinationItems,
    };

    // Create a new copy of the columns state object with the updated source and destination columns
    const newColumns = {
      ...columns,
      [sourceColumnId]: newSourceColumn,
      [destinationColumnId]: newDestinationColumn,
    };

    // Update the state with the new columns
    setColumns(newColumns);

    // Save updated column data to local storage
    localStorage.setItem("columns", JSON.stringify(newColumns));
  };
  // handle editing mongoose data
  const handleEdit = async (job) => {
    // If either of those fields are empty it'll return the same string as before
    if (!job.position || !job.company || !job.location || !job.date) {
      return;
    }

    // Additional validation for the date field
    const isValidDate = moment.utc(job.date).isValid();
    if (!isValidDate) {
      return;
    }

    try {
      await updateJob(job._id, {
        position: job.position,
        company: job.company,
        location: job.location,
        date: job.date,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // handle deleting mongoose data
  const handleDelete = async (job) => {
    try {
      await deleteJob(job._id);
      setdelJob(true);
    } catch (err) {
      console.error(err);
    }
  };

  // load data on mount
  useEffect(() => {
    const fetchData = async () => {
      const jobData = await getJobs();
      setData(jobData);
      setColumns((prevColumns) => ({
        ...prevColumns,
        column1: {
          ...prevColumns.column1,
          items: jobData,
        },
      }));
    };
    setdelJob(false);
    fetchData();
  }, [childState, modal, delJob]);

  // Save data to local storage whenever columns change
  useEffect(() => {
    localStorage.setItem("columns", JSON.stringify(columns));
  }, [columns]);

  return (
    <>
      {/* Modal for adding job application */}
      <Modal
        onStateChange={handleChildStateChange}
        job={job}
        modal={modal}
        setModal={setModal}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        setJob={setJob}
        data={data}
        setData={setData}
      />

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex justify-evenly">
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
                {columns.column1.items.map((item, index) => (
                  <Draggable
                    key={item._id}
                    draggableId={item._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="flex border-double border-4 border-[#00008B] rounded-lg justify-evenly"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="flex justify-start flex-col w-3/4">
                          <span>
                            <b>Position:</b> {item.position}
                          </span>
                          <span>
                            <b>Company:</b> {item.company}
                          </span>
                          <span>
                            <b>Location:</b> {item.location}
                          </span>
                          <span>
                            <b>Date Applied:</b>{" "}
                            {moment.utc(item.date).format("MM-DD-YY")}
                          </span>
                        </div>
                        <div className="flex justify-center items-center w-2/5">
                          <button
                            className="h-50 w-50"
                            onClick={() => {
                              const jobData = data.find(
                                (singItem) => item._id === singItem._id
                              );
                              setJob(jobData);
                              setModal(true);
                            }}
                          >
                            <img src={editPic} alt="edit"></img>
                          </button>
                          <button
                            onClick={() => {
                              const selectedJob = data.find(
                                (singItem) => item._id === singItem._id
                              );
                              handleDelete(selectedJob);
                            }}
                          >
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

          <Droppable droppableId={columns.column2.id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="my-5 border-double border-4 border-red-500 rounded-lg p-6 w-1/4 min-h-fit"
              >
                <h3 className="text-center text-3xl font-bold underline text-[#211572]">
                  {columns.column2.title}
                </h3>
                {columns.column2.items.map((item, index) => (
                  <Draggable
                    key={item._id}
                    draggableId={item._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="flex border-double border-4 border-[#00008B] rounded-lg justify-evenly bg-red-500 bg-opacity-50"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="flex justify-start flex-col w-3/4">
                          <span>
                            <b>Position:</b> {item.position}
                          </span>
                          <span>
                            <b>Company:</b> {item.company}
                          </span>
                          <span>
                            <b>Location:</b> {item.location}
                          </span>
                          <span>
                            <b>Date Applied:</b>{" "}
                            {moment.utc(item.date).format("MM-DD-YY")}
                          </span>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId={columns.column3.id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="my-5 border-double border-4 border-[#FFA500] rounded-lg p-6 w-1/4 min-h-fit"
              >
                <h3 className="text-center text-3xl font-bold underline text-[#211572]">
                  {columns.column3.title}
                </h3>
                {columns.column3.items.map((item, index) => (
                  <Draggable
                    key={item._id}
                    draggableId={item._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="flex border-double border-4 border-[#00008B] rounded-lg justify-evenly bg-yellow-200 bg-opacity-50"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="flex justify-start flex-col w-3/4">
                          <span>
                            <b>Position:</b> {item.position}
                          </span>
                          <span>
                            <b>Company:</b> {item.company}
                          </span>
                          <span>
                            <b>Location:</b> {item.location}
                          </span>
                          <span>
                            <b>Date Applied:</b>{" "}
                            {moment.utc(item.date).format("MM-DD-YY")}
                          </span>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>

          <Droppable droppableId={columns.column4.id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="my-5 border-double border-4 border-green-400 rounded-lg p-6 w-1/4 min-h-fit"
              >
                <h3 className="text-center text-3xl font-bold underline text-[#211572]">
                  {columns.column4.title}
                </h3>
                {columns.column4.items.map((item, index) => (
                  <Draggable
                    key={item._id}
                    draggableId={item._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="flex border-double border-4 border-[#00008B] rounded-lg justify-evenly bg-green-400 bg-opacity-50"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="flex justify-start flex-col w-3/4">
                          <span>
                            <b>Position:</b> {item.position}
                          </span>
                          <span>
                            <b>Company:</b> {item.company}
                          </span>
                          <span>
                            <b>Location:</b> {item.location}
                          </span>
                          <span>
                            <b>Date Applied:</b>{" "}
                            {moment.utc(item.date).format("MM-DD-YY")}
                          </span>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </>
  );
};

export default Dashboard;
