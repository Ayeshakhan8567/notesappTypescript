import { create } from "zustand";

export type Notes = {
  title: string;
  content: string;
  category: string;
  id: string;
  isPinned?: boolean;
  
};

const emptyInputs: Notes = {
  title: "",
  content: "",
  category: "",
  id: "",
};

type Store = {
  Inputs: Notes;
  list: Notes[];
  editId: string | null;
  showForm: boolean;
  editForm: boolean;
  handleChange: (name: string, value: string) => void;
  handleEdit: (notes: Notes) => void;
  handleSubmit: () => void;
  handleForm: () => void;
  handleEditForm: () => void;
  handleCancel: () => void;
  deleteNote: (notes: Notes) => void;
  pinNote:(notes:Notes)=>void;
};

const useStore = create<Store>((set, get) => ({
  Inputs: emptyInputs,
  list: [],
  editId: null,
  showForm: false,
  editForm: false,
  isPinned:false,

  handleEdit: (notes) => {
    set({
      Inputs: {
        title: notes.title,
        content: notes.content,
        category: notes.category,
        id: notes.id,
      },
      editId: notes.id,
    });
  },

  handleChange: (name, value) =>
    set((state) => ({
      Inputs: {
        ...state.Inputs,
        [name]: value,
      },
    })),

  handleSubmit: () => {
    const { Inputs, editId } = get();

  
    if (!Inputs.title.trim()) return;

    if (!editId) {
      
      const newNote = {
        ...Inputs,
        id: crypto.randomUUID(),
        isPinned: false,
      };

      set((state) => ({
        list: [...state.list, newNote],
        Inputs: emptyInputs,
        showForm: false, 
        editForm: false,
      }));
    } else {
      // Edit Note Logic
      set((state) => ({
        list: state.list.map((notes) =>
          notes.id === editId
            ? {
                ...Inputs,
                id: editId,
              }
            : notes
        ),
        showForm: false, 
        editForm: false, 
        editId: null,
        Inputs: emptyInputs,
      }));
    }
  },

  
  handleForm: () => {
    set({
      showForm: true,
      editForm: false,
      editId: null,
      Inputs: emptyInputs, 
    });
  },


  handleEditForm: () => {
    set({
      editForm: true,
      showForm: true,
    });
  },

  
  handleCancel: () => {
    set({
      showForm: false,
      editForm: false,
      editId: null,
      Inputs: emptyInputs,
    });
  },

  deleteNote: (notes) => {
    set((state) => ({
      list: state.list.filter((item) => item.id !== notes.id),
    }));
  },

pinNote: (notes) => {
    set((state) => ({
      list: state.list.map((item) =>
        item.id === notes.id ? { ...item, isPinned: !item.isPinned } : item
      ),
    }));
  },

}));

export default useStore;