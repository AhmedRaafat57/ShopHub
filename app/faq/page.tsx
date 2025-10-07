import { CustomerNavbar } from "@/components/customer-navbar"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  const faqs = [
    {
      question: "How long does shipping take?",
      answer:
        "Standard shipping typically takes 5-7 business days. Express shipping is available for 2-3 business days delivery.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for most items. Products must be unused and in original packaging. See our Returns & Exchanges page for full details.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship to most countries worldwide. International shipping times vary by destination, typically 10-21 business days.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order ships, you'll receive a tracking number via email. You can also track your order on our Track Order page.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers.",
    },
    {
      question: "Can I cancel or modify my order?",
      answer:
        "Orders can be cancelled or modified within 24 hours of placement. After that, the order is processed and cannot be changed.",
    },
    {
      question: "Do you offer gift wrapping?",
      answer:
        "Yes, gift wrapping is available for an additional $5 per item. You can select this option during checkout.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach our customer support team via email at support@shophub.com or call us at +1 (234) 567-890 during business hours.",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <CustomerNavbar />

      <div className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-muted-foreground mb-8">Find answers to common questions about our products and services.</p>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <Footer />
    </div>
  )
}
