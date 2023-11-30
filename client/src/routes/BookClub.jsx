// This component will render in the root's outlet at `/bookclub`.
import React from "react";
import { Link } from "react-router-dom";
import DiscussionPosts from "../DiscussionPosts"
export default function BookClub() {
    const [allBookClubs, setallBookClubs] = useState(useLoaderData().bookclubsData)
    return (
        <div>
        <div className="background-div"></div>
        <div className="things-collection"> 
                
                <div className="image-container">
                <img src="https://englishkillsreview.com/photos/20140829/wordsign.jpg" className="thing-avatar"/>
                        <div>
                            <h2>Word Book Club</h2>
                            <Link to="/discussion-posts">
                            <button className="custom-button"> Go to discussion Posts</button>
                            </Link>
                            {/* <h3>from ${travelItem.price}</h3> */}
                        </div>
                        {/* <div>
                            <h3>{parseFloat(travelItem.ratings)}☆</h3>
                        </div> */}
                </div>
            </div>
        </div>
    )
}