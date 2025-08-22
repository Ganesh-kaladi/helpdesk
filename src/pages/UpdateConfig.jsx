import { useEffect, useState } from "react";
import { FaCog } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getConfig, updateConfig } from "../slice/configSlice";
import Spinner from "../components/Spinner";

function UpdateConfig() {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { config, isLoadingConfig } = useSelector((state) => state.config);

  const [formData, setFormData] = useState({
    autoCloseEnabled: config?.autoCloseEnabled || "",
    confidenceThreshold: config?.confidenceThreshold || "",
    slaHours: config?.slaHours || "",
  });

  useEffect(() => {
    dispatch(getConfig(token));
  }, [dispatch, token]);

  useEffect(() => {
    setFormData({
      autoCloseEnabled: config?.autoCloseEnabled,
      confidenceThreshold: config?.confidenceThreshold,
      slaHours: config?.slaHours,
    });
  }, [config]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((cur) => ({
      ...cur,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    const confirm = window.confirm(`do you want change config`);
    if (confirm) {
      dispatch(updateConfig({ formData, id: config._id, token }));
    } else {
      return;
    }
  }

  return (
    <div className="w-[90%] md:w-[70%] mx-auto mt-6 mb-10">
      <h1 className="flex items-center gap-2 font-medium text-2xl text-gray-800">
        <FaCog className="text-sky-700" /> Admin Config
      </h1>
      <p className="text-sm text-gray-600">
        Manage AI triage thresholds and system settings.
      </p>

      <div className="bg-white p-6 mt-4 border border-gray-300 rounded-lg shadow-sm">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="col-span-2 md:col-span-1 flex items-center gap-3">
            <input
              type="checkbox"
              id="autoCloseEnabled"
              name="autoCloseEnabled"
              checked={formData.autoCloseEnabled}
              value={formData.autoCloseEnabled}
              onChange={handleChange}
              className="h-5 w-5 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
            />
            <label htmlFor="autoCloseEnabled" className="font-medium">
              Enable Auto-Close
            </label>
          </div>

          <div className="col-span-2 md:col-span-1">
            <label
              htmlFor="confidenceThreshold"
              className="font-medium text-gray-700"
            >
              Confidence Threshold (0–1)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="1"
              name="confidenceThreshold"
              value={formData.confidenceThreshold}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label htmlFor="slaHours" className="font-medium text-gray-700">
              SLA Hours
            </label>
            <input
              type="number"
              name="slaHours"
              value={formData.slaHours}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="flex gap-4 col-span-2">
            <button
              type="submit"
              disabled={isLoadingConfig}
              className="w-[100%] bg-sky-700 text-white py-2 rounded hover:bg-sky-800 transition disabled:opacity-50"
            >
              {isLoadingConfig ? (
                <span className="flex items-center justify-center gap-2">
                  Updating... <Spinner val={5} />
                </span>
              ) : (
                "Update Config"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateConfig;
