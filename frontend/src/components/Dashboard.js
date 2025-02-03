import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// const NavLink = ({ href }) => (
// <a href={href} className="text-green-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
{
  /* </a> */
}
// );

const DashboardCard = ({ title, value, description }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-2 text-green-300">{title}</h3>
      <p className="text-3xl font-bold text-green-400 mb-2">{value}</p>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [userFeedback, setUserFeedback] = useState("");
  const [blockedIPs, setBlockedIPs] = useState(["192.168.1.100", "10.0.0.5"]);

  const trafficData = [
    { name: "00:00", normal: 4000, suspicious: 2400 },
    { name: "04:00", normal: 3000, suspicious: 1398 },
    { name: "08:00", normal: 2000, suspicious: 9800 },
    { name: "12:00", normal: 2780, suspicious: 3908 },
    { name: "16:00", normal: 1890, suspicious: 4800 },
    { name: "20:00", normal: 2390, suspicious: 3800 },
  ];

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log("User feedback submitted:", userFeedback);
    setUserFeedback("");
  };

  const handleBlockIP = (e) => {
    e.preventDefault();
    const newIP = e.target.elements.ipToBlock.value;
    setBlockedIPs([...blockedIPs, newIP]);
    e.target.reset();
  };

  const handleLogout = () => {
    navigate("/"); 
  };

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-poppins">
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-green-400">
                  DDoS Defense
                </h1>
              </div>
              <div className="ml-10 flex items-center space-x-4">
                <a
                  href="/dashboard"
                  className="text-green-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </a>
                <a
                  href="/analysis"
                  className="text-green-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Analysis
                </a>
                <a
                  href="/threats"
                  className="text-green-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Threats
                </a>
                <a
                  href="/settings"
                  className="text-green-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Settings
                </a>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-red-300 hover:text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <DashboardCard
              title="Total Attacks Prevented"
              value="1,234"
              description="Attacks blocked in the last 24 hours"
            />
            <DashboardCard
              title="Active Threats"
              value="12"
              description="Currently monitored suspicious activities"
            />
            <DashboardCard
              title="System Status"
              value="Optimal"
              description="All systems functioning normally"
            />
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
            <h3 className="text-xl font-semibold mb-4 text-green-300">
              Real-time Network Traffic
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="normal" fill="#4ade80" />
                <Bar dataKey="suspicious" fill="#f87171" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-green-300">
                Behavioral Analysis
              </h3>
              <ul className="space-y-2">
                <li>Unusual spike in traffic from IP 203.0.113.42</li>
                <li>Potential SYN flood attack detected</li>
                <li>Abnormal request pattern from subnet 198.51.100.0/24</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-green-300">
                Clustering Results
              </h3>
              <ul className="space-y-2">
                <li>
                  Cluster 1: High-volume, low-threat traffic (80% of total)
                </li>
                <li>
                  Cluster 2: Low-volume, high-threat traffic (15% of total)
                </li>
                <li>
                  Cluster 3: Anomalous behavior requiring investigation (5% of
                  total)
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-green-300">
                IP Reputation Scoring
              </h3>
              <ul className="space-y-2">
                <li>IP 203.0.113.42 - Threat Score: 85/100 (High Risk)</li>
                <li>IP 198.51.100.17 - Threat Score: 60/100 (Medium Risk)</li>
                <li>IP 192.0.2.123 - Threat Score: 20/100 (Low Risk)</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-green-300">
                User Feedback
              </h3>
              <form onSubmit={handleFeedbackSubmit}>
                <textarea
                  className="w-full px-3 py-2 text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  rows="4"
                  placeholder="Provide feedback on recent detections..."
                  value={userFeedback}
                  onChange={(e) => setUserFeedback(e.target.value)}
                ></textarea>
                <button
                  type="submit"
                  className="mt-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-500 transition-colors"
                >
                  Submit Feedback
                </button>
              </form>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-green-300">
              Threat Management
            </h3>
            <div className="mb-4">
              <h4 className="text-lg font-medium mb-2">Blocked IPs</h4>
              <ul className="space-y-1">
                {blockedIPs.map((ip, index) => (
                  <li key={index} className="bg-gray-700 px-3 py-1 rounded-md">
                    {ip}
                  </li>
                ))}
              </ul>
            </div>
            <form onSubmit={handleBlockIP} className="flex gap-2">
              <input
                type="text"
                name="ipToBlock"
                placeholder="Enter IP to block"
                className="flex-grow px-3 py-2 text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button
                type="submit"
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-500 transition-colors"
              >
                Block IP
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
