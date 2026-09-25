import useStore from "../store/store";

const Display = () => {
  const list = useStore((state) => state.list);

  return (
    <main className="min-h-screen flex-1 bg-blue-200  overflow-hidden">
      
        <header className=" flex items-center pl-4 border-b-2 border-blue-300 h-15 w-full fixed bg-blue-400">
          <h2 className="text-xl font-bold">All Notes</h2>
        </header>
         
       
        <div className=" pt-20 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((note) => (
            <div
              key={note.id}
              className="bg-white rounded-2xl border-t-4 border-blue-400 p-6 shadow-sm flex flex-col justify-between h-64 min-w-0"
            >
              <div>
                <h2 className="text-xl font-semibold mb-3 break-words line-clamp-1">
                  {note.title}
                </h2>

               
                <p className="text-gray-700 break-words line-clamp-4">
                  {note.content}
                </p>
              </div>

              <div className="border-t pt-4 flex justify-between items-center">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-500 text-sm">
                  {note.category}
                </span>

                <div className="text-gray-400 text-sm">
                  {note.content?.length || 0} chars
                </div>
              </div>
            </div>
          ))}
        </div>
      
    </main>
  );
};

export default Display;