import { useState } from "react"

// This form lets users add new teas to our backend.
// Note: On `submit`, this form will trigger `handleSubmit(event)`,

export default function AddCommentForm({ handleSubmit }) {
    // We'll control the form's inputs with state.
    const [formData, setFormdata] = useState([{
        discussionPostDescription:""
        
        }
    ]);
    
    function handleChange(event){
            setFormdata({...formData, [event.target.name]: event.target.value})
    }
    function handleFormSubmit(event){
        event.preventDefault();
        const newObj={
            discussionPostDescription:formData.discussionPostDescription
        }
        handleSubmit(newObj);
        setFormdata({
            discussionPostDescription:""
          })
    }
    return (
        <form onSubmit={handleFormSubmit} className="flex flex-col justify-between">
            
            <label>Enter comments:</label> <input name="discussionPostDescription" type="text" placeholder="Enter your comments..." className="input-text" value={formData.discussionPostDescription} onChange={handleChange}/>
            
            <input type="submit" value="Add New Comment" className="submit"/>
            
        </form>
    )
}