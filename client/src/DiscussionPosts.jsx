import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import AddCommentForm from "./AddCommentForm";


export default function DiscussionPosts() {
    const [discussionPosts, setdiscussionPosts] = useState(useLoaderData().discussionPostsData)
    const [allBooks, setAllBooks] = useState(useLoaderData().allBooksData)
    
    
    
    
    function handleSubmit(newObj) {
       
      
            fetch("http://localhost:3000/discussion-posts", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify({
                discussionPostDescriptiony:newObj.discussionPostDescription
                })
        }).then(response => response.json())
        //   .then(newPlace => setOutDoorsData([...outdoors, newPlace]));
        
    }
    return (
        <div>
            <div className="background-div"></div>
            <br></br>
            <div>
            <h1 style={{ fontWeight: 'bold' }}>Available Books:</h1>
            
            <ul>
                {allBooks.map((book) => (
                <li key={book.id}>{book.title}</li>
                ))}
            </ul>
            </div>
            <br></br>

            <div>
            <h1 style={{ fontWeight: 'bold' }}>Discussion Posts:</h1>
                {discussionPosts.map(discussionPost => 
                <div key={discussionPost.id}>
                    {/* <h2>User: {discussionPost.content}</h2>  */}
                    
                   User: <input
                    type="text"
                    value={discussionPost.content} 
                    disabled
                    style={{
                        width: '50%', // Adjust width as needed
                        padding: '10px', // Adjust padding as needed
                        marginTop: '10px', // Adjust margin as needed
                    }}
                    />
                </div>)}
               
            </div>
            <br></br>

            <div>
                <AddCommentForm />
            </div>


        </div>
    )
}