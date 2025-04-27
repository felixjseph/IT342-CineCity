import React, { useState } from "react";

const PaymentButton = () => {
    const [loading, setLoading] = useState(false);
    const [paymentData, setPaymentData] = useState(null);

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_DATA_URL}/payments/intent`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    amount: "20000"
                }),
                credentials: 'include'
            });

            const data = await response.json();
            
            if (response.ok) {
                setPaymentData(data);
                console.log("Payment Intent created:", data);
                localStorage.setItem("intent",JSON.stringify(paymentData))
            } else {
                console.error("Error:", data);
            }
        } catch (error) {
            console.error("Payment Error:", error);
            alert("Payment Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full my-4">
            <button
                onClick={handlePayment}
                disabled={loading}
                className="px-2 py-2 w-full rounded bg-green-700 cursor-pointer hover:bg-green-400"
            >
                {loading ? "Processing..." : "Proceed to payment"}
            </button>
        </div>
    );
};

export default PaymentButton;
