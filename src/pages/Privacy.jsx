const Privacy = () => (
  <div className="policy-page">
    <div className="policy-header">
      <h1>EPIC GAMES PRIVACY POLICY</h1>
      <p className="last-updated">Last Updated: February 27, 2026</p>
    </div>

    <div className="policy-intro">
      <p>
        At Epic Games, we value your privacy and are committed to protecting your personal information. 
        This policy explains how we collect, use, and share information when you use our services.
      </p>
    </div>

    <section>
      <h2>1. INFORMATION WE COLLECT</h2>
      <p>We collect information you provide to us directly, such as:</p>
      <ul>
        <li>Account information (name, email, date of birth);</li>
        <li>Purchase and transaction history;</li>
        <li>Content you create or upload (like screenshots or forum posts).</li>
      </ul>
    </section>

    <section>
      <h2>2. HOW WE USE INFORMATION</h2>
      <p>We use your information to:</p>
      <ul>
        <li>Provide, maintain, and improve our services;</li>
        <li>Process transactions and send related information;</li>
        <li>Personalize your experience and send you marketing communications.</li>
      </ul>
    </section>

    <section>
      <h2>3. SHARING INFORMATION</h2>
      <p>
        We do not sell your personal information. We may share information with service providers, 
        affiliates, or for legal reasons (like responding to a subpoena).
      </p>
    </section>

    <section>
      <h2>4. DATA SECURITY</h2>
      <p>
        We use administrative, technical, and physical security measures to help protect your personal information. 
        However, no electronic transmission over the internet can be guaranteed as 100% secure.
      </p>
    </section>

    <section>
      <h2>5. CONTACT US</h2>
      <p>
        If you have questions about this Privacy Policy, please contact us at: 
        <a href="mailto:privacy@epicgames.com" style={{ color: '#26bbff', textDecoration: 'none' }}>privacy@epicgames.com</a>
      </p>
    </section>
  </div>
);

export default Privacy;