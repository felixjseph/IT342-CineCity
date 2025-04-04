import React, { useState } from "react";

const PaymentButton = () => {
    const [loading, setLoading] = useState(false);
    const [paymentData, setPaymentData] = useState(null);

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("http://localhost:8080/payments/intent", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    amount: "20000"
                }),
                credentials:'include'
            });

            const data = await response.json();

            if (response.ok) {
                setPaymentData(data);
                console.log("Payment Intent created:", data);
                alert("Payment Intent created. Check your backend logs or PayMongo dashboard.");
            } else {
                console.error("Error:", data);
                alert("Error: " + (data.error || "Something went wrong"));
            }
        } catch (error) {
            console.error("Payment Error:", error);
            alert("Payment Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={handlePayment} disabled={loading}>
                {loading ? "Processing..." : "Create Payment Intent"}
            </button>
            {paymentData && (
                <pre style={{ textAlign: "left" }}>
                    {JSON.stringify(paymentData, null, 2)}
                </pre>
            )}
        </div>
    );
};

export default PaymentButton;
