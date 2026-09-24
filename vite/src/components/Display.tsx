
import useStore from "../store/store"
const Display = () => {

 
  const list=useStore((state)=>(state.list));

  return (
    <>
      <main className='min-h-screen flex flex-1 bg-blue-200' >
      <header className="border-b-2 border-blue-300 w-full h-20 bg-blue-200 " >
        <h2 className="text-xl font-bold" >All Notes</h2>
      </header>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
  {list.map((note) => (
    <div
      key={note.id}
      className="bg-white rounded-2xl border-t-4 border-blue-400 p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold mb-4">
        {note.title}
      </h2>

      <p className="text-gray-700 mb-6">
        {note.content}
      </p>

      <div className="border-t pt-4 flex justify-between items-center">
        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-500">
          {note.category}
        </span>

        <span className="text-gray-400 text-sm">
          {note.content.length} chars
        </span>
      </div>
    </div>
  ))}
</div>

      </main>
      
  
    
    
    
    </>
  )
}

export default Display;