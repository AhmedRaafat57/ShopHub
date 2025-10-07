import { CustomerNavbar } from "@/components/customer-navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function BlogPage() {
  const posts = [
    {
      title: "Top 10 Tech Gadgets for 2025",
      excerpt: "Discover the must-have tech gadgets that are revolutionizing the way we work and play.",
      category: "Technology",
      date: "Jan 15, 2025",
      image: "/tech-gadgets-display.png",
    },
    {
      title: "How to Choose the Perfect Headphones",
      excerpt: "A comprehensive guide to finding headphones that match your lifestyle and budget.",
      category: "Audio",
      date: "Jan 10, 2025",
      image: "/blog-workspace-setup.jpg",
    },
    {
      title: "Workspace Setup Ideas for Productivity",
      excerpt: "Transform your home office with these ergonomic and stylish workspace solutions.",
      category: "Lifestyle",
      date: "Jan 5, 2025",
      image: "/modern-workspace.png",
    },
    {
      title: "The Future of Wireless Charging",
      excerpt: "Explore the latest innovations in wireless charging technology and what's coming next.",
      category: "Technology",
      date: "Dec 28, 2024",
      image: "/blog-wireless-tech.jpg",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <CustomerNavbar />

      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-muted-foreground mb-12">Stay updated with the latest news, tips, and product reviews.</p>

          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((post, index) => (
              <Link key={index} href="#">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <span className="text-sm text-muted-foreground">{post.date}</span>
                    </div>
                    <h2 className="text-2xl font-bold hover:text-accent transition-colors">{post.title}</h2>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
