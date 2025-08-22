import { useEffect, useState } from "react";
import { FaTicketAlt, FaRobot, FaUserShield } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleTicket } from "../slice/ticketSlice";
import { BiLeftArrow } from "react-icons/bi";
import Spinner from "../components/Spinner";

function SingleTicket() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { singleTicket, isLoadingTicket } = useSelector(
    (state) => state.ticket
  );

  useEffect(() => {
    dispatch(getSingleTicket({ id, token }));
  }, [id, dispatch, token]);

  if (!singleTicket)
    return <p className="text-center mt-10">Loading ticket...</p>;

  return (
    <div className="w-[95%] md:w-[85%] mx-auto mt-6 mb-10">
      {/* {isLoadingTicket && (
        <div className="h-20">
          <Spinner val={5} />
        </div>
      )} */}
      {singleTicket ? (
        <>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <BiLeftArrow size={12} />
            back
          </button>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              {/* Ticket Info */}
              <div className="bg-white p-5 border border-gray-200 rounded-lg shadow-sm">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                  <FaTicketAlt className="text-sky-700" /> Ticket Info
                </h2>
                <div className="mt-3 text-sm space-y-2">
                  <p>
                    <span className="font-medium">Title:</span>{" "}
                    {singleTicket?.title}
                  </p>
                  <p>
                    <span className="font-medium">Description:</span>{" "}
                    {singleTicket?.description}
                  </p>
                  <p>
                    <span className="font-medium">Category:</span>{" "}
                    {singleTicket?.category}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span>
                    <span
                      className={`ml-2 px-2 py-0.5 rounded text-xs ${
                        singleTicket?.status === "closed"
                          ? "bg-red-100 text-red-700"
                          : singleTicket?.status === "resolved"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {singleTicket?.status}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">Created By:</span>{" "}
                    {singleTicket?.createdBy.name} (
                    {singleTicket?.createdBy.email})
                  </p>
                  <p>
                    <span className="font-medium">Assigned Agent:</span>{" "}
                    {singleTicket?.assignee?.name || "Not assigned"}
                  </p>
                  <p>
                    <span className="font-medium">Created At:</span>{" "}
                    {new Date(singleTicket?.createdAt).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-medium">Updated At:</span>{" "}
                    {new Date(singleTicket.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Assignee Info */}
              {singleTicket?.assignee && (
                <div className="bg-white p-5 border border-gray-200 rounded-lg shadow-sm">
                  <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                    <FaUserShield className="text-green-600" /> Assigned Agent
                  </h2>
                  <p className="mt-2 text-sm">
                    <span className="font-medium">Name:</span>{" "}
                    {singleTicket?.assignee.name}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Email:</span>{" "}
                    {singleTicket?.assignee.email}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Role:</span>{" "}
                    {singleTicket?.assignee.role}
                  </p>
                </div>
              )}
            </div>

            {/* Right Column: AI Suggestion */}
            <div className="lg:col-span-2">
              <div className="bg-white p-5 border border-gray-200 rounded-lg shadow-sm">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                  <FaRobot className="text-purple-600" /> AI Suggestion
                </h2>

                {singleTicket?.agentSuggestionId ? (
                  <div className="mt-3 space-y-3">
                    <p className="text-sm">
                      {singleTicket?.agentSuggestionId.draftReply}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Confidence:</span>{" "}
                      {(
                        parseFloat(singleTicket?.agentSuggestionId.confidence) *
                        100
                      ).toFixed(1)}
                      %
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Related Articles:</span>{" "}
                      {singleTicket?.agentSuggestionId?.articleIds?.length > 0
                        ? singleTicket?.agentSuggestionId?.articleIds.join(", ")
                        : "None"}
                    </p>
                    {singleTicket?.agentSuggestionId.autoClosed && (
                      <p className="text-green-700 font-medium">
                        ✅ Ticket was auto-closed by AI
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      Created At:{" "}
                      {new Date(
                        singleTicket?.agentSuggestionId.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-gray-500">
                    No AI suggestion available.
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="h-20">
          <Spinner val={5} />
        </div>
      )}
    </div>
  );
}

export default SingleTicket;
