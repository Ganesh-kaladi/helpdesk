import { useState } from "react";
import { FaUserTie } from "react-icons/fa";

function AgentReview() {
  const [ticketId, setTicketId] = useState("");
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState("waiting_human"); // default
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`/api/agent/review/${ticketId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply: draft, status }),
      });

      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting review:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[90%] md:w-[70%] mx-auto mt-6 mb-10">
      <h1 className="flex items-center gap-2 font-medium text-2xl text-gray-800">
        <FaUserTie className="text-green-600" /> Agent Review
      </h1>
      <p className="text-sm text-gray-600">
        Edit the AI draft reply, send final response, or update ticket status.
      </p>

      <div className="bg-white p-6 mt-4 border border-gray-300 rounded-lg shadow-sm">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="ticketId" className="font-medium text-gray-700">
              Ticket ID
            </label>
            <input
              type="text"
              name="ticketId"
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value)}
              placeholder="Enter Ticket ID"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          <div>
            <label htmlFor="draft" className="font-medium text-gray-700">
              Draft Reply
            </label>
            <textarea
              name="draft"
              id="draft"
              rows={6}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Edit the AI draft reply..."
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Ticket Action</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="waiting_human">Waiting for Human</option>
              <option value="resolved">Resolve & Send Reply</option>
              <option value="reopened">Reopen Ticket</option>
              <option value="closed">Close Ticket</option>
            </select>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="w-[70%] bg-green-700 text-white py-2 rounded hover:bg-green-800 transition disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
            <button
              type="reset"
              onClick={() => {
                setDraft("");
                setTicketId("");
                setStatus("waiting_human");
                setSubmitted(false);
              }}
              className="w-[30%] border border-gray-300 rounded bg-slate-100 py-2"
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      {submitted && (
        <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded text-green-700">
          ✅ Reply submitted and ticket updated successfully.
        </div>
      )}
    </div>
  );
}

export default AgentReview;
