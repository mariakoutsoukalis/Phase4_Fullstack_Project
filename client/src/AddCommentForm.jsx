import { useState } from "react";

export default function AddCommentForm({ handleSubmit }) {
  const [formData, setFormdata] = useState({
    content: "",
  });

  function handleChange(event) {
    setFormdata({ ...formData, [event.target.name]: event.target.value });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const newObj = {
      content: formData.content,
    };
    handleSubmit(newObj);
    setFormdata({
      content: "",
    });
  }

  return (
    <form onSubmit={handleFormSubmit} className="bg-white p-4 rounded-md shadow-md my-4">
      <label className="block text-xl font-semibold mb-2">Enter comments:</label>
      <input
        name="content"
        type="text"
        placeholder="Enter your comments..."
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
        value={formData.content}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Add New Post
      </button>
    </form>
  );
}
