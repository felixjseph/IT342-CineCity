import { useState } from "react";

export default function Checkout() {
    const [paymentMethod, setPaymentMethod] = useState({
        name: "",
        email: "",
        phone: "",
        type: "gcash"
    });
    const [loading, setLoading] = useState(false);
    const [paymentMethodId, setPaymentMethodId] = useState(null);

    const [selectedShipping, setSelectedShipping] = useState("gcash");
    const paymentIntentId = JSON.parse(localStorage.getItem("paymentIntentId"))

    const showtime = JSON.parse(localStorage.getItem("showtime2"));
    const seats = JSON.parse(localStorage.getItem("seats"));

    const handleChange = (e) => {
        setPaymentMethod({
            ...paymentMethod,
            [e.target.name]: e.target.value
        });
    };

    const handleShippingChange = (e) => {
        setSelectedShipping(e.target.value);
        setPaymentMethod({
            ...paymentMethod,
            type: e.target.value
        });
    };

    const handlePaymentMethod = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_DATA_URL}/payments/method`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify(paymentMethod)
            });

            const data = await response.json();

            if (response.ok) {
                setPaymentMethodId(data.data.id);
                console.log("Payment method created:", data);
                localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod))
                await handleAttachIntent(data.data.id);
            } else {
                console.error("Error creating payment method:", data);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAttachIntent = async (paymentMethodId) => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_DATA_URL}/payments/intent/attach/${paymentIntentId}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    payment_method: paymentMethodId,
                    client_key: `${import.meta.env.VITE_CLIENT_KEY}`,
                    return_url: "http://localhost:5173/payment"
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Intent attached successfully:", data);
                window.location.href = data.data.attributes.next_action.redirect.url;
            } else {
                console.error("Error attaching intent:", data);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                <div className="px-4 pt-8">
                    <p className="text-xl text-white font-medium">Order Summary</p>
                    <p className="text-gray-400">Check your items. And select a suitable payment type.</p>
                    <div className="mt-8 space-y-3 rounded-lg border border-gray-400 bg-[#2E2F33] px-2 py-4 sm:px-6">
                        <div className="flex flex-col rounded-lg bg-[#2E2F33] sm:flex-row">
                            <img
                                src={`${import.meta.env.VITE_DATA_URL}/movie/${showtime.movie.id}/cover?timestamp=${new Date().getTime()}`}
                                alt={`${showtime.movie.title} Cover`}
                                className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                            />
                            <div className="flex w-full flex-col px-4 py-4">
                                <span className="font-semibold text-white">{showtime.movie.title}</span>
                                <span className="float-right text-gray-400">{showtime.movie.duration} minutes</span>
                                <p className="text-lg font-bold text-white">₱{showtime.price}.00</p>
                            </div>
                        </div>
                    </div>

                    <p className="mt-8 text-lg text-white font-medium">Shipping Methods</p>
                    <form className="mt-5 grid gap-6">
                        <div className="relative">
                            <input
                                className="peer hidden"
                                id="radio_1"
                                type="radio"
                                name="radio"
                                value="gcash"
                                checked={selectedShipping === "gcash"}
                                onChange={handleShippingChange}
                            />
                            <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                            <label
                                className="flex items-center peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                                htmlFor="radio_1"
                            >
                                <img className="w-14 object-contain" src="/images/gcash.png" alt="" />
                                <div className="ml-5 ">
                                    <span className="mt-2 font-semibold">Gcash</span>
                                </div>
                            </label>
                        </div>
                        <div className="relative">
                            <input
                                className="peer hidden"
                                id="radio_2"
                                type="radio"
                                name="radio"
                                value="paymaya"
                                checked={selectedShipping === "paymaya"}
                                onChange={handleShippingChange}
                            />
                            <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                            <label
                                className="flex items-center peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                                htmlFor="radio_2"
                            >
                                <img className="w-14 object-contain" src="/images/PayMayaLogo.jpg" alt="" />
                                <div className="ml-5">
                                    <span className="mt-2 font-semibold">Paymaya</span>
                                </div>
                            </label>
                        </div>
                    </form>
                </div>
                <div className="mt-10 bg-[#2E2F33] px-4 pt-8 lg:mt-0">
                    <p className="text-xl text-white font-medium">Payment Details</p>
                    <p className="text-gray-400">Complete your order by providing your payment details.</p>
                    <div className="">
                        <label className="mt-4 mb-2 text-white block text-sm font-medium">Email</label>
                        <div className="relative">
                            <input
                                type="text"
                                name="email"
                                className="w-full rounded-md border text-white border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="your@email.com"
                                value={paymentMethod.email}
                                onChange={handleChange}
                            />
                            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                    />
                                </svg>
                            </div>
                        </div>
                        <label className="mt-4 mb-2 block text-white text-sm font-medium">Fullname</label>
                        <div className="relative">
                            <input
                                type="text"
                                name="name"
                                className="w-full rounded-md text-white border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Your full name here"
                                value={paymentMethod.name}
                                onChange={handleChange}
                            />
                            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <label className="mt-4 mb-2 block text-sm text-white font-medium">Phone Number</label>
                        <div className="flex">
                            <div className="relative w-7/12 flex-shrink-0">
                                <input
                                    type="text"
                                    name="phone"
                                    className="w-full text-white rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="+639 xxx xxx xxxx"
                                    value={paymentMethod.phone}
                                    onChange={handleChange}
                                />
                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <svg
                                        className="h-4 w-4 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                                        <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 border-t border-b py-2">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-white font-medium text-gray-900">Subtotal</p>
                                <p className="font-semibold text-white text-gray-900">₱{showtime.price}.00</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-white text-gray-900">Seats</p>
                                <div className="flex items-center">
                                    {seats.map((seat) => (
                                        <p key={seat.seatId} className="mx-1 text-white font-semibold ">{seat.seatNo}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                            <p className="text-sm font-medium text-white">Total</p>
                            <p className="text-2xl font-semibold text-white">₱{showtime.price * seats.length}.00</p>
                        </div>
                    </div>
                    <button
                        onClick={handlePaymentMethod}
                        className="mt-4 mb-8 w-full rounded-md bg-green-600 px-6 py-3 font-medium text-white cursor-pointer">
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
}