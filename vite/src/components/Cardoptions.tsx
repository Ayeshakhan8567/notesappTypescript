import { Trash2, Pin, Pencil } from 'lucide-react';
import useStore from '../store/store';
import type { Notes } from '../store/store';
import type { MouseEvent } from "react";

type CardoptionsProps = {
  note: Notes;
};

const Cardoptions = ({ note }: CardoptionsProps) => {
  if (!note) return null;

  // 2. Zustand Store Selectors
  const deleteNote = useStore((state) => state.deleteNote);
  const handleEdit = useStore((state) => state.handleEdit);
  const handleEditForm = useStore((state) => state.handleEditForm);
  const pinNote = useStore((state) => state.pinNote);

  // 3. Typed Event Handlers
  const handlePinClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    pinNote(note);
  };

  const handleEditClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    handleEdit(note);
    handleEditForm();
  };

  const handleDeleteClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    deleteNote(note);
  };

  return (
    <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1.5 shadow-sm w-max">
      {/* Pin Button */}
      <button
        type="button"
        title={note.isPinned ? "Unpin Note" : "Pin Note"}
        aria-label={note.isPinned ? "Unpin Note" : "Pin Note"}
        className={`p-2 rounded-lg transition-colors duration-200 ${
          note.isPinned
            ? "text-amber-600 bg-amber-50"
            : "text-gray-500 hover:text-amber-600 hover:bg-amber-50"
        }`}
        onClick={handlePinClick}
      >
        <Pin className="w-4 h-4" />
      </button>

      {/* Edit Button */}
      <button
        type="button"
        title="Edit Note"
        aria-label="Edit Note"
        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
        onClick={handleEditClick}
      >
        <Pencil className="w-4 h-4" />
      </button>

      {/* Delete Button */}
      <button
        type="button"
        title="Delete Note"
        aria-label="Delete Note"
        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
        onClick={handleDeleteClick}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Cardoptions;
