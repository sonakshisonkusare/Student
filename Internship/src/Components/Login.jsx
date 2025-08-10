import React from "react";

function App() {
  return (
    <div className="min-h-screen bg-[#0B0033] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-md shadow-md overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-center mb-6">Admin Login</h2>

          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                id="email"
                placeholder="example@gmail.com"
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1E3A8A] text-white py-2 rounded-full hover:bg-[#1e40af] transition"
            >
              log in
            </button>
          </form>
        </div>

        <div className="w-full">
          <img
            src="/uni img2.jpeg" 
            alt="Building Illustration"
            className="w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
