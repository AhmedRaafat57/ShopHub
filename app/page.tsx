import { CustomerNavbar } from "@/components/customer-navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, ShoppingBag, Truck, Shield, Headphones } from "lucide-react"
import Image from "next/image"
import { getProducts } from "@/lib/products"

export default function HomePage() {
  const products = getProducts()
  const featuredProducts = products.slice(0, 4)

  return (
    <div className="min-h-screen flex flex-col">
      <CustomerNavbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-accent/20 via-background to-background py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="w-fit">New Collection 2024</Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-balance">Discover Amazing Products at Great Prices</h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Shop the latest tech gadgets, accessories, and more. Quality products with fast shipping and excellent
                customer service.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/shop">
                  <Button size="lg" className="gap-2">
                    Shop Now <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px]">
              <Image
                src="/black-wireless-headphones.png"
                alt="Featured Product"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
              { icon: Shield, title: "Secure Payment", desc: "100% secure transactions" },
              { icon: Headphones, title: "24/7 Support", desc: "Dedicated customer service" },
              { icon: ShoppingBag, title: "Easy Returns", desc: "30-day return policy" },
            ].map((feature, i) => (
              <Card key={i} className="border-0 shadow-none bg-transparent">
                <CardContent className="pt-6 text-center space-y-2">
                  <feature.icon className="h-10 w-10 mx-auto text-accent" />
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Featured Products</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Check out our most popular items loved by customers worldwide
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-4 space-y-4">
                    <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {product.badge && <Badge className="absolute top-2 right-2">{product.badge}</Badge>}
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold line-clamp-1">{product.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">${product.price}</span>
                        {product.oldPrice && (
                          <span className="text-sm text-muted-foreground line-through">${product.oldPrice}</span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/shop">
              <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                View All Products <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
