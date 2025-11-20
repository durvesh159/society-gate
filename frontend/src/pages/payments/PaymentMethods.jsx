// src/pages/PaymentMethods.jsx
import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import PaymentMethodCard from "../components/PaymentMethodCard";
import FakeCardForm from "../components/FakeCardForm";
import UPIForm from "../components/UPIForm";
import QRPopup from "../components/QRPopup";
import PaymentMethodIcon from "../components/PaymentMethodCard"; // re-use
import { FiPhone, FiCreditCard, FiGrid } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function PaymentMethods() {
  const [selected, setSelected] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const navigate = useNavigate();

  const onPay = (mode, payload) => {
    // Fake pay -> navigate to success page or show success UI
    navigate("/payment-success", { state: { mode, payload } });
  };

  return (
    <DashboardLayout role="resident">
      <div className="min-h-screen p-8 bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50">
        <h1 className="text-3xl font-bold text-purple-900 mb-6">Choose Payment Method</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <PaymentMethodCard title="UPI" subtitle="Google Pay / PhonePe / Paytm" onSelect={() => setSelected("upi")}>
            <FiPhone className="text-2xl text-purple-700" />
          </PaymentMethodCard>

          <PaymentMethodCard title="Card" subtitle="Visa / MasterCard" onSelect={() => setSelected("card")}>
            <FiCreditCard className="text-2xl text-purple-700" />
          </PaymentMethodCard>

          <PaymentMethodCard title="QR Code" subtitle="Scan QR to pay" onSelect={() => setShowQR(true)}>
            <FiGrid className="text-2xl text-purple-700" />
          </PaymentMethodCard>
        </div>

        <div className="mt-6">
          {selected === "card" && <FakeCardForm onPay={(m)=>onPay(m)} />}
          {selected === "upi" && <UPIForm onPay={(m, payload)=>onPay(m, payload)} />}
        </div>

        <QRPopup open={showQR} onClose={() => setShowQR(false)} upiId="society@upi" />
      </div>
    </DashboardLayout>
  );
}
