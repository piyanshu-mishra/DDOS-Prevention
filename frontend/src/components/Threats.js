import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const ThreatCard = ({ title, children }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
    <h3 className="text-xl font-semibold mb-4 text-green-300">{title}</h3>
    {children}
  </div>
);

const Threats = () => {
  const navigate = useNavigate();
  const [activeThreats, setActiveThreats] = useState([
    { id: 1, ip: '203.0.113.42', type: 'SYN Flood', intensity: 'High', duration: '00:15:23' },
    { id: 2, ip: '198.51.100.17', type: 'UDP Flood', intensity: 'Medium', duration: '00:05:47' },
    { id: 3, ip: '192.0.2.123', type: 'HTTP Flood', intensity: 'Low', duration: '00:02:31' },
  ]);

  const [blockedIPs, setBlockedIPs] = useState([
    '203.0.113.1',
    '198.51.100.2',
    '192.0.2.3',
  ]);

  const [intelligenceFeed, setIntelligenceFeed] = useState([
    'New botnet activity detected from subnet 203.0.113.0/24',
    'Emerging DDoS technique targeting UDP port 27015',
    'Increased scanning activity from Chinese IP ranges',
    'New vulnerability in popular CMS being exploited for DDoS'
  ]);

  const attackTypes = ['SYN Flood', 'UDP Flood', 'HTTP Flood', 'ICMP Flood', 'DNS Amplification'];
  const intensities = ['Low', 'Medium', 'High'];

  const handleBlock = (id) => {
    const threatToBlock = activeThreats.find(threat => threat.id === id);
    if (threatToBlock) {
      setBlockedIPs([...blockedIPs, threatToBlock.ip]);
      setActiveThreats(activeThreats.filter(threat => threat.id !== id));
      toast.success(`Blocked ${threatToBlock.ip}`);
    }
  };

  const handleUnblock = (ip) => {
    setBlockedIPs(blockedIPs.filter(blockedIP => blockedIP !== ip));
    toast.success(`Unblocked ${ip}`);
  };

  const generateIntelligence = () => {
    toast.loading('Fetching new intelligence feed...');

    setTimeout(() => {
      const newFeed = [
        `New ${attackTypes[Math.floor(Math.random() * attackTypes.length)]} detected targeting port ${Math.floor(Math.random() * 65535)}`,
        `Suspicious traffic pattern from IP ${Array(4).fill().map(() => Math.floor(Math.random() * 256)).join('.')}`,
        `Large-scale attack attempt on subnet 10.${Math.floor(Math.random()*256)}.0.0/16`,
        `New botnet behavior observed involving ${Math.floor(Math.random()*5000)} devices`,
      ];
      setIntelligenceFeed(newFeed);
      toast.dismiss();
      toast.success('New intelligence feed generated');
    }, 2000);
  };

  const handleLogout = () => {
    navigate("/"); 
  };

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-poppins">
      <Toaster position="top-right" />
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-green-400">DDoS Defense</h1>
              <div className="ml-10 flex items-center space-x-4">
                {["Dashboard", "Analysis", "Threats", "Settings"].map((item) => (
                  <a
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="text-green-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {item}
                  </a>
                ))}
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
          <h2 className="text-3xl font-bold mb-6">Threats</h2>

          <ThreatCard title="Active Threats">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">IP Address</th>
                    <th className="px-4 py-2 text-left">Attack Type</th>
                    <th className="px-4 py-2 text-left">Intensity</th>
                    <th className="px-4 py-2 text-left">Duration</th>
                    <th className="px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {activeThreats.map((threat) => (
                    <tr key={threat.id} className="border-b border-gray-700">
                      <td className="px-4 py-2">{threat.ip}</td>
                      <td className="px-4 py-2">{threat.type}</td>
                      <td className="px-4 py-2">{threat.intensity}</td>
                      <td className="px-4 py-2">{threat.duration}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleBlock(threat.id)}
                          className="bg-red-600 text-white py-1 px-2 rounded hover:bg-red-500 transition-colors"
                        >
                          Block
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ThreatCard>

          <ThreatCard title="Blocked IPs">
            <ul className="space-y-2">
              {blockedIPs.map((ip, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{ip}</span>
                  <button
                    onClick={() => handleUnblock(ip)}
                    className="bg-green-600 text-white py-1 px-2 rounded hover:bg-green-500 transition-colors"
                  >
                    Unblock
                  </button>
                </li>
              ))}
            </ul>
          </ThreatCard>

          <ThreatCard title="Threat Intelligence Feed">
            <ul className="space-y-2 mb-4">
              {intelligenceFeed.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <button
              onClick={generateIntelligence}
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500 transition-colors"
            >
              Generate New Intelligence
            </button>
          </ThreatCard>
        </div>
      </main>
    </div>
  );
};

export default Threats;