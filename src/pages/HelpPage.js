import React from 'react';
import NavigationBar from '../components/NavigationBar';
import '../styles/HelpPage.css';

const HelpPage = () => {
  return (
    <div className="help-page-shell">
      <NavigationBar />

      <main className="help-main">
        <h2>Help & Support</h2>
        <p>Welcome to the EcoDrop Help Center. Here you’ll find answers to common questions and guidance on using the system.</p>

        <section className="faq-section">
          <h3>Frequently Asked Questions</h3>
          <ul>
            <li>
              <strong>How do I locate a bin?</strong>
              <p>Go to the Bin Locator page. You can search by bin ID or location.</p>
            </li>
            <li>
              <strong>How do I view my deposit history?</strong>
              <p>Navigate to Deposit Logs. Use the search bar to filter by transaction ID, user, or bin.</p>
            </li>
            <li>
              <strong>How are rewards calculated?</strong>
              <p>Rewards are based on material type and weight deposited. Each transaction shows the points earned.</p>
            </li>
            <li>
              <strong>Who do I contact for technical issues?</strong>
              <p>Email support@ecodrop.com or reach out to your system administrator.</p>
            </li>
          </ul>
        </section>

        <section className="contact-section">
          <h3>Need More Help?</h3>
          <p>If you can’t find the answer here, contact us:</p>
          <ul>
            <li>Email: support@ecodrop.com</li>
            <li>Phone: +63 912 345 6789</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default HelpPage;
