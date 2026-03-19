const Refund = () => (
  <div className="policy-page">
    <div className="policy-header">
      <h1>EPIC GAMES STORE REFUND POLICY</h1>
      <p className="last-updated">Last Updated: February 27, 2026</p>
    </div>

    <div className="policy-intro">
      <p>
        We want you to have a great experience on the Epic Games Store, but we understand that sometimes 
        things don't work out. Here is our policy on refunds.
      </p>
    </div>

    <section>
      <h2>1. THE 14-DAY / 2-HOUR RULE</h2>
      <p>Games and products are eligible for refund if they meet the following criteria:</p>
      <ul>
        <li>You purchased the product within the last <strong>14 days</strong>;</li>
        <li>You have played the product for <strong>less than 2 hours</strong>.</li>
      </ul>
    </section>

    <section>
      <h2>2. REFUND ELIGIBILITY</h2>
      <p>
        Most games are eligible for self-service refunds through your account page. However, certain 
        items like virtual currency (V-Bucks), skins, or other consumables are generally non-refundable 
        unless required by law.
      </p>
    </section>

    <section>
      <h2>3. HOW TO REQUEST A REFUND</h2>
      <p>
        You can request a refund by visiting your <strong>Account Settings</strong> under the 
        <strong>"Transactions"</strong> tab, or by contacting our Support Team through the Help Center.
      </p>
    </section>

    <section>
      <h2>4. ABUSING THE POLICY</h2>
      <p>
        If it appears you are abusing the refund policy, we may stop offering refunds to you. 
        We reserve the right to deny refund requests if we detect fraudulent activity.
      </p>
    </section>
  </div>
);

export default Refund;