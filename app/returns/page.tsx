import { CustomerNavbar } from "@/components/customer-navbar"
import { Footer } from "@/components/footer"
import { RotateCcw, Package, CreditCard, AlertCircle } from "lucide-react"

export default function ReturnsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CustomerNavbar />

      <div className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Returns & Exchanges</h1>

        <div className="space-y-8">
          <section className="flex gap-4">
            <RotateCcw className="h-8 w-8 text-accent flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-semibold mb-3">30-Day Return Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We offer a 30-day return policy from the date of delivery. Items must be unused, in original packaging,
                and in the same condition as received. Original tags and labels must be attached.
              </p>
            </div>
          </section>

          <section className="flex gap-4">
            <Package className="h-8 w-8 text-accent flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-semibold mb-3">How to Return</h2>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Contact our customer service team to initiate a return</li>
                <li>Pack the item securely in its original packaging</li>
                <li>Include your order number and reason for return</li>
                <li>Ship the package to the address provided by our team</li>
              </ol>
            </div>
          </section>

          <section className="flex gap-4">
            <CreditCard className="h-8 w-8 text-accent flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-semibold mb-3">Refunds</h2>
              <p className="text-muted-foreground leading-relaxed">
                Once we receive and inspect your return, we will process your refund within 5-7 business days. Refunds
                will be issued to the original payment method. Shipping costs are non-refundable.
              </p>
            </div>
          </section>

          <section className="flex gap-4">
            <AlertCircle className="h-8 w-8 text-accent flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-semibold mb-3">Non-Returnable Items</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Opened software or digital products</li>
                <li>Personal care items</li>
                <li>Gift cards</li>
                <li>Final sale or clearance items</li>
              </ul>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  )
}
