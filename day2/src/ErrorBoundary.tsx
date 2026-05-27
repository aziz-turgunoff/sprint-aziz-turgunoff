import * as React from 'react'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error) {
    console.error('ErrorBoundary caught error:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', background: '#f0f0f0' }}>
          <h1>Error Loading App</h1>
          <p>{this.state.error?.message}</p>
          <details>
            <pre style={{ overflow: 'auto' }}>{this.state.error?.stack}</pre>
          </details>
        </div>
      )
    }

    return this.props.children
  }
}
