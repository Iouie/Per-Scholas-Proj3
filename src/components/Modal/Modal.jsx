import { useState, useRef } from "react";
import { createJob } from "../../utilities/dashboard";
import { useEffect } from "react";

export default function Modal({ onStateChange, onHandleForm }) {
  const [modal, setModal] = useState(false);
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [err, setErr] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "position") {
      setPosition(value.trim());
    } else if (name === "company") {
      setCompany(value.trim());
    } else if (name === "location") {
      setLocation(value.trim());
    } else if (name === "date") {
      setDate(value.trim());
    }
  };

  useEffect(() => {
    onHandleForm({ position, company, location, date, modal });
  }, [!modal]);

  // get data from mongo schema
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = { position, company, location, date };
      const job = await createJob(formData);
      setErr(false);
      console.log(job);
      closeModal();

      // Call the onFormSubmit callback with the form data
    } catch {
      setErr(true);
    }
  };

  const openModal = () => {
    setModal(true);
    onStateChange(true);
  };
  const closeModal = () => {
    setModal(false);
    onStateChange(false);
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
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-sky shadow-lg rounded-lg p-6 bg-[#106ee8] ">
          <div className="text-2xl font-bold mb-4 text-center">
            <p className="p-5">Job Application Tracker</p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
              autoComplete="off"
            >
              {/* Form field to match Job Schema */}
              <input
                type="text"
                placeholder="Job Position"
                className="rounded"
                name="position"
                value={position}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Company Name"
                className="rounded"
                name="company"
                value={company}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Location"
                className="rounded"
                name="location"
                value={location}
                onChange={handleInputChange}
              />
              <input
                type="date"
                className="rounded"
                name="date"
                value={date}
                onChange={handleInputChange}
              />

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
              <h3>{err ? "Error adding Job Application" : ""}</h3>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
