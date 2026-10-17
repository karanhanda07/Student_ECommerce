
import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
    return (
        <main className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-5 py-16">

            {/* Decorative background shapes */}
            <div className="pointer-events-none absolute -left-24 top-20 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-teal-200/40 blur-3xl" />

            <div className="relative z-10 mx-auto w-full max-w-5xl text-center">

                {/* Welcome heading */}
                <span className="inline-block rounded-full border border-blue-200 bg-white/80 px-5 py-2 text-xs font-bold tracking-widest text-blue-600">
                    YOUR CAMPUS MARKETPLACE
                </span>

                <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl">
                    Welcome to{' '}
                    <span className="text-blue-600">StudentEcom</span>
                </h1>

                <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-500">
                    Discover great deals, connect with fellow students,
                    and give your items a second life.
                </p>

                <h2 className="mt-12 text-2xl font-bold text-slate-800">
                    What would you like to do?
                </h2>

                {/* Buy and Sell cards */}
                <div className="mt-8 grid gap-6 md:grid-cols-2">

                    {/* Buy */}
                    <Link
                        to="/buy"
                        className="group rounded-3xl border border-white/90 bg-white/85 p-10 text-left shadow-xl shadow-blue-100/50 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                    >
                        <div className="mb-7 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100 text-5xl transition group-hover:scale-110">
                            🛍️
                        </div>

                        <h3 className="text-3xl font-extrabold text-slate-900">
                            Buy Items
                        </h3>

                        <p className="mt-4 leading-7 text-slate-500">
                            Explore books, electronics, and everyday essentials
                            listed by students in your community.
                        </p>

                        <div className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition group-hover:bg-blue-700">
                            Explore Marketplace
                            <span>→</span>
                        </div>
                    </Link>

                    {/* Sell */}
                    <Link
                        to="/sell"
                        className="group rounded-3xl border border-white/90 bg-white/85 p-10 text-left shadow-xl shadow-teal-100/50 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                    >
                        <div className="mb-7 flex h-20 w-20 items-center justify-center rounded-2xl bg-teal-100 text-5xl transition group-hover:scale-110">
                            📦
                        </div>

                        <h3 className="text-3xl font-extrabold text-slate-900">
                            Sell Items
                        </h3>

                        <p className="mt-4 leading-7 text-slate-500">
                            Turn unused items into cash while helping
                            another student find what they need.
                        </p>

                        <div className="mt-8 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white transition group-hover:bg-teal-700">
                            List an Item
                            <span>→</span>
                        </div>
                    </Link>
                </div>

                {/* Footer note */}
                <p className="mt-10 text-sm text-slate-500">
                    🎓 Made for students, by students.
                </p>
            </div>
        </main>
    );
};

export default Welcome;
