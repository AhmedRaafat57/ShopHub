import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card text-card-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">ShopHub</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your one-stop destination for quality products at unbeatable prices. Shop with confidence and style.
            </p>
            <div className="flex gap-3">
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Instagram className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Youtube className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop" className="text-muted-foreground transition-colors hover:text-foreground">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground transition-colors hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground transition-colors hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground transition-colors hover:text-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground transition-colors hover:text-foreground">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shipping" className="text-muted-foreground transition-colors hover:text-foreground">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground transition-colors hover:text-foreground">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-muted-foreground transition-colors hover:text-foreground">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground transition-colors hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground transition-colors hover:text-foreground">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">123 Commerce Street, Suite 100, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <a href="tel:+1234567890" className="text-muted-foreground transition-colors hover:text-foreground">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <a
                  href="mailto:support@shophub.com"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  support@shophub.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} ShopHub. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-muted-foreground transition-colors hover:text-foreground">
                Privacy
              </Link>
              <Link href="/terms" className="text-muted-foreground transition-colors hover:text-foreground">
                Terms
              </Link>
              <Link href="/cookies" className="text-muted-foreground transition-colors hover:text-foreground">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
