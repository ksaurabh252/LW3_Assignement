import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";

interface Transaction {
  _id: string;
  txId: string;
  from: string;
  to: string;
  amount: number;
  status: "pending" | "confirmed" | "failed";
  note?: string;
  confirmedRound?: number;
  createdAt: string;
}

interface TransactionListProps {
  onToast: (
    title: string,
    description: string,
    type?: "success" | "error" | "warning"
  ) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ onToast }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/api/algorand/transactions`);
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      onToast("Error", "Failed to fetch transactions", "error");
    } finally {
      setLoading(false);
    }
  };

  const updateTransactionStatus = async (txId: string) => {
    try {
      await axios.get(`${API_URL}/api/algorand/status/${txId}`);
      fetchTransactions();
      onToast("Status Updated", "Transaction status refreshed", "success");
    } catch (error) {
      console.error("Error updating transaction status:", error);
      onToast("Error", "Failed to update transaction status", "error");
    }
  };

  useEffect(() => {
    fetchTransactions();
    const interval = setInterval(fetchTransactions, 10000);
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <svg
            className="w-5 h-5 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        );
      case "failed":
        return (
          <svg
            className="w-5 h-5 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-5 h-5 text-amber-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-amber-100 text-amber-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-full">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Transaction History
            </h2>
            <p className="text-gray-600 mt-1">
              Recent transactions on Algorand TestNet
            </p>
          </div>
          <button
            onClick={fetchTransactions}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg
              className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {transactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No transactions yet
            </div>
          ) : (
            transactions.map((transaction) => (
              <div
                key={transaction._id}
                className="p-4 border border-gray-200 rounded-lg space-y-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(transaction.status)}
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        transaction.status
                      )}`}
                    >
                      {transaction.status.toUpperCase()}
                    </span>
                  </div>
                  <button
                    onClick={() => updateTransactionStatus(transaction.txId)}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                    title="Check status"
                  >
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
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">From:</span>
                    <div className="text-xs font-mono text-gray-600 truncate">
                      {transaction.from}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">To:</span>
                    <div className="text-xs font-mono text-gray-600 truncate">
                      {transaction.to}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Amount:</span>
                    <span className="ml-2 text-gray-900">
                      {transaction.amount.toLocaleString()} μALGO
                    </span>
                  </div>
                  {transaction.note && (
                    <div>
                      <span className="font-medium text-gray-700">Note:</span>
                      <span className="ml-2 text-gray-900">
                        {transaction.note}
                      </span>
                    </div>
                  )}
                  {transaction.confirmedRound && (
                    <div>
                      <span className="font-medium text-gray-700">
                        Confirmed Round:
                      </span>
                      <span className="ml-2 text-gray-900">
                        {transaction.confirmedRound}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <div className="text-xs text-gray-500">
                    {formatDate(transaction.createdAt)}
                  </div>
                  <a
                    href={`https://testnet.algoexplorer.io/tx/${transaction.txId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
                  >
                    View on Explorer
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
