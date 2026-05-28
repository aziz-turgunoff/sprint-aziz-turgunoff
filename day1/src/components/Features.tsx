import { Zap, Code2, Shield, Link2, Workflow, Rocket } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Drag-and-drop builder',
    description: 'Build forms, tables, and workflows visually without writing code. Intuitive interface designed for ops teams.',
  },
  {
    icon: Link2,
    title: 'Connect your data',
    description: 'Integrate with databases, APIs, and spreadsheets. PostgreSQL, MySQL, REST APIs, and more.',
  },
  {
    icon: Workflow,
    title: 'Approval workflows',
    description: 'Multi-step processes with notifications and routing. Automate your team\'s approval chains.',
  },
  {
    icon: Code2,
    title: 'Custom dashboards',
    description: 'Real-time metrics and reporting for your team. Build the exact views you need.',
  },
  {
    icon: Shield,
    title: 'Role-based access',
    description: 'Control who sees and edits what. Granular permissions for every tool and workflow.',
  },
  {
    icon: Rocket,
    title: 'Deploy instantly',
    description: 'Share tools with your team in one click. No DevOps, no infrastructure headaches.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Everything you need to ship internal tools
          </h2>
          <p className="text-xl text-gray-600">
            Built for operations teams who need to move fast without waiting on engineering.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="p-6 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
