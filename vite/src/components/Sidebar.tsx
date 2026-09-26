import useStore from "../store/store";

const Sidebar = () => {
  const list = useStore((state) => state.list);
  const handleForm = useStore((state) => state.handleForm);

  
  const totalNotes = list.length;
  const pinnedCount = list.filter((note) => note.isPinned).length;


  const workCount = list.filter((note) => note.category === "Work").length;
  const personalCount = list.filter((note) => note.category === "Personal").length;
  const ideasCount = list.filter((note) => note.category === "Ideas").length;
  const tasksCount = list.filter((note) => note.category === "Tasks").length;

  return (
    <aside className="w-64 bg-white h-screen border-r border-gray-200 fixed left-0 top-0 p-5 flex flex-col justify-between z-20">
      <div>
        {/* App Title */}
        <div className="flex items-center gap-2 mb-8">
          <h1 className="text-xl font-bold text-gray-800">Notes App</h1>
        </div>

        {/* Create Note Button */}
        <button
          onClick={handleForm}
          className="w-full bg-indigo-600 text-white font-medium py-2.5 px-4 rounded-xl hover:bg-indigo-700 transition duration-200 mb-6 shadow-sm"
        >
          + Add New Note
        </button>

        {/* Navigation / Filter List */}
        <nav className="space-y-1">
          {/* All Notes */}
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-gray-100 text-gray-800 font-medium mb-3">
            <span>All Notes</span>
            <span className="bg-gray-200 text-gray-700 px-2 py-0.5 text-xs rounded-full font-semibold">
              {totalNotes}
            </span>
          </div>

          {/* Pinned Notes */}
          <div className="flex items-center justify-between p-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition cursor-pointer mb-4">
            <span>Pinned</span>
            <span className="bg-amber-100 text-amber-700 px-2 py-0.5 text-xs rounded-full font-semibold">
              {pinnedCount}
            </span>
          </div>

          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 pt-2 mb-2">
            Categories
          </p>

          {/* Work Category */}
          <div className="flex items-center justify-between p-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition cursor-pointer">
            <span>Work</span>
            <span className="bg-purple-100 text-purple-700 px-2 py-0.5 text-xs rounded-full font-semibold">
              {workCount}
            </span>
          </div>

          {/* Personal Category */}
          <div className="flex items-center justify-between p-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition cursor-pointer">
            <span>Personal</span>
            <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 text-xs rounded-full font-semibold">
              {personalCount}
            </span>
          </div>

          {/* Ideas Category */}
          <div className="flex items-center justify-between p-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition cursor-pointer">
            <span>Ideas</span>
            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 text-xs rounded-full font-semibold">
              {ideasCount}
            </span>
          </div>

          {/* Tasks Category */}
          <div className="flex items-center justify-between p-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition cursor-pointer">
            <span>Tasks</span>
            <span className="bg-rose-100 text-rose-700 px-2 py-0.5 text-xs rounded-full font-semibold">
              {tasksCount}
            </span>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;