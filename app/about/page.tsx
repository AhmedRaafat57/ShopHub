import { CustomerNavbar } from "@/components/customer-navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Award, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CustomerNavbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-accent/20 via-background to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-balance">About ShopHub</h1>
              <p className="text-lg text-muted-foreground text-pretty">
                We're passionate about bringing you the best products at unbeatable prices. Our mission is to make
                online shopping easy, enjoyable, and accessible to everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Users,
                  title: "Customer First",
                  desc: "Your satisfaction is our top priority. We're here to help every step of the way.",
                },
                {
                  icon: Target,
                  title: "Quality Products",
                  desc: "We carefully curate our selection to ensure you get only the best quality items.",
                },
                {
                  icon: Award,
                  title: "Best Prices",
                  desc: "Competitive pricing and regular deals to give you the best value for your money.",
                },
                {
                  icon: Heart,
                  title: "Trusted Service",
                  desc: "Thousands of happy customers trust us for their shopping needs.",
                },
              ].map((value, i) => (
                <Card key={i}>
                  <CardContent className="pt-6 text-center space-y-4">
                    <value.icon className="h-12 w-12 mx-auto text-accent" />
                    <h3 className="text-xl font-semibold">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold text-center">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2024, ShopHub started with a simple idea: make quality products accessible to everyone.
                  What began as a small online store has grown into a trusted destination for thousands of customers
                  worldwide.
                </p>
                <p>
                  We believe that shopping should be more than just a transaction. It should be an experience that
                  brings joy and satisfaction. That's why we've built our platform with care, focusing on user
                  experience, product quality, and customer service.
                </p>
                <p>
                  Today, we offer a wide range of products from electronics to accessories, all carefully selected to
                  meet our high standards. Our team works tirelessly to ensure every order is processed quickly and
                  delivered with care.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
