import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Dashboard = () => {
  const columns = [
    { id: "column-1", title: "Thinking about Applying?" },
    { id: "column-2", title: "Applied" },
    { id: "column-3", title: "Rejected" },
    { id: "column-4", title: "YOU DID IT" },
  ];

  const onDragEnd = (result) => {
    // Handle drag and drop logic here
  };

  return (
    <>
      <div className="flex align-center my-5">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-auto content-center">
          Add Job Application
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex justify-evenly">
          {/* Create columns so user can drop jobs on these columns */}
          {columns.map((column, index) => (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided) => (
                // Ensures that the container element receives the necessary reference and event listeners for drag and drop functionality.
                <div
                  className="my-5 border-double border-4 border-sky-400 rounded-lg p-6 w-1/4 min-h-fit"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h3 className="text-center text-5xl font-bold underline text-[#211572]">
                    {column.title}
                  </h3>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </>
  );
};

export default Dashboard;
