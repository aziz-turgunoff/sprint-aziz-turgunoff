import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'

const faqs = [
  {
    question: 'How is this different from Retool?',
    answer: 'Stacklet is built for ops teams, not developers. We offer a simpler interface, faster setup, and no code required. While Retool is powerful for technical teams, Stacklet focuses on speed and ease of use for non-technical operations managers. Plus, we\'re 70% cheaper for small teams.',
  },
  {
    question: 'Can I connect to my existing databases?',
    answer: 'Yes. Stacklet supports PostgreSQL, MySQL, REST APIs, and more. You can also import data from spreadsheets. We handle the connection security and provide a simple interface to query your data without writing SQL.',
  },
  {
    question: 'What if I outgrow the tool?',
    answer: 'You can export your data anytime in standard formats (CSV, JSON). We also offer migration support on Pro and Enterprise plans. If you need custom development, we can connect you with our partner network of agencies who specialize in internal tools.',
  },
  {
    question: 'How long does it take to build a tool?',
    answer: 'Most teams ship their first internal tool in under 2 hours. Simple forms and dashboards can be built in 15-30 minutes. Complex approval workflows with multiple integrations typically take 4-6 hours. No coding required.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes. We\'re SOC 2 Type II compliant. Your data stays in your chosen region (US, EU, or APAC). All connections are encrypted. SSO and SAML are available on Pro plans. We never access your data without explicit permission, and you can self-host on Enterprise plans.',
  },
]

export default function FAQ() {
  return (
    <section id="faq" className="py-20 sm:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Frequently asked questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about Stacklet
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Additional help */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions?
          </p>
          <a
            href="mailto:support@stacklet.io"
            className="text-gray-900 font-semibold hover:text-gray-600 transition-colors"
          >
            Contact our team →
          </a>
        </div>
      </div>
    </section>
  )
}
