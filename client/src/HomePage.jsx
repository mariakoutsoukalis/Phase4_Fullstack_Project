import React, { useEffect, useState } from 'react';

function HomePage() {
  const [bookClubs, setBookClubs] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/bookclubs')
      .then(response => response.json())
      .then(data => setBookClubs(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      margin: '0 auto',
      maxWidth: 'fit-content',
      padding: '10px',
      backgroundColor: 'rgba(255, 255, 255, 0)',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    },
    header: {
      color: 'white',
      fontWeight: 'bold',
      lineHeight: '1.6',
      fontSize: 'medium'
    },
    clubContainer: {
      backgroundColor: 'rgba(31, 41, 55, 0.8)',
      borderRadius: '4px',
      padding: '10px',
      margin: '20px 0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    },
    clubName: {
      color: 'rgba(255, 255, 255, 1)',
      fontWeight: 'bold',
      lineHeight: '1.6',
      fontSize: 'medium'
    },
    clubDescription: {
      color: 'white',
      lineHeight: '1.6',
      fontSize: 'larger',
      transition: 'transform 0.3s ease-in-out', // Add this line
    },
   
    backgroundDiv: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1
    },
    backgroundVideo: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
    // backgroundDiv: {
    //   position: 'fixed',
    //   top: 0,
    //   left: 0,
    //   width: '100%',
    //   height: '100%',
    //   backgroundImage: "url('https://www.murphysamandjodi.com/wp-content/uploads/2023/04/bigstock-Stacks-Of-The-Different-Books-459245695_2.jpg')",
    //   backgroundSize: 'cover',
    //   backgroundPosition: 'center',
    //   zIndex: -1,
    // },
  };

  return (
    <div>
      <div style={styles.backgroundDiv}>
        <video style={styles.backgroundVideo} autoPlay loop muted>
        <source src="/pagepalsvid.mp4" type="video/mp4" />
        </video>
      </div>
      <div style={styles.container}>
        <h1 style={styles.header}>Active Forums:</h1>
        {bookClubs.map((club, index) => (
          <div key={index} style={styles.clubContainer}>
            <h2 style={styles.clubName}>{club.name}</h2>
            <p style={styles.clubDescription}>{club.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
  // return (
//     <div style={styles.flexContainer}>
//       <div style={styles.backgroundDiv}></div>
//       <div style={styles.container}>
//         {/* <h1 style={styles.header}>Active Forums:</h1> */}
//         {bookClubs.map((club, index) => (
//           <div key={index} style={styles.clubContainer}>
//             <h2 style={styles.clubName}>{club.name}</h2>
//             <p style={styles.clubDescription}>{club.description}</p>
//           </div>
//         ))}
//       </div>
//     // </div>
//   );
};

export default HomePage;