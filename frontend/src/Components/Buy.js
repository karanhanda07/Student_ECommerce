
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Buy = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Load products from MongoDB through Express
    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                return response.json();
            })
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setError('Could not load products. Please try again.');
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <main className="mx-auto min-h-screen max-w-7xl px-5 py-12 md:px-10">

            {/* Page heading */}
            <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
                <div>
                    <span className="rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-xs font-bold tracking-widest text-blue-600">
                        STUDENT MARKETPLACE
                    </span>

                    <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                        Explore <span className="text-blue-600">Items</span>
                    </h1>

                    <p className="mt-3 text-lg text-slate-500">
                        Discover great deals from your campus community.
                    </p>
                </div>

                <button
                    onClick={() => navigate('/welcome')}
                    className="rounded-xl border border-blue-200 bg-white/80 px-5 py-3 font-semibold text-blue-700 shadow-sm transition hover:bg-white"
                >
                    ← Back to Home
                </button>
            </div>

            {/* Product count */}
            {!loading && !error && (
                <div className="mb-6 text-sm font-medium text-slate-500">
                    {products.length} {products.length === 1 ? 'item' : 'items'} available
                </div>
            )}

            {/* Loading and error states */}
            {loading && (
                <div className="rounded-3xl bg-white/80 p-12 text-center text-slate-500 shadow-lg">
                    Loading products...
                </div>
            )}

            {error && (
                <div className="rounded-2xl border border-red-100 bg-red-50 p-5 text-red-600">
                    {error}
                </div>
            )}

            {/* Empty marketplace */}
            {!loading && !error && products.length === 0 && (
                <div className="rounded-3xl border border-white/80 bg-white/85 px-6 py-20 text-center shadow-xl shadow-blue-100/50">
                    <div className="mb-5 text-5xl">📦</div>

                    <h2 className="text-2xl font-bold text-slate-900">
                        No items available yet
                    </h2>

                    <p className="mt-3 text-slate-500">
                        Be the first student to list something!
                    </p>

                    <button
                        onClick={() => navigate('/sell')}
                        className="mt-7 rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white hover:bg-blue-700"
                    >
                        Sell an Item →
                    </button>
                </div>
            )}

            {/* Product cards */}
            {!loading && !error && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((item, index) => (
                        <div
                            key={item._id || index}
                            className="group overflow-hidden rounded-3xl border border-white/90 bg-white/90 shadow-xl shadow-blue-100/40 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                        >
                            {/* Product image */}
                            <div className="relative h-56 overflow-hidden bg-gradient-to-br from-blue-50 to-teal-50">
                                {(item.image || item.photo) ? (
                                    <img
                                        src={item.image || item.photo}
                                        alt={item.name || 'Item'}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-6xl">
                                        📦
                                    </div>
                                )}

                                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-1.5 text-xs font-bold text-blue-600 shadow-sm backdrop-blur">
                                    CAMPUS DEAL
                                </span>
                            </div>

                            {/* Product information */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-slate-900">
                                    {item.name || 'Custom Item'}
                                </h3>

                                <p className="mt-3 min-h-12 text-sm leading-6 text-slate-500">
                                    {item.description}
                                </p>

                                <div className="mt-6 flex items-center justify-between gap-3">
                                    <span className="text-2xl font-extrabold text-blue-600">
                                        {item.price != null ? `$${item.price}` : 'Price unavailable'}
                                    </span>

                                    <button
                                        onClick={() => navigate(`/item/${item._id}`)}
                                        className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                                    >
                                        Buy Now →
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
};

export default Buy;
