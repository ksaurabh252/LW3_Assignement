import React, { useState } from "react";
import axios from "axios";

interface TransactionData {
  from: string;
  to: string;
  amount: number;
  mnemonic: string;
  note?: string;
}

interface TransactionFormProps {
  onToast: (
    title: string,
    description: string,
    type?: "success" | "error" | "warning"
  ) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onToast }) => {
  const [formData, setFormData] = useState<TransactionData>({
    from: "TW3A32K4HPTDKDH3DH645EYL46P37NA2T622MITEXT1850U",
    to: "",
    amount: 0,
    mnemonic: "",
    note: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.to || formData.amount <= 0 || !formData.mnemonic) {
      onToast(
        "Validation Error",
        "Please fill all required fields correctly",
        "error"
      );
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/algorand/send",
        formData
      );

      onToast(
        "Transaction Submitted",
        `Transaction ID: ${response.data.txId}`,
        "success"
      );

      // Reset form
      setFormData((prev) => ({
        ...prev,
        to: "",
        amount: 0,
        note: "",
      }));
    } catch (error: any) {
      console.error("Transaction error:", error);
      onToast(
        "Transaction Failed",
        error.response?.data?.error ||
        "An error occurred while sending transaction",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    field: keyof TransactionData,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
          Send ALGO Transaction
        </h2>
        <p className="text-gray-600 mt-1">
          Send ALGO tokens on Algorand TestNet. Use test accounts only.
        </p>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="from"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Sender Address
            </label>
            <input
              id="from"
              type="text"
              value={formData.from}
              onChange={(e) => handleChange("from", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter sender address"
              required
            />
          </div>

          <div>
            <label
              htmlFor="to"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Recipient Address *
            </label>
            <input
              id="to"
              type="text"
              value={formData.to}
              onChange={(e) => handleChange("to", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter recipient address"
              required
            />
          </div>

          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Amount (microALGOs) *
            </label>
            <input
              id="amount"
              type="number"
              value={formData.amount}
              onChange={(e) => handleChange("amount", Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter amount in microALGOs"
              required
              min="0"
            />
            <p className="text-sm text-gray-500 mt-1">
              1 ALGO = 1,000,000 microALGOs
            </p>
          </div>

          <div>
            <label
              htmlFor="mnemonic"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Sender Mnemonic *
            </label>
            <textarea
              id="mnemonic"
              value={formData.mnemonic}
              onChange={(e) => handleChange("mnemonic", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter 25-word mnemonic phrase"
              rows={3}
              required
            />
            <div className="flex items-center gap-2 text-sm text-amber-600 mt-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <span>For testing purposes only. Never use real mnemonics.</span>
            </div>
          </div>

          <div>
            <label
              htmlFor="note"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Note (Optional)
            </label>
            <input
              id="note"
              type="text"
              value={formData.note}
              onChange={(e) => handleChange("note", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add a note to the transaction"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing Transaction...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                Send Transaction
              </div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
