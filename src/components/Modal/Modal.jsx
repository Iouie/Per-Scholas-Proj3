import { useState, useEffect } from "react";
import { createJob } from "../../utilities/dashboard";
import moment from "moment";

export default function Modal({
  onStateChange,
  job,
  modal,
  setModal,
  handleEdit,
  setJob,
  data,
}) {
  const [position, setPosition] = useState(job ? job.position : "");
  const [company, setCompany] = useState(job ? job.company : "");
  const [location, setLocation] = useState(job ? job.location : "");
  const [date, setDate] = useState(
    job ? moment.utc(job.date).format("YYYY-MM-DD") : ""
  );
  const [err, setErr] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "position") {
      setPosition(value);
    } else if (name === "company") {
      setCompany(value);
    } else if (name === "location") {
      setLocation(value);
    } else if (name === "date") {
      setDate(value);
    }
  };

  // get data from mongo schema
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = { position, company, location, date };
      const job = await createJob(formData);
      closeModal();

      // Call the onFormSubmit callback with the form data
    } catch (err) {
      setErr(true);
    }
  };

  const removeTitle = () => {
    openModal();
    setPosition("");
    setCompany("");
    setLocation("");
    setDate("");
  };

  const openModal = () => {
    setModal(true);
    onStateChange(true);
    setErr(false);
  };
  const closeModal = () => {
    setErr(false);
    setModal(false);
    onStateChange(false);
    setJob(null);
  };

  useEffect(() => {
    setPosition(job ? job.position : "");
    setCompany(job ? job.company : "");
    setLocation(job ? job.location : "");
    setDate(job ? moment.utc(job.date).format("YYYY-MM-DD") : "");
  }, [job]);

  return (
    <>
      <div className="flex align-center my-5">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-auto content-center"
          onClick={removeTitle}
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
              {job ? (
                <input
                  type="text"
                  placeholder="Job Position"
                  className="rounded"
                  name="position"
                  defaultValue={job.position}
                  onChange={handleInputChange}
                />
              ) : (
                <input
                  type="text"
                  placeholder="Job Position"
                  className="rounded"
                  name="position"
                  value={position}
                  onChange={handleInputChange}
                />
              )}
              {job ? (
                <input
                  type="text"
                  placeholder="Company Name"
                  className="rounded"
                  name="company"
                  defaultValue={job.company}
                  onChange={handleInputChange}
                />
              ) : (
                <input
                  type="text"
                  placeholder="Company Name"
                  className="rounded"
                  name="company"
                  value={company}
                  onChange={handleInputChange}
                />
              )}
              {job ? (
                <input
                  type="text"
                  placeholder="Location"
                  className="rounded"
                  name="location"
                  defaultValue={job.location}
                  onChange={handleInputChange}
                />
              ) : (
                <input
                  type="text"
                  placeholder="Location"
                  className="rounded"
                  name="location"
                  value={location}
                  onChange={handleInputChange}
                />
              )}

              {job ? (
                <input
                  type="date"
                  className="rounded"
                  name="date"
                  defaultValue={moment.utc(job.date).format("YYYY-MM-DD")}
                  onChange={handleInputChange}
                />
              ) : (
                <input
                  type="date"
                  className="rounded"
                  name="date"
                  value={moment.utc(date).format("YYYY-MM-DD")}
                  onChange={handleInputChange}
                />
              )}
              {job ? (
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-auto content-center"
                  onClick={() => {
                    handleEdit({
                      _id: job._id,
                      position,
                      company,
                      location,
                      date,
                    });
                    closeModal();
                  }}
                >
                  Edit
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-auto content-center"
                >
                  Submit
                </button>
              )}
              <button
                onClick={closeModal}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-auto content-center"
              >
                Cancel
              </button>
              <h3>{err ? "Error getting Job Application" : ""}</h3>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
