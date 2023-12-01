import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import AddCommentForm from "./AddCommentForm";

const DiscussionPosts = () => {
  const [discussionPosts, setDiscussionPosts] = useState(useLoaderData().discussionPostsData);
  const [allBooks, setAllBooks] = useState(useLoaderData().allBooksData);
  const firstBookclubId = discussionPosts.length > 0 ? discussionPosts[0].bookclub_id : null;

  const handleSubmit = (newObj) => {
    fetch(`/discussions/${firstBookclubId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        content: newObj.content,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(newPost => setDiscussionPosts([...discussionPosts, newPost]))
      .catch(error => {
        console.error('Error submitting post:', error);
      });
  };

  const handleEditClick = (index) => {
    const updatedPosts = [...discussionPosts];
    updatedPosts[index].editMode = true;
    setDiscussionPosts(updatedPosts);
  };

  const handleEditDone = (index) => {
    const updatedPosts = [...discussionPosts];
    updatedPosts[index].editMode = false;
    setDiscussionPosts(updatedPosts);
  };

  const handleContentChange = (index, content) => {
    const updatedPosts = [...discussionPosts];
    updatedPosts[index].content = content;
    setDiscussionPosts(updatedPosts);
  };

  const handlePatchRequest = (postId, content) => {
    fetch(`/discussions/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        content: content,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(updatedPost => {
        // Handle the updated post as needed
      })
      .catch(error => {
        console.error('Error updating post:', error);
      });
  };

  const handleDeleteClick = (postId) => {
    fetch(`/discussions/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        const updatedPosts = discussionPosts.filter(post => post.id !== postId);
        setDiscussionPosts(updatedPosts);
      })
      .catch(error => {
        console.error('Error deleting post:', error);
      });
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="bg-gray-100 p-8 rounded-md">
        <h1 className="text-2xl font-semibold mb-4">Available Books:</h1>
        <ul>
          {allBooks.map((book) => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-8 mt-8 rounded-md">
        <h1 className="text-2xl font-semibold mb-4">Discussion Posts:</h1>
        {discussionPosts.map((discussionPost, index) => (
          <div key={discussionPost.id} className="mb-4">
            <span className="font-bold">{discussionPost.username}:</span>
            <input
              type="text"
              value={discussionPost.content}
              disabled={!discussionPost.editMode}
              onChange={(e) => handleContentChange(index, e.target.value)}
              className="w-2/3 p-2 mt-2 border border-gray-300 rounded-md"
            />
            <button
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={() => {
                if (discussionPost.editMode) {
                  handlePatchRequest(discussionPost.id, discussionPost.content);
                  handleEditDone(index);
                } else {
                  handleEditClick(index);
                }
              }}
            >
              {discussionPost.editMode ? "Done" : "Edit"}
            </button>
            <button
              className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md"
              onClick={() => handleDeleteClick(discussionPost.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <AddCommentForm handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default DiscussionPosts;
