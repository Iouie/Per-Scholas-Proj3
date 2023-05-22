import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Modal from "../Modal/Modal";

const Dashboard = () => {
  const columns = [
    { id: "column-1", title: "Applied" },
    { id: "column-2", title: "Rejected" },
    { id: "column-3", title: "Interview" },
    { id: "column-4", title: "🎉🎉🎉🎉" },
  ];

  const onDragEnd = (result) => {
    // Handle drag and drop logic here
  };

  return (
    <>
      <Modal />
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
                  <h3 className="text-center text-3xl font-bold underline text-[#211572]">
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
