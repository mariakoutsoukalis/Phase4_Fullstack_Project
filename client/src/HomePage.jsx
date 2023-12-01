// import { useState } from "react";
// import { useLoaderData } from "react-router-dom";

// // This component will render in the root's outlet at `/`.


// export default function HomePage() {
//     const [allBookClubs, setallBookClubs] = useState(useLoaderData().homebookclubsData);


//     return (
//         <div className="container">
//             <div className="background-div">

//             </div>
//         </div>
//     )
// }

import React, { useEffect, useState } from 'react';

function HomePage() {
  const [bookClubs, setBookClubs] = useState([]);

  useEffect(() => {
    fetch('/bookclubs')
      .then(response => response.json())
      .then(data => setBookClubs(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      margin: '0 auto',
      maxWidth: '600px',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    },
    header: {
      color: '#333',
      textAlign: 'center'
    },
    clubContainer: {
      backgroundColor: '#fff',
      borderRadius: '4px',
      padding: '15px',
      margin: '10px 0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    },
    clubName: {
      color: '#2a2a2a',
      fontWeight: 'bold'
    },
    clubDescription: {
      color: '#555',
      lineHeight: '1.6'
    }
  };

  return (
    
    
    <div style={styles.container}>
      <h1 style={styles.header}>Our Active Book Clubs:</h1>
      {bookClubs.map((club, index) => (
        <div key={index} style={styles.clubContainer}>
          <h2 style={styles.clubName}>{club.name}</h2>
          <p style={styles.clubDescription}>{club.description}</p>
        </div>
      ))}
    </div>
  );
}

export default HomePage;