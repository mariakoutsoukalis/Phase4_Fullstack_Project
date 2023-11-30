import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Form from "../form";

// This component will render in the root's outlet at `/teas`.
export default function AddPlaces() {
    // Access this route's loader data and store it in state.
    // const [outdoors, setOutDoorsData] = useState(useLoaderData().outdoorsData)
    // const [museums, setMuseumData] = useState(useLoaderData().museumData)
    // const [entertainment, setEntertainment] = useState(useLoaderData().entertainmentData)

    // // We'll pass this function to <Form> to handle its `submit` event.
    // function handleSubmit(newObj) {
       
    //     if(newObj.category.toLowerCase() === "outdoors"){
    //         fetch("http://localhost:3000/outdoors", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json", "Accept": "application/json" },
    //         body: JSON.stringify({
    //             city:newObj.city,
    //             image:newObj.image,
    //             name: newObj.name,
    //             price: parseInt(newObj.price),
    //             ratings: parseFloat(newObj.ratings),
    //         })
    //     }).then(response => response.json())
    //       .then(newPlace => setOutDoorsData([...outdoors, newPlace]));
    //     }

    //     if(newObj.category.toLowerCase() === "museums"){
    //         fetch("http://localhost:3000/museums", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json", "Accept": "application/json" },
    //             body: JSON.stringify({
    //                 city:newObj.city,
    //                 image:newObj.image,
    //                 name: newObj.name,
    //                 price: parseInt(newObj.price),
    //                 ratings: parseFloat(newObj.ratings),
    //             })
    //         }).then(response => response.json())
    //           .then(newPlace => setMuseumData([...museums, newPlace]));
    //     }

    //     if(newObj.category.toLowerCase() === "entertainment"){
    //         fetch("http://localhost:3000/entertainment", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json", "Accept": "application/json" },
    //             body: JSON.stringify({
    //                 city:newObj.city,
    //                 image:newObj.image,
    //                 name: newObj.name,
    //                 price: parseInt(newObj.price),
    //                 ratings: parseFloat(newObj.ratings),
    //             })
    //         }).then(response => response.json())
    //           .then(newPlace => setEntertainment([...entertainment, newPlace]));
    //     }

       
    // }

    // // Render a grid of teas, as well as a form for adding new ones.
    // return (
    //     <div>
    //     <div className="background-div"></div>
    //     <div className="mt-2.5 grid grid-cols-2 gap-5">
        
    //         <Form handleSubmit={handleSubmit} />
    //     </div>
    //     </div>
    // )
}