import { APP_CONFIG } from "@/config";

export default function PrivacyPolicy() {
  return (
    <div className="py-16 sm:py-24 relative min-h-[calc(100vh-80px)]">
      <div className="mountain-peak"></div>
      <div className="mx-auto max-w-3xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-base leading-7 text-gray-400 apk-card p-8 sm:p-12">
          <p className="text-base font-semibold leading-7 text-blue-400">Legal Information</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Privacy Policy</h1>
          <p className="mt-6 text-xl leading-8">
            Last updated: {APP_CONFIG.LAST_UPDATED}
          </p>
          <div className="mt-10 max-w-2xl space-y-8">
            <p>
              At {APP_CONFIG.APP_NAME}, we take your privacy seriously. This Privacy Policy describes how your personal information is collected, used, and shared when you use our mobile application and website.
            </p>
            
            <h2 className="text-2xl font-bold tracking-tight text-white">1. Information We Collect</h2>
            <p>
              When you create an account, we may collect your name, phone number, email address, and physical location within Mugu to facilitate deliveries and seller coordination. We also collect transactional data when you make purchases through the platform.
            </p>
            
            <h2 className="text-2xl font-bold tracking-tight text-white">2. How We Use Your Information</h2>
            <p>We use the collected information to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-300">
              <li>Provide, operate, and maintain our marketplace.</li>
              <li>Process transactions and send related information (order confirmations).</li>
              <li>Communicate with you for customer service, updates, and promotions.</li>
              <li>Detect, prevent, and address fraud and technical issues.</li>
            </ul>

            <h2 className="text-2xl font-bold tracking-tight text-white">3. Sharing Your Information</h2>
            <p>
              We share relevant information (such as your delivery address) with sellers and delivery partners solely for the purpose of fulfilling your orders. We do not sell your personal data to third parties.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-white">4. Contact Us</h2>
            <p>
              For any questions regarding this privacy policy, please contact us at:<br />
              <span className="text-blue-400">Email:</span> {APP_CONFIG.CONTACT.EMAIL}<br />
              <span className="text-blue-400">Phone:</span> {APP_CONFIG.CONTACT.PHONE}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
