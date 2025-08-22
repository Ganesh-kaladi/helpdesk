import { useState } from "react";
import { FaRobot } from "react-icons/fa";

function TriageTicket() {
  const [ticketId, setTicketId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/agent/triage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketId }),
      });
      const data = await res.json();

      setResult(
        data || {
          category: "billing",
          draftReply:
            "We detected a billing issue. Please check our KB article on invoices.",
          confidence: 0.82,
          autoResolved: false,
          relatedKB: ["Invoice FAQ", "Payment Troubleshooting"],
          logs: [
            { step: "Classify", result: "billing" },
            { step: "Fetch KB", result: ["Invoice FAQ"] },
            { step: "Draft Reply", result: "Suggested billing reply" },
            { step: "Decision", result: "Assigned to Agent" },
          ],
        }
      );
    } catch (error) {
      console.error("Error triaging:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[90%] md:w-[70%] mx-auto mt-6 mb-10">
      <h1 className="flex items-center gap-2 font-medium text-2xl text-gray-800">
        <FaRobot className="text-sky-700" /> Triage Ticket
      </h1>
      <p className="text-sm text-gray-600">
        Run agentic triage on a ticket and review AI classification results.
      </p>

      <div className="bg-white p-6 mt-4 border border-gray-300 rounded-lg shadow-sm">
        <form
          onSubmit={handleSubmit}
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
              {loading ? "Processing..." : "Run Triage"}
            </button>
          </div>
        </form>
      </div>

      {result && (
        <div className="bg-white p-6 mt-6 border border-gray-300 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Triage Results</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p>
                <span className="font-medium">Category:</span> {result.category}
              </p>
              <p>
                <span className="font-medium">Confidence:</span>{" "}
                {(result.confidence * 100).toFixed(1)}%
              </p>
              <p>
                <span className="font-medium">Decision:</span>{" "}
                {result.autoResolved
                  ? "✅ Auto Resolved"
                  : "👤 Assigned to Agent"}
              </p>
            </div>

            <div>
              <p className="font-medium">Related KB Articles:</p>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {result.relatedKB.map((kb, i) => (
                  <li key={i}>{kb}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4">
            <p className="font-medium">Draft Reply:</p>
            <div className="p-3 border rounded bg-slate-50 text-sm text-gray-700">
              {result.draftReply}
            </div>
          </div>

          <div className="mt-6">
            <p className="font-medium">Audit Logs:</p>
            <ul className="mt-2 space-y-1 text-sm">
              {result.logs.map((log, i) => (
                <li key={i} className="p-2 border rounded bg-gray-50">
                  <span className="font-medium">{log.step}:</span>{" "}
                  {Array.isArray(log.result)
                    ? log.result.join(", ")
                    : log.result}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default TriageTicket;
