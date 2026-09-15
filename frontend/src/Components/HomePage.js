import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import heroImage from '../assets/student-marketplace.png';

const HomePage = () => {
    return (
        <div className="landing-page">

            <header className="landing-nav">
                <Link to="/" className="brand">
                    <div className="brand-icon">🎓</div>

                    <div>
                        <div className="brand-name">
                            Student<span>Ecom</span>
                        </div>
                        <div className="brand-tagline">
                            Buy. Sell. Support Students.
                        </div>
                    </div>
                </Link>

                <div className="nav-actions">
                    <Link to="/login" className="nav-login">
                        Login
                    </Link>

                    <Link to="/signup" className="primary-button small-button">
                        Sign Up
                    </Link>
                </div>
            </header>


            <main className="hero">

                <section className="hero-content">
                    <p className="hero-label">STUDENT TO STUDENT</p>

                    <h1>
                        Buy. Sell. Support
                        <br />
                        Your Campus.
                    </h1>

                    <p className="hero-description">
                        A student-powered marketplace to buy and sell
                        books, gadgets, notes, and more — all within
                        your college community.
                    </p>

                    <div className="hero-buttons">
                        <Link to="/login" className="primary-button">
                            Login →
                        </Link>

                        <Link to="/signup" className="secondary-button">
                            Sign Up →
                        </Link>
                    </div>

                    <p className="hero-note">
                        Join a trusted community of students
                    </p>
                </section>


                <section className="hero-art">
                    <img
                        src={heroImage}
                        alt="Students buying and selling products"
                    />
                </section>

            </main>


            <section className="features">

                <div className="feature">
                    <div className="feature-icon">👥</div>
                    <h3>Student Community</h3>
                    <p>
                        Buy and sell with fellow students from your college.
                    </p>
                </div>

                <div className="feature">
                    <div className="feature-icon">🛡️</div>
                    <h3>Safe & Simple</h3>
                    <p>
                        A simple and easy-to-use student marketplace.
                    </p>
                </div>

                <div className="feature">
                    <div className="feature-icon">🌱</div>
                    <h3>Sustainable</h3>
                    <p>
                        Give items a second life and reduce waste.
                    </p>
                </div>

            </section>

        </div>
    );
};

export default HomePage;