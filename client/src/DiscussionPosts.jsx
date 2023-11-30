import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import AddCommentForm from "./AddCommentForm";


export default function DiscussionPosts() {
    // const [outdoors, setOutDoorsData] = useState(useLoaderData().outdoorsData)
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

            <div>
            <h1>Available Books:</h1>
            <ol>
                <li>Book1</li>
                <li>Book2</li>
                <li>Book3</li>
                <li>Book4</li>
            </ol>
            </div>
            <br></br>

            <div>
                User Post : This is a test comment <input type="submit" value="Edit Post" className="submit"/>
            </div>
            <br></br>

            <div>
                <AddCommentForm />
            </div>


        </div>
    )
}