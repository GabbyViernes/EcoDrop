import logo from './logo.svg';
import './App.css';

// Simulating data from your Laravel Backend
const adminData = {
  adminName: "Admin User",
  totalPlasticDiverted: "1,240 kg",
  activeBins: 12,
  needsService: 2
};

// Simulating the "Live Bin Monitoring" feature
const binStatus = [
  { id: "BIN-001", location: "Limketkai Center", fullness: 85, status: "Critical" },
  { id: "BIN-002", location: "SM Downtown", fullness: 45, status: "Normal" },
  { id: "BIN-003", location: "Centrio Ayala", fullness: 12, status: "Normal" },
  { id: "BIN-004", location: "Gaisano City", fullness: 92, status: "Critical" }
];

function App() {
  return (
    <div className="admin-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <h2>EcoDrop Admin</h2>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>Bin Management</li>
            <li>User Logs</li>
            <li>Settings</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="content">
        <header>
          <h1>Overview</h1>
          <span>Welcome, {adminData.adminName}</span>
        </header>

        {/* Stats Row */}
        <section className="stats-grid">
          <div className="card">
            <h3>Total Diverted</h3>
            <p>{adminData.totalPlasticDiverted}</p>
          </div>
          <div className="card">
            <h3>Active Bins</h3>
            <p>{adminData.activeBins}</p>
          </div>
          <div className="card alert">
            <h3>Needs Service</h3>
            <p>{adminData.needsService}</p>
          </div>
        </section>

        {/* Live Bin Monitoring Table */}
        <section className="bin-monitor">
          <h2>Live Bin Status</h2>
          <table>
            <thead>
              <tr>
                <th>Bin ID</th>
                <th>Location</th>
                <th>Fullness</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {binStatus.map((bin) => (
                <tr key={bin.id} className={bin.status === "Critical" ? "row-critical" : ""}>
                  <td>{bin.id}</td>
                  <td>{bin.location}</td>
                  <td>
                    {/* Visual Progress Bar Requirement */}
                    <div className="progress-bar">
                      <div 
                        className="fill" 
                        style={{ width: `${bin.fullness}%`, backgroundColor: bin.fullness > 80 ? 'red' : '#2ecc71' }}
                      ></div>
                    </div>
                    {bin.fullness}%
                  </td>
                  <td>{bin.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default App;
