// src/pages/PaymentDashboard.jsx
import React, { useContext } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { AuthContext } from "../contexts/AuthContext";
import SummaryCards from "../components/SummaryCards";
import PaymentTimeline from "../components/PaymentTimeline";
import TransactionsTable from "../components/TransactionsTable";
import ChartsSection from "../components/ChartsSection";
import InvoiceCard from "../components/InvoiceCard";
import { residentSample, adminSummary, invoices, transactions } from "../utils/fakeData";
import { downloadInvoice } from "../utils/generateInvoice";

export default function PaymentDashboard() {
  const { user } = useContext(AuthContext);

  // Admin view
  if (user?.role === "admin") {
    return (
      <DashboardLayout role="admin">
        <div className="min-h-screen p-8 bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50">
          <h1 className="text-3xl font-bold text-purple-900 mb-6">Payments Dashboard</h1>
          <SummaryCards summary={adminSummary} />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <ChartsSection />
            </div>
            <div>
              <PaymentTimeline invoices={invoices} />
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-purple-900 mb-3">Transactions</h2>
            <TransactionsTable txns={transactions} />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Resident view
  return (
    <DashboardLayout role="resident">
      <div className="min-h-screen p-8 bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50">
        <h1 className="text-3xl font-bold text-purple-900 mb-4">My Payments</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="p-4 bg-white/70 rounded-2xl border border-purple-200">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-600">Total Due</div>
                  <div className="text-2xl font-bold">₹{residentSample.due}</div>
                  <div className="text-xs text-gray-500">Due Date: {residentSample.dueDate}</div>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="bg-purple-700 text-white px-4 py-2 rounded-lg">Pay Now</button>
                  <button className="bg-white border border-purple-200 px-4 py-2 rounded-lg">Download Last Invoice</button>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold text-purple-900">Recent Invoices</h3>
              <div className="space-y-3 mt-3">
                {invoices.map(inv => (
                  <InvoiceCard key={inv.id} invoice={inv} onDownload={(elId, file) => downloadInvoice(elId, file)} />
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="p-4 bg-white/70 rounded-2xl border border-purple-200">
              <h3 className="font-semibold text-purple-900">Quick Info</h3>
              <div className="mt-3 text-sm text-gray-700">
                <p>Last Paid: {residentSample.lastPaid}</p>
                <p>Flat: {residentSample.flat}</p>
                <p>Contact: {residentSample.phone}</p>
              </div>
            </div>

            <div className="mt-4">
              <TransactionsTable txns={transactions} />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
