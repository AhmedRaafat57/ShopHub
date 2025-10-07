import { CustomerNavbar } from "@/components/customer-navbar"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CustomerNavbar />

      <div className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">
              We collect information you provide directly to us, such as when you create an account, make a purchase, or
              contact customer support. This may include your name, email address, shipping address, payment
              information, and phone number.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Process and fulfill your orders</li>
              <li>Send you order confirmations and shipping updates</li>
              <li>Respond to your comments and questions</li>
              <li>Improve our products and services</li>
              <li>Send you marketing communications (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. We may share your information
              with service providers who assist us in operating our website and conducting our business, as long as
              those parties agree to keep this information confidential.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate security measures to protect your personal information from unauthorized access,
              alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100%
              secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              You have the right to access, update, or delete your personal information at any time. You can also
              opt-out of marketing communications by following the unsubscribe link in our emails.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at privacy@shophub.com
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  )
}
