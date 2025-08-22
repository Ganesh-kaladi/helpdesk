import { useState } from "react";
import { FaLightbulb } from "react-icons/fa";

function AgentSuggestion() {
  const [ticketId, setTicketId] = useState("");
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/agent/suggestion/${ticketId}`);
      const data = await res.json();

      setSuggestion(
        data || {
          predictedCategory: "tech",
          draftReply:
            "We noticed your issue is related to login. Please try resetting your password via the KB article.",
          confidence: 0.74,
          autoClosed: false,
          articleIds: ["Login Help", "Password Reset Guide"],
        }
      );
    } catch (err) {
      console.error("Error fetching suggestion:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[90%] md:w-[70%] mx-auto mt-6 mb-10">
      <h1 className="flex items-center gap-2 font-medium text-2xl text-gray-800">
        <FaLightbulb className="text-yellow-500" /> Agent Suggestion
      </h1>
      <p className="text-sm text-gray-600">
        View AI-generated draft reply and knowledge base recommendations.
      </p>

      <div className="bg-white p-6 mt-4 border border-gray-300 rounded-lg shadow-sm">
        <form
          onSubmit={handleFetch}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="col-span-2">
            <label htmlFor="ticketId" className="font-medium text-gray-700">
              Ticket ID
            </label>
            <input
              type="text"
              name="ticketId"
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value)}
              placeholder="Enter Ticket ID"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 
                bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
              required
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-700 text-white py-2 rounded-md hover:bg-sky-800 transition disabled:opacity-50"
            >
              {loading ? "Loading..." : "Get Suggestion"}
            </button>
          </div>
        </form>
      </div>

      {suggestion && (
        <div className="bg-white p-6 mt-6 border border-gray-300 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">AI Suggestion</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p>
                <span className="font-medium">Predicted Category:</span>{" "}
                {suggestion.predictedCategory}
              </p>
              <p>
                <span className="font-medium">Confidence:</span>{" "}
                {(suggestion.confidence * 100).toFixed(1)}%
              </p>
              <p>
                <span className="font-medium">Decision:</span>{" "}
                {suggestion.autoClosed ? "✅ Auto Resolved" : "👤 Needs Agent"}
              </p>
            </div>

            <div>
              <p className="font-medium">Relevant KB Articles:</p>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {suggestion.articleIds.map((kb, i) => (
                  <li key={i}>{kb}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4">
            <p className="font-medium">Draft Reply:</p>
            <div className="p-3 border rounded bg-slate-50 text-sm text-gray-700">
              {suggestion.draftReply}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AgentSuggestion;
