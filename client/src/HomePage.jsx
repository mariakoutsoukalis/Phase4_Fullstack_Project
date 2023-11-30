import { useState } from "react";
import { useLoaderData } from "react-router-dom";

// This component will render in the root's outlet at `/`.


export default function HomePage() {

    // const [thingsTodisplay, setThingsToDisplay] = useState(useLoaderData().recommendedData)
    // const [outdoors, setOutDoorsData] = useState(useLoaderData().outdoorsData)
    // const [museums, setMuseumData] = useState(useLoaderData().museumData)
    // const [entertainment, setEntertainment] = useState(useLoaderData().entertainmentData)
    
    // const [search, setSearch] = useState("")

    // function handleOutdoorsClick(){
    //     setThingsToDisplay(outdoors)
    // }
    // function handleMuseumsClick(){
    //     setThingsToDisplay(museums)
    // }
    // function handleEntertainmentClick(){
    //     setThingsToDisplay(entertainment)
    // }
   
    //     const filteredThingsToDisplay= thingsTodisplay.filter( thingToDisplay => thingToDisplay.name.toLowerCase().includes(search.toLowerCase())
    //     || thingToDisplay.city.toLowerCase().includes(search.toLowerCase()))
    

    return (
        <div className="container">
            <div className="background-div">
                {/* <div className="center-vertically">
                    <div className="search-container">
                        <input type="text" id="search-box" placeholder="Search for experiences and cities"
                        value={search} onChange={(event) => setSearch(event.target.value)}/>
                    </div>
                </div> */}
            </div>
            {/* <br></br>
            <div className="button-container">
                <button className="custom-button" onClick={handleOutdoorsClick}>Outdoors</button>
                <button className="custom-button" onClick={handleMuseumsClick}>Museums</button>
                <button className="custom-button" onClick={handleEntertainmentClick}>Entertainment</button>
            </div>
            <div className="things-collection"> 
                {filteredThingsToDisplay.map(travelItem => 
                <div key={travelItem.id} className="image-container">
                        <img src={travelItem.image} className="thing-avatar"/>
                        <div>
                            <h2>{travelItem.city} - {travelItem.name}</h2>
                            <h3>from ${travelItem.price}</h3>
                        </div>
                        <div>
                            <h3>{parseFloat(travelItem.ratings)}☆</h3>
                        </div>
                    
                </div>)}
            </div> */}
        </div>
    )
}