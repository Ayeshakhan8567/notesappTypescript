import useStore from "../store/store";
import Cardoptions from "./Cardoptions";
import type { Notes } from "../store/store";
import { formatDistanceToNow } from "date-fns";
import type { MouseEvent } from "react";


const Display = () => {
  // 1. Zustand Store Selectors with explicit Types
  const list = useStore((state) => state.list);
  const handleEdit = useStore((state) => state.handleEdit);
  const handleEditForm = useStore((state) => state.handleEditForm);
  const searchQuery = useStore((state) => state.searchQuery);

  // 1. Search Query Filter with explicit Types
  const filteredList: Notes[] = list.filter((note: Notes) => {
    const query: string = searchQuery.toLowerCase().trim();
    return (
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query)
    );
  });

  // 2. Categorized Notes Lists
  const pinnedNotes: Notes[] = filteredList.filter((note: Notes) => note.isPinned);
  const otherNotes: Notes[] = filteredList.filter((note: Notes) => !note.isPinned);

  // 3. Defensive Date Formatting Helper Function
  const formatNoteDate = (dateValue: Date | string | number | undefined): string => {
    if (!dateValue) return "Just now";
    try {
      const parsedDate = new Date(dateValue);
      return isNaN(parsedDate.getTime())
        ? "Just now"
        : formatDistanceToNow(parsedDate, { addSuffix: true });
    } catch {
      return "Just now";
    }
  };

  // 4. Render Card Function returning explicit JSX Element
  const renderCard = (note: Notes) => (
    <div
      key={note.id}
      className="bg-white rounded-2xl border-t-4 border-blue-400 p-6 shadow-sm flex flex-col justify-between h-64 min-w-0 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => {
        handleEdit(note);
        handleEditForm();
      }}
    >
      <div>
        <span className="text-xs text-gray-400 block mb-3">
          {formatNoteDate(note.createdAt)}
        </span>
        <h2 className="text-xl font-semibold mb-3 break-words line-clamp-1">
          {note.title}
        </h2>
        <p className="text-gray-600 line-clamp-3">{note.content}</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className="text-xs bg-blue-100 text-blue-600 px-2.5 py-1 rounded-full font-medium">
          {note.category}
        </span>
        <span className="text-sm text-stone-400">
          {note.content.length} char
        </span>

        {/* Prevent card click when interacting with Cardoptions */}
        <div onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
          <Cardoptions note={note} />
        </div>
      </div>
    </div>
  );

  return (
    <main className="ml-64 min-h-screen flex-1 bg-blue-200 overflow-hidden pb-10">
      <header className="flex items-center pl-4 border-b-2 border-blue-300 h-15 w-full fixed bg-blue-400 z-10">
        <h2 className="text-xl font-bold">All Notes</h2>
      </header>

      <div className="pt-20 px-6 space-y-8">
        
        {list.length === 0 && (
          <div className="text-center py-10 text-gray-600">
            No notes yet. Click "+ Add New Note" to create one!
          </div>
        )}

        {list.length > 0 && filteredList.length === 0 && (
          <div className="text-center py-10 text-gray-600">
            No notes found matching "{searchQuery}"
          </div>
        )}

        {/* --- PINNED NOTES SECTION --- */}
        {pinnedNotes.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-700 mb-3">
              Pinned
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {pinnedNotes.map((note: Notes) => renderCard(note))}
            </div>
          </div>
        )}

        {/* --- OTHER NOTES SECTION --- */}
        {otherNotes.length > 0 && (
          <div>
            {pinnedNotes.length > 0 && (
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-700 mb-3">
                Others
              </h3>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {otherNotes.map((note: Notes) => renderCard(note))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Display;