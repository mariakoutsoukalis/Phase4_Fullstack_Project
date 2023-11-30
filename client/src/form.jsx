import { useState } from "react"

// This form lets users add new teas to our backend.
// Note: On `submit`, this form will trigger `handleSubmit(event)`,

export default function Form({ handleSubmit }) {
    // We'll control the form's inputs with state.
    // const [formData, setFormdata] = useState([{
    //     category:"",
    //     city:"",
    //     image:"",
    //     name: "",
    //     price: "",
    //     ratings: ""
    //     }
    // ]);
    
    // function handleChange(event){
    //         setFormdata({...formData, [event.target.name]: event.target.value})
    // }
    // function handleFormSubmit(event){
    //     event.preventDefault();
    //     const newObj={
    //         category:formData.category,
    //         city:formData.city,
    //         image:formData.image,
    //         name: formData.name,
    //         price: parseInt(formData.price),
    //         ratings: parseFloat(formData.ratings),
    //     }
    //     handleSubmit(newObj);
    //     setFormdata({
    //         category:"",
    //         city:"",
    //         image:"",
    //         name: "",
    //         price: "",
    //         ratings: ""
    //     })

    // }
    // return (
    //     <form onSubmit={handleFormSubmit} className="flex flex-col justify-between">
            
    //         <input name="category" type="text" placeholder="Enter Category..(outdoors/museums/entertainment)" className="input-text" value={formData.category} onChange={handleChange}/>
    //         <input name="city" type="text" placeholder="Enter City.." className="input-text" value={formData.city} onChange={handleChange}/>
    //         <input name="image" type="text" placeholder="Enter Image Url.." className="input-text" value={formData.image} onChange={handleChange}/>
    //         <input name="name" type="text" placeholder="Enter name of the place.." className="input-text" value={formData.name} onChange={handleChange} />
    //         <input name="price" type="text" placeholder="Enter Price.." className="input-text" value={formData.price} onChange={handleChange} />
    //         <input name="ratings" type="text" placeholder="Enter Ratings.." className="input-text" value={formData.ratings} onChange={handleChange}/>
    //         <input type="submit" value="Add New Place"
    //                    className="submit"
    //             />
            
    //     </form>
   // )
}