import { APP_CONFIG } from "@/config";

export default function Terms() {
  return (
    <div className="py-16 sm:py-24 relative min-h-[calc(100vh-80px)]">
      <div className="mountain-peak"></div>
      <div className="mx-auto max-w-3xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-base leading-7 text-gray-400 apk-card p-8 sm:p-12">
          <p className="text-base font-semibold leading-7 text-blue-400">Legal Information</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Terms & Conditions</h1>
          <p className="mt-6 text-xl leading-8">
            Last updated: {APP_CONFIG.LAST_UPDATED}
          </p>
          <div className="mt-10 max-w-2xl space-y-8">
            <p>
              Please read these Terms and Conditions carefully before using the {APP_CONFIG.APP_NAME} application and website.
            </p>
            
            <h2 className="text-2xl font-bold tracking-tight text-white">1. Acceptance of Terms</h2>
            <p>
              By downloading, accessing, or using {APP_CONFIG.APP_NAME}, you agree to be bound by these terms. If you disagree with any part of the terms, you may not access the service.
            </p>
            
            <h2 className="text-2xl font-bold tracking-tight text-white">2. Marketplace Role</h2>
            <p>
              {APP_CONFIG.APP_NAME} acts solely as a digital platform to connect customers, local sellers, and wholesale dealers in Mugu, Nepal. We do not own or control the products listed by sellers, nor are we directly responsible for product quality or delivery disputes, though we aim to mediate where possible.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-white">3. User Accounts</h2>
            <p>
              You must provide accurate and complete information when creating an account. You are responsible for safeguarding your password and for all activities that occur under your account.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-white">4. Prohibited Activities</h2>
            <p>
              You agree not to use the platform to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-300">
              <li>Sell illegal, counterfeit, or prohibited goods.</li>
              <li>Engage in fraudulent transactions or scams.</li>
              <li>Harass or abuse other users or sellers.</li>
              <li>Interfere with the security or operation of the app.</li>
            </ul>

            <h2 className="text-2xl font-bold tracking-tight text-white">5. Contact</h2>
            <p>
              If you have any questions about these Terms, please contact us at <span className="text-blue-400">{APP_CONFIG.CONTACT.EMAIL}</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
