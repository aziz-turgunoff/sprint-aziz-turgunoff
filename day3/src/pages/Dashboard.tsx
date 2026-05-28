import { useEffect, useMemo, useState } from 'react'
import { Area, AreaChart, Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import { supabase } from '../lib/supabase'

const statuses = ['pending', 'paid', 'refunded', 'cancelled'] as const
const regions = ['NA', 'EU', 'APAC', 'LATAM'] as const
const categories = ['Electronics', 'Apparel', 'Home', 'Books'] as const
const dateRanges = [7, 30, 90, 180] as const

interface Order {
  id: string
  order_number: string
  customer_name: string
  customer_email: string
  product: string
  category: string
  amount: number
  status: typeof statuses[number]
  region: typeof regions[number]
  created_at: string
}

const fallbackOrders: Order[] = Array.from({ length: 50 }, (_, index) => {
  const status = statuses[Math.floor(Math.random() * statuses.length)]
  const region = regions[Math.floor(Math.random() * regions.length)]
  const category = categories[Math.floor(Math.random() * categories.length)]
  const amount = +(Math.random() * 500 + 20).toFixed(2)
  const createdAt = new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000)
  return {
    id: `${index}`,
    order_number: `ORD-${1000 + index}`,
    customer_name: `Customer ${index + 1}`,
    customer_email: `customer${index + 1}@example.com`,
    product: `${category} Product ${index + 1}`,
    category,
    amount,
    status,
    region,
    created_at: createdAt.toISOString(),
  }
})

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}

function Dashboard() {
  const [orders, setOrders] = useState<Order[]>(fallbackOrders)
  const [search, setSearch] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedRegion, setSelectedRegion] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [range, setRange] = useState<number>(30)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // SQL schema helpful for operators when the table is missing in Supabase
  const schemaSQL = `create extension if not exists "uuid-ossp";

create table orders (
  id uuid primary key default uuid_generate_v4(),
  order_number text not null unique,
  customer_name text not null,
  customer_email text not null,
  product text not null,
  category text not null,
  amount numeric(10,2) not null,
  status text not null check (status in ('pending','paid','refunded','cancelled')),
  region text not null,
  created_at timestamptz not null
);
`

  // loadOrders is declared here so UI buttons can call it (retry)
  const loadOrders = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = (await supabase.from('orders').select('*')) as { data: Order[] | null; error: any }
      const { data, error: fetchError } = res
      if (fetchError) {
        setError(fetchError.message)
        setOrders(fallbackOrders)
      } else if (data) {
        setOrders(data)
      }
    } catch (e: any) {
      setError(e?.message ?? String(e))
      setOrders(fallbackOrders)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const resetFilters = () => {
    setSearch('')
    setSelectedStatus('all')
    setSelectedRegion('all')
    setSelectedCategory('all')
    setRange(30)
  }

  const exportCSV = () => {
    if (!filteredOrders || filteredOrders.length === 0) {
      return
    }
    const headers = ['order_number', 'customer_name', 'customer_email', 'product', 'category', 'amount', 'status', 'region', 'created_at']
    const rows = filteredOrders.map((o) => [
      o.order_number,
      o.customer_name,
      o.customer_email,
      o.product,
      o.category,
      o.amount.toString(),
      o.status,
      o.region,
      o.created_at,
    ])
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `orders_export_${new Date().toISOString()}.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const filteredOrders = useMemo(() => {
    const cutoff = new Date(Date.now() - range * 24 * 60 * 60 * 1000)
    return orders.filter((order) => {
      const created = new Date(order.created_at)
      const matchesDate = created >= cutoff
      const matchesSearch = [order.order_number, order.customer_name, order.product, order.customer_email]
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase())
      const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus
      const matchesRegion = selectedRegion === 'all' || order.region === selectedRegion
      const matchesCategory = selectedCategory === 'all' || order.category === selectedCategory
      return matchesDate && matchesSearch && matchesStatus && matchesRegion && matchesCategory
    })
  }, [orders, range, search, selectedStatus, selectedRegion, selectedCategory])

  const revenue = useMemo(() => filteredOrders.reduce((sum, order) => sum + order.amount, 0), [filteredOrders])
  const orderCount = filteredOrders.length
  const aov = orderCount ? revenue / orderCount : 0
  const refundCount = filteredOrders.filter((order) => order.status === 'refunded').length
  const refundRate = orderCount ? (refundCount / orderCount) * 100 : 0

  const revenueByCategory = useMemo(() => {
    const totals = categories.map((category) => ({ category, revenue: 0 }))
    filteredOrders.forEach((order) => {
      const bucket = totals.find((item) => item.category === order.category)
      if (bucket) bucket.revenue += order.amount
    })
    return totals
  }, [filteredOrders])

  const statusBreakdown = useMemo(() => {
    return statuses.map((status) => ({ name: status, value: filteredOrders.filter((order) => order.status === status).length }))
  }, [filteredOrders])

  const topProducts = useMemo(() => {
    const map = new Map<string, number>()
    filteredOrders.forEach((order) => map.set(order.product, (map.get(order.product) ?? 0) + order.amount))
    return Array.from(map.entries())
      .map(([product, revenue]) => ({ product, revenue }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)
  }, [filteredOrders])

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 rounded-3xl bg-white p-6 shadow-card">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-600">Sales dashboard</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Revenue and order health</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Real-time sales metrics for revenue, fulfillment, and refunds across regions and product categories.
            </p>
            {error ? (
              (() => {
                const missingTable = error.includes("Could not find the table 'public.orders'") || error.includes("Could not find the table 'public.orders' in the schema cache")
                if (missingTable) {
                  return (
                    <div className="mt-3 space-y-3">
                      <p className="text-sm text-rose-600">Supabase is missing the `orders` table. Run the schema below in your Supabase SQL editor.</p>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white"
                          onClick={() => navigator.clipboard?.writeText(schemaSQL)}
                        >
                          Copy SQL
                        </button>
                        <button
                          type="button"
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white"
                          onClick={() => loadOrders()}
                        >
                          Retry
                        </button>
                        <button
                          type="button"
                          className="rounded-md bg-slate-100 px-3 py-2 text-sm font-medium"
                          onClick={() => {
                            setOrders(fallbackOrders)
                            setError(null)
                          }}
                        >
                          Use fallback data
                        </button>
                      </div>
                      <pre className="mt-2 max-w-full overflow-auto rounded bg-slate-50 p-3 text-xs text-slate-700">{schemaSQL}</pre>
                    </div>
                  )
                }
                return <p className="mt-3 text-sm text-rose-600">Unable to load Supabase data: {error}</p>
              })()
            ) : null}
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            onClick={resetFilters}
          >
            ↻ Clear filters
          </button>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card label="Total revenue" value={loading ? 'Loading…' : formatCurrency(revenue)} />
        <Card label="Orders" value={loading ? 'Loading…' : orderCount.toString()} />
        <Card label="Average order value" value={loading ? 'Loading…' : formatCurrency(aov)} />
        <Card label="Refund rate" value={loading ? 'Loading…' : `${refundRate.toFixed(1)}%`} />
      </section>

      <section className="mt-8 grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="space-y-4 rounded-3xl bg-white p-6 shadow-card">
          <div className="space-y-4">
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <span className="text-slate-400">🔍</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search orders, customers, products"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Date range</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {dateRanges.map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={`rounded-full px-3 py-2 text-sm font-medium ${range === value ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                    onClick={() => setRange(value)}
                  >
                    {value}d
                  </button>
                ))}
              </div>
            </div>
            <FilterSelect label="Status" value={selectedStatus} onChange={setSelectedStatus} options={['all', ...statuses]} />
            <FilterSelect label="Region" value={selectedRegion} onChange={setSelectedRegion} options={['all', ...regions]} />
            <FilterSelect label="Category" value={selectedCategory} onChange={setSelectedCategory} options={['all', ...categories]} />
          </div>
        </aside>

        <div className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <ChartCard title="Revenue over time">
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={revenueByCategory.map((item) => ({ name: item.category, value: item.revenue }))}>
                  <defs>
                    <linearGradient id="gradientRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={(value) => `$${value.toFixed(0)}`} width={60} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Area type="monotone" dataKey="value" stroke="#4f46e5" fill="url(#gradientRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Revenue by category">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={revenueByCategory} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="category" type="category" width={90} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Bar dataKey="revenue" fill="#0f172a">
                    {revenueByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#4f46e5', '#4338ca', '#3730a3', '#312e81'][index % 4]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <ChartCard title="Orders by status">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={statusBreakdown} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} fill="#4f46e5" label />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Top 5 products by revenue">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={topProducts} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="product" type="category" width={140} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Bar dataKey="revenue" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-card">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">Orders</h2>
            <p className="text-sm text-slate-600">Sorted by most recent. Showing {loading ? 'Loading…' : orderCount} result{orderCount === 1 ? '' : 's'}.</p>
          </div>
          <button
            type="button"
            className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
            onClick={exportCSV}
            disabled={loading || filteredOrders.length === 0}
          >
            Export CSV
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[960px] divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3">Order #</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Region</th>
                <th className="px-4 py-3">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {!loading && filteredOrders.slice(0, 25).map((order) => (
                <tr key={order.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{order.order_number}</td>
                  <td className="px-4 py-3">{order.customer_name}</td>
                  <td className="px-4 py-3">{order.product}</td>
                  <td className="px-4 py-3">{order.category}</td>
                  <td className="px-4 py-3">{formatCurrency(order.amount)}</td>
                  <td className="px-4 py-3 capitalize text-slate-700">{order.status}</td>
                  <td className="px-4 py-3">{order.region}</td>
                  <td className="px-4 py-3">{new Date(order.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-slate-500">Loading orders from Supabase…</td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-slate-500">No orders match the current filters.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-card">
      <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">{label}</p>
      <p className="mt-4 text-3xl font-semibold text-slate-950">{value}</p>
    </div>
  )
}

function ChartCard({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-card">
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <div className="mt-4 h-[280px]">{children}</div>
    </div>
  )
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: readonly string[]
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{label}</label>
      <select
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Dashboard
