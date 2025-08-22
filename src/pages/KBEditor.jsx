import { useState } from "react";
import { FaBookOpen } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createKB } from "../slice/kbSlice";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";

function KBEditor() {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { isLoadingKB } = useSelector((state) => state.kb);

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    tags: "",
    status: "draft",
  });

  const [errMsg, setErrMsg] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((cur) => ({ ...cur, [name]: value }));
  };

  function validate() {
    let err = {};
    if (!formData.title) err.title = "required";
    if (!formData.body) err.body = "required";
    if (!formData.tags) err.tags = "required";

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
    dispatch(createKB({ formData, token })).then((res) => {
      if (res.type === "createKB/fulfilled") {
        setFormData({
          title: "",
          body: "",
          tags: "",
          status: "draft",
        });
        toast("new KB added");
      }
    });
  };

  return (
    <div className="w-[95%] md:w-[70%] mx-auto mt-6 mb-10">
      <h1 className="flex items-center gap-2 font-medium text-2xl text-gray-800">
        <FaBookOpen className="text-sky-700" />
        Create New Article
      </h1>
      <p className="text-sm text-gray-600">
        Fill out the form to create a new KB article.
      </p>

      <div className="bg-white p-6 mt-4 border border-gray-300 rounded-lg shadow-sm">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6"
          noValidate
        >
          <div>
            <label
              htmlFor="title"
              className="font-medium text-gray-700 relative block"
            >
              Title
              {errMsg.title && (
                <span className="absolute right-0 text-red-500">
                  {errMsg.title}
                </span>
              )}
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter article title"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="body"
              className="font-medium text-gray-700 relative block"
            >
              Body{" "}
              {errMsg.body && (
                <span className="absolute right-0 text-red-500">
                  {errMsg.body}
                </span>
              )}
            </label>
            <textarea
              name="body"
              rows={6}
              value={formData.body}
              onChange={handleChange}
              placeholder="Write the article content..."
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="tags"
              className="font-medium text-gray-700 relative block"
            >
              Tags (comma separated){" "}
              {errMsg.tags && (
                <span className="absolute right-0 text-red-500">
                  {errMsg.tags}
                </span>
              )}
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g. billing, payment, refund"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label htmlFor="status" className="font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isLoadingKB}
              className="w-[70%] bg-sky-700 text-white py-2 rounded hover:bg-sky-800 transition disabled:opacity-50"
            >
              {isLoadingKB ? (
                <span className="flex items-center justify-center gap-2">
                  Creating... <Spinner val={5} />
                </span>
              ) : (
                "Create KB"
              )}
            </button>
            <button
              type="reset"
              onClick={() =>
                setFormData({
                  title: "",
                  body: "",
                  tags: "",
                  status: "draft",
                })
              }
              className="w-[30%] border border-gray-300 rounded bg-slate-100 py-2"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default KBEditor;
