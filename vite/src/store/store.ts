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
    editId:string | "";
    setInput: (input: Notes) => void;
    handleChange: (name: string, value: string) => void;
    handleSubmit: () => void;
};

const useStore = create<Store>((set, get) => ({
    Inputs: emptyInputs,

    list: [],

    editId:"",
    setInput: (input) => set({ Inputs: input }),

    handleChange: (name, value) =>
        set((state) => ({
            Inputs: {
                ...state.Inputs,
                [name]: value,
            },
        })),

    handleSubmit: () => {
        const { Inputs } = get();

        const newNote = {
            ...Inputs,
            id: crypto.randomUUID(),
        };

        set((state) => ({
            list: [...state.list, newNote],
            Inputs: emptyInputs,
        }));
    },
}));

export default useStore;