import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import useStore from "../store/store";

const Form = () => {
  // Local state for tracking validation errors
  const [errors, setErrors] = useState<{
    title?: string;
    content?: string;
    category?: string;
  }>({});

  // Zustand Store Selectors
  const Inputs = useStore((state) => state.Inputs);
  const handleChange = useStore((state) => state.handleChange);
  const handleSubmit = useStore((state) => state.handleSubmit);
  const showForm = useStore((state) => state.showForm);
  const handleCancel = useStore((state) => state.handleCancel);
  const editForm = useStore((state) => state.editForm);

  if (!showForm) return null;

  // Form Validation Logic
  const validateForm = (): boolean => {
    const newErrors: { title?: string; content?: string; category?: string } = {};

    if (!Inputs?.title?.trim()) {
      newErrors.title = "Title is required";
    }
    if (!Inputs?.content?.trim()) {
      newErrors.content = "Content is required";
    }
    if (!Inputs?.category) {
      newErrors.category = "Please select a category";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Typed Form Submit Handler
  const onFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit();
      setErrors({}); // Reset errors on success
    }
  };

  // Typed Change Handler that clears field error on typing
  const onInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    handleChange(name, value);

    // Clear field-specific error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Reset errors and close form
  const onCancelClick = (): void => {
    setErrors({});
    handleCancel();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl transition-all">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {editForm ? "Edit Note" : "New Note"}
        </h2>

        <form onSubmit={onFormSubmit} className="space-y-4">
          {/* Title Input */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={Inputs?.title || ""}
              onChange={onInputChange}
              placeholder="Enter Title"
              className={`w-full px-4 py-2.5 border rounded-lg outline-none transition ${
                errors.title
                  ? "border-red-500 focus:ring-2 focus:ring-red-100"
                  : "border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              }`}
            />
            {errors.title && (
              <p className="text-xs text-red-500 mt-1">{errors.title}</p>
            )}
          </div>

          {/* Content Textarea */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              name="content"
              value={Inputs?.content || ""}
              onChange={onInputChange}
              placeholder="Write your note..."
              rows={4}
              className={`w-full px-4 py-2.5 border rounded-lg outline-none resize-none transition ${
                errors.content
                  ? "border-red-500 focus:ring-2 focus:ring-red-100"
                  : "border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              }`}
            />
            {errors.content && (
              <p className="text-xs text-red-500 mt-1">{errors.content}</p>
            )}
          </div>

          {/* Category Select */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={Inputs?.category || ""}
              onChange={onInputChange}
              className={`w-full px-4 py-2.5 border rounded-lg bg-white outline-none transition ${
                errors.category
                  ? "border-red-500 focus:ring-2 focus:ring-red-100"
                  : "border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              }`}
            >
              <option value="">Select Category</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Ideas">Ideas</option>
              <option value="Tasks">Tasks</option>
            </select>
            {errors.category && (
              <p className="text-xs text-red-500 mt-1">{errors.category}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-3">
            <button
              type="submit"
              className={`w-full py-2.5 px-4 text-white font-medium rounded-lg active:scale-[0.98] transition ${
                editForm
                  ? "bg-amber-500 hover:bg-amber-600"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {editForm ? "Update Note" : "Save Note"}
            </button>
            <button
              type="button"
              onClick={onCancelClick}
              className="w-full py-2.5 px-4 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 active:scale-[0.98] transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;