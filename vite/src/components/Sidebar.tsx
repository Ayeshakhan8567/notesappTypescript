
const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-slate-50 border-r border-slate-200 px-5 py-6">
      <div className="flex flex-col gap-8">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">N</span>
          </div>

          <p className="text-xl font-bold text-slate-800">
            Notora
          </p>
        </div>

        {/* Search */}
        <div>
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 outline-none text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Categories */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Categories
          </p>

          <div className="flex flex-col gap-1">

            <div className="px-3 py-2.5 rounded-lg bg-indigo-50 text-indigo-600 font-medium text-sm cursor-pointer">
              All Notes
            </div>

            <div className="px-3 py-2.5 rounded-lg text-slate-600 text-sm cursor-pointer hover:bg-slate-100 hover:text-slate-900">
              Pinned
            </div>

            <div className="px-3 py-2.5 rounded-lg text-slate-600 text-sm cursor-pointer hover:bg-slate-100 hover:text-slate-900">
              Work
            </div>

            <div className="px-3 py-2.5 rounded-lg text-slate-600 text-sm cursor-pointer hover:bg-slate-100 hover:text-slate-900">
              Personal
            </div>

            <div className="px-3 py-2.5 rounded-lg text-slate-600 text-sm cursor-pointer hover:bg-slate-100 hover:text-slate-900">
              Ideas
            </div>

            <div className="px-3 py-2.5 rounded-lg text-slate-600 text-sm cursor-pointer hover:bg-slate-100 hover:text-slate-900">
              Tasks
            </div>

          </div>
        </div>

      </div>

     <div>
    <button className="w-full h-12 rounded-xl bg-indigo-600 text-white text-lg" >New Note</button>
    </div>
    
    </aside>
  )
}

export default Sidebar;

