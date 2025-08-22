import { useEffect, useState } from "react";
import { FaEye, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllTickets } from "../slice/ticketSlice";
import Spinner from "../components/Spinner";

export default function AllTickets() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { ticket, isLoadingTicket } = useSelector((state) => state.ticket);

  useEffect(() => {
    dispatch(getAllTickets(token));
  }, [token, dispatch]);

  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">🎟 My Tickets</h1>
          <p className="text-gray-500">
            Track and manage your support requests
          </p>
        </div>
        <button
          onClick={() => navigate("/user/create-ticket")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + New Ticket
        </button>
      </div>

      <div className="flex items-center border rounded-lg px-3 py-2 mb-6 bg-white">
        <FaSearch className="text-gray-400 w-5 h-5 mr-2" />
        <input
          type="text"
          placeholder="Search tickets by title, description, or category..."
          className="w-full outline-none"
        />
      </div>

      {isLoadingTicket && (
        <div className="w-ful h-20">
          <Spinner val={5} />
        </div>
      )}
      <div className="space-y-4">
        {ticket?.length > 0 &&
          ticket?.map((el) => (
            <div key={el?._id} className="bg-white rounded-lg shadow p-4">
              {/* Title & Description */}
              <h2 className="text-lg font-semibold">{el?.title}</h2>
              <p className="text-gray-600 mb-3">{el?.description}</p>

              <div className="mb-2 text-gray-600">
                ticket status :&nbsp;
                <span className="bg-amber-400 py-[0.12rem] px-2 rounded text-gray-100">
                  {el?.status}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                <span>
                  📅 Created {new Date(el?.createdAt).toLocaleDateString()}
                </span>
                <span>
                  🔄 updated {new Date(el?.updatedAt).toLocaleDateString()}
                </span>
                <span>👤 assigned to {el?.assignee?.name}</span>
              </div>

              <div className="bg-gray-50 border rounded-lg p-3 mb-3">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-blue-600 font-medium">success</span>
                  <span className="text-gray-500">
                    {el?.agentSuggestionId.confidence}
                    confidence
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  {el?.agentSuggestionId.draftReply}
                </p>
              </div>

              <div className="flex justify-between">
                <button className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200">
                  not relavent
                </button>
                <button
                  onClick={() => navigate(el?._id)}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  <FaEye className="w-4 h-4" /> View Details
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 text-center">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-gray-500 text-sm">{label}</p>
    </div>
  );
}
