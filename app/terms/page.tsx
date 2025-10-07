import { CustomerNavbar } from "@/components/customer-navbar"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CustomerNavbar />

      <div className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>
        <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using ShopHub, you accept and agree to be bound by the terms and provision of this
              agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
            <p className="text-muted-foreground leading-relaxed">
              Permission is granted to temporarily download one copy of the materials on ShopHub's website for personal,
              non-commercial transitory viewing only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Product Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              We strive to provide accurate product descriptions and pricing. However, we do not warrant that product
              descriptions or other content is accurate, complete, reliable, current, or error-free.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Pricing and Payment</h2>
            <p className="text-muted-foreground leading-relaxed">
              All prices are subject to change without notice. We reserve the right to refuse or cancel any order for
              any reason, including errors in pricing or product information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              ShopHub shall not be liable for any indirect, incidental, special, consequential or punitive damages
              resulting from your use of or inability to use the service.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  )
}
