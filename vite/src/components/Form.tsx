
import useStore from "../store/store";

const Form = () => {
  const Inputs = useStore((state) => state.Inputs);
  const handleChange = useStore((state) => state.handleChange);
  const handleSubmit = useStore((state) => state.handleSubmit);
  const showForm = useStore((state) => state.showForm);
  const handleCancel = useStore((state) => state.handleCancel);

  if (!showForm) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">

    <div className="bg-white w-[500px] rounded-xl p-6 shadow-xl">

      <h2 className="text-2xl font-semibold mb-5">
        New Note
      </h2>

    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200 space-y-5"
    >
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={Inputs?.title || ""}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          placeholder="Enter Title"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          name="content"
          value={Inputs?.content || ""}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          placeholder="Write your note..."
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none resize-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          name="category"
          value={Inputs?.category || ""}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
        >
          <option value="">Select Category</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Ideas">Ideas</option>
          <option value="Tasks">Tasks</option>
        </select>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="w-full py-3 px-4 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 active:scale-[0.98] transition"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="w-full py-3 px-4 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 active:scale-[0.98] transition"
        >
          Cancel
        </button>
      </div>
    </form>
    </div>
    </div>
  );
};

export default Form;

