
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sell = () => {
    const [photo, setPhoto] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();

    // Check file size and convert image to Base64
    const handlePhotoChange = (event) => {
        const file = event.target.files[0];

        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            setMessage('Please select an image smaller than 2 MB.');
            setPhoto(null);
            event.target.value = '';
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            setPhoto(reader.result);
            setMessage('');
        };

        reader.readAsDataURL(file);
    };

    // Submit product to Express and MongoDB
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!photo || !name || !price || !description) {
            setMessage('Please fill out all fields.');
            return;
        }

        const numericPrice = Number(price);

        if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
            setMessage('Please enter a valid price.');
            return;
        }

        setSaving(true);
        setMessage('');

        try {
            const response = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    name,
                    price: numericPrice,
                    description,
                    image: photo
                })
            });

            if (!response.ok) {
                throw new Error('Failed to save product.');
            }

            setPhoto(null);
            setName('');
            setPrice('');
            setDescription('');
            setMessage('Item listed for sale successfully!');

            // Clear the file input after successful upload
            event.target.reset();

        } catch (error) {
            console.error('Error saving product:', error);
            setMessage('Failed to list item. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const inputClass =
        'w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100';

    return (
        <main className="mx-auto min-h-screen max-w-5xl px-5 py-12 md:px-10">

            {/* Page heading */}
            <div className="mb-10">
                <span className="rounded-full border border-teal-200 bg-white/80 px-4 py-2 text-xs font-bold tracking-widest text-teal-700">
                    STUDENT MARKETPLACE
                </span>

                <h1 className="mt-6 text-4xl font-extrabold text-slate-900 md:text-5xl">
                    Sell an <span className="text-blue-600">Item</span>
                </h1>

                <p className="mt-3 text-lg text-slate-500">
                    Give your items a second life and help another student.
                </p>
            </div>

            {/* Form card */}
            <div className="overflow-hidden rounded-3xl border border-white/90 bg-white/90 shadow-2xl shadow-blue-100/50 backdrop-blur-xl">
                <div className="grid md:grid-cols-5">

                    {/* Decorative side panel */}
                    <div className="flex flex-col justify-between bg-gradient-to-br from-blue-600 via-sky-500 to-teal-400 p-8 text-white md:col-span-2 md:p-10">
                        <div>
                            <div className="mb-8 text-6xl">📦</div>

                            <h2 className="text-3xl font-extrabold leading-tight">
                                Your next sale starts here.
                            </h2>

                            <p className="mt-5 leading-7 text-blue-50">
                                List books, electronics, and everyday essentials
                                for students in your community.
                            </p>
                        </div>

                        <div className="mt-12 rounded-2xl border border-white/30 bg-white/15 p-5 backdrop-blur-sm">
                            <p className="font-semibold">Quick tip</p>
                            <p className="mt-2 text-sm leading-6 text-blue-50">
                                Use a clear photo and an accurate description
                                to help buyers understand your item.
                            </p>
                        </div>
                    </div>

                    {/* Product form */}
                    <form onSubmit={handleSubmit} className="space-y-6 p-7 md:col-span-3 md:p-10">

                        {/* Image upload */}
                        <div>
                            <label className="mb-2 block font-semibold text-slate-700">
                                Product Photo
                            </label>

                            <div className="rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/50 p-5">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                    className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-blue-700"
                                />

                                <p className="mt-3 text-xs text-slate-500">
                                    Maximum image size: 2 MB
                                </p>

                                {photo && (
                                    <img
                                        src={photo}
                                        alt="Product preview"
                                        className="mt-4 h-40 w-full rounded-xl object-contain"
                                    />
                                )}
                            </div>
                        </div>

                        {/* Item name */}
                        <div>
                            <label className="mb-2 block font-semibold text-slate-700">
                                Item Name
                            </label>

                            <input
                                type="text"
                                placeholder="e.g. Calculus Textbook"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                className={inputClass}
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="mb-2 block font-semibold text-slate-700">
                                Price ($)
                            </label>

                            <input
                                type="number"
                                min="0.01"
                                step="0.01"
                                placeholder="e.g. 25.00"
                                value={price}
                                onChange={(event) => setPrice(event.target.value)}
                                className={inputClass}
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="mb-2 block font-semibold text-slate-700">
                                Description
                            </label>

                            <textarea
                                placeholder="Describe your item's condition and details..."
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                rows={4}
                                className={`${inputClass} resize-none`}
                            />
                        </div>

                        {/* Feedback */}
                        {message && (
                            <div
                                className={`rounded-xl p-4 text-sm font-medium ${message.includes('successfully')
                                    ? 'bg-green-50 text-green-700'
                                    : 'bg-red-50 text-red-600'
                                    }`}
                            >
                                {message}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full rounded-xl bg-blue-600 px-6 py-4 font-bold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {saving ? 'Publishing...' : 'List Item for Sale →'}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate('/welcome')}
                            className="w-full rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
                        >
                            ← Back to Home
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Sell;
