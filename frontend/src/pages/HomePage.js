
import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/student-marketplace.png';

const HomePage = () => {
    const features = [
        {
            icon: '👥',
            title: 'Student Community',
            description: 'Buy and sell with fellow students from your college.'
        },
        {
            icon: '🛡️',
            title: 'Safe & Simple',
            description: 'A simple and easy-to-use student marketplace.'
        },
        {
            icon: '🌱',
            title: 'Sustainable',
            description: 'Give items a second life and reduce waste.'
        }
    ];

    return (
        <div className="relative min-h-screen overflow-hidden text-slate-800">

            {/* Decorative shapes */}
            <div className="pointer-events-none absolute -left-32 top-40 h-96 w-96 rounded-full border-[55px] border-blue-200/40" />
            <div className="pointer-events-none absolute -right-36 top-64 h-[500px] w-[500px] rounded-full border-[65px] border-teal-200/40" />

            {/* Navigation */}
            <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-7 md:px-10">
                <Link to="/" className="flex items-center gap-3 no-underline">
                    <span className="text-4xl">🎓</span>

                    <div>
                        <div className="text-2xl font-extrabold text-slate-900">
                            Student<span className="text-blue-600">Ecom</span>
                        </div>
                        <p className="text-xs text-slate-500">
                            Buy. Sell. Support Students.
                        </p>
                    </div>
                </Link>

                <div className="flex items-center gap-5">
                    <Link to="/login" className="font-semibold text-slate-700 hover:text-blue-600">
                        Login
                    </Link>

                    <Link to="/signup" className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">
                        Sign Up
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <main className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-6 py-10 md:grid-cols-2 md:px-10 md:py-12">
                <section>
                    <span className="inline-block rounded-full border border-blue-200 bg-white/80 px-5 py-2 text-xs font-bold tracking-[0.2em] text-blue-600">
                        STUDENT TO STUDENT
                    </span>

                    <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-6xl">
                        Buy. Sell.
                        <br />
                        Support
                        <br />
                        <span className="text-blue-600">Your Campus.</span>
                    </h1>

                    <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
                        A student-powered marketplace to buy and sell books,
                        gadgets, notes, and more — all within your college community.
                    </p>

                    <div className="mt-9 flex flex-wrap gap-4">
                        <Link to="/login" className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-1 hover:bg-blue-700">
                            Login →
                        </Link>

                        <Link to="/signup" className="rounded-xl border border-blue-200 bg-white/90 px-8 py-4 font-semibold text-blue-700 shadow-sm transition hover:-translate-y-1 hover:bg-white">
                            Sign Up →
                        </Link>
                    </div>

                    <p className="mt-6 text-sm text-slate-500">
                        Join a trusted community of students
                    </p>
                </section>

                <section className="relative">
                    <div className="absolute -inset-8 rounded-full bg-gradient-to-tr from-blue-300/50 via-teal-200/40 to-amber-200/40 blur-3xl" />

                    <div className="relative rounded-[2.5rem] border border-white/80 bg-white/30 p-4 shadow-2xl shadow-blue-200/40 backdrop-blur-sm">
                        <img
                            src={heroImage}
                            alt="Students buying and selling products"
                            className="max-h-[380px] w-full rounded-[2rem] object-contain"
                        />
                    </div>
                </section>
                <div className="text-center text-sm font-semibold text-blue-600 md:col-span-2">
                    ↓ Scroll to explore
                </div>
            </main>

            {/* Features */}
            <section className="relative z-10 mx-auto grid max-w-6xl gap-6 px-6 pb-20 md:grid-cols-3">
                {features.map((feature) => (
                    <div
                        key={feature.title}
                        className="rounded-3xl border border-white/90 bg-white/80 p-8 text-center shadow-xl shadow-blue-100/50 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                    >
                        <div className="mb-5 text-4xl">{feature.icon}</div>

                        <h3 className="mb-3 text-xl font-bold text-slate-900">
                            {feature.title}
                        </h3>

                        <p className="leading-7 text-slate-500">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default HomePage;
