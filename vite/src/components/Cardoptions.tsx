
import { Trash2, Pin, Pencil } from 'lucide-react';
import useStore from '../store/store';
import type { Notes } from '../store/store';


type CardoptionsProps = {
  note: Notes;
};

const Cardoptions = ({ note }: CardoptionsProps) => {
  const deleteNote = useStore((state) => state.deleteNote);
  const handleEdit = useStore((state)=>state.handleEdit);
  const handleEditForm = useStore((state)=>state.handleEditForm);
 const pinNote = useStore((state)=>state.pinNote);
 
  return (
    <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1.5 shadow-sm w-max">
      {/* Pin Button */}
      <button 
          className={`p-2 rounded-lg transition-colors duration-200 ${
          note.isPinned 
            ? "text-amber-600 bg-amber-50" 
            : "text-gray-500 hover:text-amber-600 hover:bg-amber-50"
        }`}
        onClick={(e)=>{
            e.stopPropagation();
            pinNote(note);
        }}
      >
        <Pin className="w-4 h-4" />
      </button>

      {/* Edit Button */}
      <button 
        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
        title="Edit"
        onClick={(e)=>{
            e.stopPropagation();
            handleEdit(note);
            handleEditForm();
        }}
      >
        <Pencil className="w-4 h-4" />
      </button>

      {/* Delete Button */}
      <button 
        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
        onClick={(e) => {
          e.stopPropagation(); 
          deleteNote(note);
        }}
        title="Delete"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Cardoptions;