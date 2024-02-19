import React from "react";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import '../styles.css';
//import DiscussionPosts from "../DiscussionPosts";

export default function BookClub() {
  const [allBookClubs, setallBookClubs] = useState(useLoaderData().bookclubsData);

  return (
    <div className="container mx-auto my-8">
      <div className="backgroundDiv"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allBookClubs.map((bookClub) => (
          <div key={bookClub.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-md p-6">
            <img
              src={bookClub.image_url}
              alt={bookClub.name}
              className="w-full h-48 object-cover club"
            />
            <div className="mt-4">
            <h2 className="text-xl font-semibold mb-4 text-white">{bookClub.name}</h2>
              <Link to={`/discussions/bybookclub/${bookClub.id}`}>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700">
                  Discussion Posts
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}