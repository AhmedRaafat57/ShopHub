import { CustomerNavbar } from "@/components/customer-navbar"
import { Footer } from "@/components/footer"

export default function CookiesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CustomerNavbar />

      <div className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cookies are small text files that are placed on your computer or mobile device when you visit our website.
              They help us provide you with a better experience by remembering your preferences and understanding how
              you use our site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">We use cookies for various purposes:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Essential cookies: Required for the website to function properly</li>
              <li>Performance cookies: Help us understand how visitors interact with our website</li>
              <li>Functionality cookies: Remember your preferences and settings</li>
              <li>Marketing cookies: Track your browsing habits to show relevant advertisements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              You can control and manage cookies in your browser settings. Please note that removing or blocking cookies
              may impact your user experience and some features may no longer function properly.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  )
}
