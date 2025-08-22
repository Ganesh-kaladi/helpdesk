import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createTicket } from "../slice/ticketSlice";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

function CreateTicket() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { isLoadingTicket } = useSelector((state) => state.ticket);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [errMsg, setErrMsg] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((cur) => ({ ...cur, [name]: value }));
  };

  function validate() {
    let err = {};
    if (!formData.title) err.title = "required";
    if (!formData.description) err.description = "required";
    return err;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errObj = validate();
    if (Object.keys(errObj).length > 0) {
      setErrMsg(errObj);
      return;
    }

    setErrMsg({});
    dispatch(createTicket({ formData, token })).then((res) => {
      if (res.type === "createTicket/fulfilled") {
        setFormData({
          title: "",
          description: "",
        });
        toast("ticket created");
      }
    });
  };

  return (
    <div className="w-[95%] md:w-[70%] mx-auto mt-6 mb-10">
      <h1 className="flex items-center gap-2 font-medium text-2xl text-gray-800">
        <FaPlus className="text-sky-700" /> Create Support Ticket
      </h1>
      <p className="text-sm text-gray-600">
        Describe your issue and our AI will help route it to the right support
        team.
      </p>

      <div className="bg-white p-6 mt-4 border border-gray-300 rounded-lg shadow-sm">
        <form
          noValidate
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6"
        >
          <div>
            <label
              htmlFor="title"
              className="font-medium text-gray-700 block relative"
            >
              Title
              {errMsg.title && (
                <span className="absolute right-0 text-red-500 font-normal">
                  {errMsg.title}
                </span>
              )}
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter a short title"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="font-medium text-gray-700 block relative"
            >
              Description
              {errMsg.description && (
                <span className="absolute right-0 text-red-500 font-normal">
                  {errMsg.description}
                </span>
              )}
            </label>
            <textarea
              name="description"
              rows={5}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your issue in detail..."
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isLoadingTicket}
              className="w-[70%] bg-sky-700 text-white py-2 rounded hover:bg-sky-800 transition disabled:opacity-50"
            >
              {isLoadingTicket ? (
                <span className="flex items-center justify-center gap-2">
                  creating... <Spinner val={5} />
                </span>
              ) : (
                "Create Ticket"
              )}
            </button>
            <button
              type="reset"
              onClick={() => {
                setErrMsg({});
                setFormData({
                  title: "",
                  description: "",
                });
              }}
              className="w-[30%] border border-gray-300 rounded bg-slate-100 py-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTicket;
