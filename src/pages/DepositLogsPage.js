import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api/config';
// Paki-check kung tama ang path ng NavigationBar component niyo
import NavigationBar from '../components/NavigationBar'; 
import DepositLogsTable from '../components/DepositLogsTable';
import '../styles/DepositLogsPage.css';

const DepositLogsPage = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const [formData, setFormData] = useState({
        user: '',
        bin: '',
        material: 'polyethylene',
        weight_kg: ''
    });

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/deposit-logs/`);
            setLogs(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE_URL}/deposit-logs/`, formData);
            setFormData({ user: '', bin: '', material: 'polyethylene', weight_kg: '' });
            setShowForm(false);
            fetchLogs();
        } catch (error) {
            alert("Error adding log.");
        }
    };

    // Improved filter logic to handle null displays
    const filteredData = logs.filter((log) => {
        const searchStr = [
            `TXN-${String(log.id).padStart(3, '0')}`,
            log.user_display,
            log.bin_display,
            log.material
        ].join(' ').toLowerCase();
        return searchStr.includes(searchTerm.toLowerCase());
    });

    return (
        <div className="depositlogs-page-shell">
            
            {/* 1. SHARED NAVBAR - Ito yung magpaparehas ng look sa ibang pages */}
            <NavigationBar />

            {/* BACKGROUND HILLS */}
            <div className="hill h1"></div>
            <div className="hill h2"></div>
            <div className="hill h3"></div>

            {/* MAIN CONTENT */}
            <main className="depositlogs-main">

                {/* HEADER SECTION */}
                <header className="depositlogs-header">
                    <div className="depositlogs-search-bar">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Search transaction..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <h1 className="depositlogs-title">Deposit Logs</h1>

                    <button
                        className="add-log-btn"
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? 'Close' : '+ Add Log'}
                    </button>
                </header>

                {/* MANUAL ENTRY FORM */}
                {showForm && (
                    <div className="manual-form-card">
                        <h3>Record Manual Deposit</h3>
                        <form onSubmit={handleSubmit} className="deposit-form">
                            <input
                                type="number"
                                name="user"
                                placeholder="User ID"
                                value={formData.user}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="number"
                                name="bin"
                                placeholder="Bin ID"
                                value={formData.bin}
                                onChange={handleInputChange}
                                required
                            />
                            <select
                                name="material"
                                value={formData.material}
                                onChange={handleInputChange}
                            >
                                <option value="polyethylene">Polyethylene</option>
                                <option value="polypropylene">Polypropylene</option>
                                <option value="pet">PET Bottle</option>
                            </select>
                            <input
                                type="number"
                                step="0.01"
                                name="weight_kg"
                                placeholder="Weight (kg)"
                                value={formData.weight_kg}
                                onChange={handleInputChange}
                                required
                            />
                            <button type="submit" className="submit-btn">
                                Save Log
                            </button>
                        </form>
                    </div>
                )}

                {/* SUMMARY ROW */}
                <div className="logs-summary-row">
                    <div className="logs-summary-card">
                        <div className="summary-icon">📋</div>
                        <div>
                            <div className="summary-value">{logs.length}</div>
                            <div className="summary-label">Total Transactions</div>
                        </div>
                    </div>

                    <div className="logs-summary-card">
                        <div className="summary-icon">⚖️</div>
                        <div>
                            <div className="summary-value">
                                {logs.reduce((a, b) => a + parseFloat(b.weight_kg || 0), 0).toFixed(1)} kg
                            </div>
                            <div className="summary-label">Total Weight</div>
                        </div>
                    </div>

                    <div className="logs-summary-card">
                        <div className="summary-icon">🎁</div>
                        <div>
                            <div className="summary-value">
                                {logs.reduce((a, b) => a + (b.reward_points || 0), 0)} pts
                            </div>
                            <div className="summary-label">Rewards Issued</div>
                        </div>
                    </div>

                    <div className="logs-summary-card">
                        <div className="summary-icon">🗑️</div>
                        <div>
                            <div className="summary-value">
                                {[...new Set(logs.map(l => l.bin))].length}
                            </div>
                            <div className="summary-label">Active Bins</div>
                        </div>
                    </div>
                </div>

                {/* TABLE SECTION */}
                <div className="logs-table-card">
                    <div className="logs-table-header-row">
                        <h2 className="logs-table-title">Transaction Records</h2>
                        <span className="logs-count">{filteredData.length} results</span>
                    </div>

                    <div className="logs-table-wrapper">
                        {loading
                            ? <p className="logs-empty">Loading...</p>
                            : <DepositLogsTable data={filteredData} />}
                    </div>
                </div>

            </main>
        </div>
    );
};

export default DepositLogsPage;
