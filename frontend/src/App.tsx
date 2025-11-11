import { useState } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Toast from './components/Toast';

export interface ToastType {
  id: number;
  title: string;
  description: string;
  type: 'success' | 'error' | 'warning';
}

function App() {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const addToast = (title: string, description: string, type: 'success' | 'error' | 'warning' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, description, type }]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 5000);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Algorand Transaction Manager
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Send ALGO tokens on TestNet and track your transactions in real-time.
            Built with MERN stack and Algorand SDK.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <TransactionForm onToast={addToast} />
          </div>
          <div>
            <TransactionList onToast={addToast} />
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            title={toast.title}
            description={toast.description}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;