import { useState } from "react";

export default function Modal() {
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({});

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  const handleModal = (e) => {
    e.preventDefault();

    closeModal();
  };

  return (
    <>
      <div className="flex align-center my-5">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-auto content-center"
          onClick={openModal}
        >
          Add Job Application
        </button>
      </div>
      {modal && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg p-6 bg-[#106ee8] ">
          <div className="text-2xl font-bold mb-4 text-center">
            <p className="p-5">Job Application</p>
            <form
              onSubmit={handleModal}
              className="flex flex-col gap-5"
              action="/dashboard"
              method="POST"
            >
              {/* Form field to match Job Schema */}
              <input
                type="text"
                placeholder="Job Position"
                className="rounded"
                name="position"
              />
              <input
                type="text"
                placeholder="Company Name"
                className="rounded"
                name="company"
              />
              <input
                type="text"
                placeholder="Location"
                className="rounded"
                name="location"
              />
              <input type="date" className="rounded" name="date" />

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-auto content-center"
              >
                Submit
              </button>
              <button
                onClick={closeModal}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-auto content-center"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
