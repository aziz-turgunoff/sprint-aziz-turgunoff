import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out Stacklet',
    features: [
      '1 tool',
      '2 users',
      'Community support',
      'Basic integrations',
      'Public deployment',
    ],
    cta: 'Get started',
    highlighted: false,
  },
  {
    name: 'Starter',
    price: '$49',
    period: 'per month',
    description: 'For small teams getting started',
    features: [
      '5 tools',
      '10 users',
      'Email support',
      'All integrations',
      'Custom branding',
      'Private deployment',
      'Role-based access',
    ],
    cta: 'Start free trial',
    highlighted: true,
  },
  {
    name: 'Pro',
    price: '$199',
    period: 'per month',
    description: 'For teams scaling operations',
    features: [
      'Unlimited tools',
      'Unlimited users',
      'Priority support',
      'Custom integrations',
      'SSO & SAML',
      'Audit logs',
      'Advanced workflows',
      'SLA guarantee',
    ],
    cta: 'Contact sales',
    highlighted: false,
  },
]

export default function Pricing() {
  const scrollToWaitlist = () => {
    const element = document.getElementById('waitlist')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="pricing" className="py-20 sm:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-600">
            70% cheaper than Retool. No per-user pricing traps. Cancel anytime.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 ${
                plan.highlighted
                  ? 'bg-gray-900 text-white ring-4 ring-gray-900 shadow-2xl scale-105'
                  : 'bg-white border-2 border-gray-200'
              }`}
            >
              {plan.highlighted && (
                <div className="text-center mb-4">
                  <span className="inline-block bg-white text-gray-900 text-sm font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-2">
                  <span className={`text-5xl font-bold ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-lg ${plan.highlighted ? 'text-gray-300' : 'text-gray-600'}`}>
                    {plan.period}
                  </span>
                </div>
                <p className={`mt-3 ${plan.highlighted ? 'text-gray-300' : 'text-gray-600'}`}>
                  {plan.description}
                </p>
              </div>

              <button
                onClick={scrollToWaitlist}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors mb-6 ${
                  plan.highlighted
                    ? 'bg-white text-gray-900 hover:bg-gray-100'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {plan.cta}
              </button>

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`} />
                    <span className={plan.highlighted ? 'text-gray-100' : 'text-gray-600'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional info */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            All plans include 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  )
}
