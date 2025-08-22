import { useEffect, useState } from "react";
import { FaSearch, FaBook } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteKB, getAllKB } from "../slice/kbSlice";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";

function KBList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { isLoadingKB, kb } = useSelector((state) => state.kb);

  useEffect(() => {
    dispatch(getAllKB(token));
  }, [dispatch, token]);

  function handleDeleteKB(id) {
    const confirm = window.confirm("do you want delete");
    if (confirm) {
      dispatch(deleteKB({ id, token })).then((res) => {
        if (res.type === "deleteKB/fulfilled") {
          toast("KB deleted");
          dispatch(getAllKB(token));
        }
      });
    } else {
      return;
    }
  }

  return (
    <div className="w-[95%] mx-auto md:w-full px-6 mt-6 mb-10">
      <h1 className="flex items-center gap-2 font-medium text-2xl text-gray-800">
        <FaBook className="text-sky-700" /> Knowledge Base Articles
      </h1>
      <p className="text-sm text-gray-600">
        Manage and search support articles.
      </p>

      <div className="flex flex-col md:flex-row gap-4 items-center mt-4">
        <div className="flex items-center w-full md:w-[60%] border border-gray-300 rounded px-2 bg-slate-100">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search by title or tag..."
            className="w-full px-2 py-2 bg-transparent focus:outline-none"
          />
        </div>

        <select className="border border-gray-300 rounded px-3 py-2 bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500">
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {isLoadingKB ? (
        <div className="h-20 mt-10">
          <Spinner val={5} />
        </div>
      ) : (
        <div className="mt-6 bg-white border border-gray-300 rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-100 border-b">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Tags</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Updated At</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {kb?.length > 0 &&
                kb?.map((el) => (
                  <tr key={el?._id} className="border-b hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium">{el?.title}</td>
                    <td className="px-4 py-3 flex gap-2 flex-wrap">
                      {el?.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="inline-block bg-sky-100 text-sky-700 text-xs px-2 py-1 rounded mr-2"
                        >
                          #{tag}
                        </span>
                      ))}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs${
                          el?.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {el?.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{el?.updatedAt}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => navigate(el?._id)}
                        className="text-sky-700 hover:underline mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteKB(el?._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

              {kb?.length <= 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No articles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default KBList;
