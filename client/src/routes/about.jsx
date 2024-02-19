import React from 'react';
import '../styles.css';

const About = () => {
    const styles = {
        container: {
            width: '80%',
            margin: 'auto',
            overflow: 'hidden',
            textAlign: 'center', // Center the content inside the container
        },
        header: {
            background: '#333',
            color: '#fff',
            padding: '10px 0',
            textAlign: 'center',
        },
        branding: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        highlight: {
            color: '#e8491d',
        },
        nav: {
            textAlign: 'center',
            marginTop: '10px',
        },
        navUl: {
            listStyle: 'none',
            padding: 0,
        },
        navLi: {
            display: 'inline',
            marginRight: '20px',
        },
        navLiCurrent: {
            fontWeight: 'bold',
        },
        navA: {
            color: '#fff',
            textDecoration: 'none',
        },
        aboutSection: {
            backgroundColor: '#f4f4f4',
            padding: '20px',
            borderRadius: '5px',
            textAlign: 'center', // Center the content inside the section
        },
        aboutHeader: {
            textAlign: 'center',
        }
    };

    return (
        <div>
            <div className="backgroundDiv2"></div>
            <header style={styles.header}>
                <div style={styles.container}>
                    <div style={styles.branding}>
                        <h1><span style={styles.highlight}>Thank You for Being a PagePal</span></h1>
                    </div>
                </div>
            </header>

            <div style={styles.container}>
                <section style={styles.aboutSection} className="about">
                    <p>See You Soon</p>
                </section>
            </div>
        </div>
    );
};

export default About;
