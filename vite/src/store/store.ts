import { create } from "zustand";

export type Notes = {
  title: string;
  content: string;
  category: string;
  id: string;
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

  handleChange: (name: string, value: string) => void;
  handleEdit: (notes: Notes) => void;
  handleSubmit: () => void;
};

const useStore = create<Store>((set, get) => ({
  Inputs: emptyInputs,

  list: [],

  editId: null,


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
    
    if (!editId) {
      const newNote = {
        ...Inputs,
        id: crypto.randomUUID(),
      };

      set((state) => ({
        list: [...state.list, newNote],
        Inputs: emptyInputs,
      }));
    } else {
      set((state) => ({
        list: state.list.map((notes) =>
          notes.id === editId
            ? {
                ...Inputs,
                id: editId,
              }
            : notes
        ),

        editId: null,
        Inputs: emptyInputs,
      }));
    }
  },
}));

export default useStore;