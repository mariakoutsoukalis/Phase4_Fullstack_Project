// This component will render in the root's outlet at `/bookclub`.
import React from "react";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import DiscussionPosts from "../DiscussionPosts"
export default function BookClub() {
    const [allBookClubs, setallBookClubs] = useState(useLoaderData().bookclubsData)
    return (
        <div>
        <div className="background-div"></div>
        <div className="things-collection"> 
                {allBookClubs.map(bookClub => 
                <div key={bookClub.id} className="image-container">
                        <img src={bookClub.image_url} className="thing-avatar"/>
                        <div>
                            <h2>{bookClub.name}</h2>
                            <Link to={`/discussions/bybookclub/${bookClub.id}`}>
                            <button className="custom-button"> Go to discussion Posts</button>
                            </Link>
                         </div>
                    
                </div>)}
        </div>
               
        </div>
    )
}