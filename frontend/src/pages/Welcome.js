
import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
    return (
        <main className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-5 py-6">

            {/* Decorative background shapes */}
            <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-blue-200/40 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 bottom-5 h-72 w-72 rounded-full bg-teal-200/40 blur-3xl" />

            <div className="relative z-10 mx-auto w-full max-w-5xl text-center">

                {/* Welcome heading */}
                <span className="inline-block rounded-full border border-blue-200 bg-white/80 px-4 py-1.5 text-xs font-bold tracking-widest text-blue-600">
                    YOUR CAMPUS MARKETPLACE
                </span>

                <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                    Welcome to{' '}
                    <span className="text-blue-600">StudentEcom</span>
                </h1>

                <p className="mx-auto mt-3 max-w-xl text-base leading-6 text-slate-500">
                    Discover great deals, connect with fellow students,
                    and give your items a second life.
                </p>

                <h2 className="mt-6 text-xl font-bold text-slate-800">
                    What would you like to do?
                </h2>

                {/* Buy and Sell cards */}
                <div className="mt-5 grid gap-4 md:grid-cols-2">

                    {/* Buy card */}
                    <Link
                        to="/buy"
                        className="group rounded-3xl border border-white/90 bg-white/85 p-6 text-left shadow-xl shadow-blue-100/50 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
                    >
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-3xl transition group-hover:scale-110">
                            🛍️
                        </div>

                        <h3 className="text-2xl font-extrabold text-slate-900">
                            Buy Items
                        </h3>

                        <p className="mt-3 leading-6 text-slate-500">
                            Explore books, electronics, and everyday essentials
                            listed by students in your community.
                        </p>

                        <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white transition group-hover:bg-blue-700">
                            Explore Marketplace
                            <span>→</span>
                        </div>
                    </Link>

                    {/* Sell card */}
                    <Link
                        to="/sell"
                        className="group rounded-3xl border border-white/90 bg-white/85 p-6 text-left shadow-xl shadow-teal-100/50 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
                    >
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-100 text-3xl transition group-hover:scale-110">
                            📦
                        </div>

                        <h3 className="text-2xl font-extrabold text-slate-900">
                            Sell Items
                        </h3>

                        <p className="mt-3 leading-6 text-slate-500">
                            Turn unused items into cash while helping
                            another student find what they need.
                        </p>

                        <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 font-semibold text-white transition group-hover:bg-teal-700">
                            List an Item
                            <span>→</span>
                        </div>
                    </Link>
                </div>

                {/* Footer */}
                <p className="mt-5 text-sm text-slate-500">
                    🎓 Made for students, by students.
                </p>
            </div>
        </main>
    );
};

export default Welcome;
