
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ItemDetails = () => {
    // Get the product ID from the URL
    const { id } = useParams();
    const navigate = useNavigate();

    // Store the selected product
    const [item, setItem] = useState(null);

    // Track loading and errors
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch the selected product from Express/MongoDB
        fetch(`http://localhost:5000/api/products/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Product not found.');
                }

                return response.json();
            })
            .then((data) => {
                setItem(data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    // Loading state
    if (loading) {
        return (
            <main className="flex min-h-[80vh] items-center justify-center px-5">
                <div className="rounded-3xl bg-white/85 px-12 py-10 text-center shadow-xl backdrop-blur-xl">
                    <div className="mb-5 text-5xl">📦</div>
                    <p className="font-semibold text-slate-600">
                        Loading product...
                    </p>
                </div>
            </main>
        );
    }

    // Error or missing product
    if (error || !item) {
        return (
            <main className="flex min-h-[80vh] items-center justify-center px-5">
                <div className="w-full max-w-md rounded-3xl bg-white/90 p-10 text-center shadow-xl">
                    <div className="mb-5 text-5xl">🔍</div>

                    <h2 className="text-2xl font-bold text-slate-900">
                        Product unavailable
                    </h2>

                    <p className="mt-3 text-slate-500">
                        {error || 'Item not found.'}
                    </p>

                    <button
                        onClick={() => navigate('/buy')}
                        className="mt-7 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        ← Back to Listings
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="mx-auto min-h-[85vh] max-w-6xl px-5 py-12 md:px-10">

            {/* Back navigation */}
            <button
                onClick={() => navigate('/buy')}
                className="mb-8 inline-flex items-center gap-2 font-semibold text-blue-600 transition hover:text-blue-800"
            >
                ← Back to Marketplace
            </button>

            {/* Product details card */}
            <div className="overflow-hidden rounded-3xl border border-white/90 bg-white/90 shadow-2xl shadow-blue-100/50 backdrop-blur-xl">

                <div className="grid md:grid-cols-2">

                    {/* Product image */}
                    <div className="flex min-h-80 items-center justify-center bg-gradient-to-br from-blue-50 via-sky-50 to-teal-50 p-6 md:min-h-[500px] md:p-10">
                        {(item.image || item.photo) ? (
                            <img
                                src={item.image || item.photo}
                                alt={item.name || 'Product'}
                                className="max-h-[450px] w-full rounded-2xl object-contain shadow-sm"
                            />
                        ) : (
                            <div className="text-center">
                                <div className="text-8xl">📦</div>
                                <p className="mt-5 text-slate-500">
                                    No image available
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Product information */}
                    <div className="flex flex-col justify-center p-8 md:p-12">

                        <span className="w-fit rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-xs font-bold tracking-widest text-teal-700">
                            STUDENT MARKETPLACE
                        </span>

                        <h1 className="mt-7 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-4xl">
                            {item.name}
                        </h1>

                        <div className="mt-6">
                            <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                                Price
                            </p>

                            <p className="mt-2 text-4xl font-extrabold text-blue-600">
                                ${item.price}
                            </p>
                        </div>

                        <div className="my-8 border-t border-slate-100" />

                        {/* Description */}
                        <div>
                            <h2 className="text-lg font-bold text-slate-800">
                                About this item
                            </h2>

                            <p className="mt-4 whitespace-pre-wrap leading-8 text-slate-500">
                                {item.description}
                            </p>
                        </div>

                        {/* Purchase actions */}
                        <div className="mt-10 space-y-4">
                            <button
                                onClick={() =>
                                    alert('Purchase confirmation feature coming next!')
                                }
                                className="w-full rounded-xl bg-blue-600 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700"
                            >
                                Confirm Purchase →
                            </button>

                            <button
                                onClick={() => navigate('/buy')}
                                className="w-full rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-600 transition hover:bg-slate-50"
                            >
                                Continue Shopping
                            </button>
                        </div>

                        <p className="mt-6 text-center text-xs text-slate-400">
                            🎓 Connecting students through smarter shopping.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ItemDetails;
