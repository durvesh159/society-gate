// src/utils/fakeData.js
export const residentSample = {
  id: "res_001",
  name: "Rahul Sharma",
  flat: "B-201",
  email: "rahul@example.com",
  phone: "+91 98765 43210",
  due: 1200,
  dueDate: "2025-12-05",
  lastPaid: "2025-10-01",
};

export const adminSummary = {
  totalCollected: 86000,
  pendingDues: 12400,
  overdue: 5200,
  paidCount: 78,
  unpaidCount: 12,
};

export const invoices = [
  {
    id: "INV-2025-001",
    residentName: "Rahul Sharma",
    flat: "B-201",
    period: "Nov 2025",
    amount: 1200,
    lateFee: 0,
    status: "Unpaid",
    date: "2025-11-01",
  },
  {
    id: "INV-2025-000",
    residentName: "Rahul Sharma",
    flat: "B-201",
    period: "Oct 2025",
    amount: 1200,
    lateFee: 0,
    status: "Paid",
    date: "2025-10-01",
  },
];

export const transactions = [
  { date: "2025-02-03", type: "Maintenance", method: "UPI", amount: 1200, status: "Paid" },
  { date: "2025-01-05", type: "Parking Fee", method: "Card", amount: 300, status: "Paid" },
  { date: "2024-12-05", type: "Maintenance", method: "Card", amount: 1200, status: "Paid" },
];

export const residentsList = Array.from({ length: 12 }).map((_, i) => ({
  id: `r${100 + i}`,
  name: `Resident ${i + 1}`,
  flat: `A-${100 + i}`,
  amountDue: Math.floor(Math.random() * 2000),
  status: Math.random() > 0.6 ? "Overdue" : Math.random() > 0.5 ? "Pending" : "Paid",
}));
