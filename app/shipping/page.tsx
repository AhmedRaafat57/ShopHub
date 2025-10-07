import { CustomerNavbar } from "@/components/customer-navbar"
import { Footer } from "@/components/footer"
import { Truck, Package, Globe, Clock } from "lucide-react"

export default function ShippingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CustomerNavbar />

      <div className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Shipping Information</h1>

        <div className="space-y-8">
          <section className="flex gap-4">
            <Truck className="h-8 w-8 text-accent flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-semibold mb-3">Shipping Methods</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  <strong>Standard Shipping:</strong> 5-7 business days - $5.99 (Free on orders over $50)
                </p>
                <p>
                  <strong>Express Shipping:</strong> 2-3 business days - $12.99
                </p>
                <p>
                  <strong>Overnight Shipping:</strong> 1 business day - $24.99
                </p>
              </div>
            </div>
          </section>

          <section className="flex gap-4">
            <Globe className="h-8 w-8 text-accent flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-semibold mb-3">International Shipping</h2>
              <p className="text-muted-foreground leading-relaxed">
                We ship to over 100 countries worldwide. International shipping times vary by destination, typically
                10-21 business days. Customs fees and import duties may apply and are the responsibility of the
                customer.
              </p>
            </div>
          </section>

          <section className="flex gap-4">
            <Package className="h-8 w-8 text-accent flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-semibold mb-3">Order Processing</h2>
              <p className="text-muted-foreground leading-relaxed">
                Orders are processed within 1-2 business days. You will receive a confirmation email once your order has
                been shipped with tracking information.
              </p>
            </div>
          </section>

          <section className="flex gap-4">
            <Clock className="h-8 w-8 text-accent flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-semibold mb-3">Delivery Times</h2>
              <p className="text-muted-foreground leading-relaxed">
                Delivery times are estimates and may vary during peak seasons or due to unforeseen circumstances. We are
                not responsible for delays caused by shipping carriers or customs.
              </p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  )
}
