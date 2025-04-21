import { Card } from '@workspace/ui/components/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@workspace/ui/components/table'
import { ModeToggle } from '@workspace/ui/components/mode-toggle'

export default function AdminDashboard() {
  // Hardcoded user data
  const users = [
    { id: 'USR-001', email: 'john.doe@example.com', license: 'Premium' },
    { id: 'USR-002', email: 'jane.smith@example.com', license: 'Basic' },
    { id: 'USR-003', email: 'robert.johnson@example.com', license: 'Premium' },
    { id: 'USR-004', email: 'emily.williams@example.com', license: 'Enterprise' },
  ]

  // Hardcoded recent activities
  const activities = [
    { id: 1, user: 'John Doe', action: 'Updated profile', timestamp: 'Today, 2:30 PM' },
    {
      id: 2,
      user: 'Jane Smith',
      action: 'Purchased Premium license',
      timestamp: 'Yesterday, 11:15 AM',
    },
    {
      id: 3,
      user: 'Robert Johnson',
      action: 'Logged in from new device',
      timestamp: 'Yesterday, 9:45 AM',
    },
  ]

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <div className="bg-muted p-2 rounded-md text-sm">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Total Users</h3>
          <p className="text-3xl font-bold">1,234</p>
          <div className="mt-2 text-xs text-green-500">↑ 12% from last month</div>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Active Licenses</h3>
          <p className="text-3xl font-bold">987</p>
          <div className="mt-2 text-xs text-green-500">↑ 8% from last month</div>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Revenue</h3>
          <p className="text-3xl font-bold">$12,345</p>
          <div className="mt-2 text-xs text-green-500">↑ 15% from last month</div>
        </Card>
      </div>

      {/* Chart and Users Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Chart */}
        <Card className="col-span-1 lg:col-span-1 xl:col-span-1 p-6">
          <h2 className="text-lg font-semibold mb-4">License Distribution</h2>
          <div className="h-64 flex items-end justify-around gap-2">
            {/* Simple inline SVG chart */}
            <svg width="100%" height="100%" viewBox="0 0 300 200" className="mt-4">
              <rect x="40" y="30" width="60" height="150" fill="#0ea5e9" />
              <rect x="120" y="70" width="60" height="110" fill="#8b5cf6" />
              <rect x="200" y="100" width="60" height="80" fill="#10b981" />

              <text x="70" y="190" textAnchor="middle" className="text-xs">
                Basic
              </text>
              <text x="150" y="190" textAnchor="middle" className="text-xs">
                Premium
              </text>
              <text x="230" y="190" textAnchor="middle" className="text-xs">
                Enterprise
              </text>

              <text x="70" y="20" textAnchor="middle" className="text-xs">
                45%
              </text>
              <text x="150" y="60" textAnchor="middle" className="text-xs">
                33%
              </text>
              <text x="230" y="90" textAnchor="middle" className="text-xs">
                22%
              </text>
            </svg>
          </div>
        </Card>

        {/* Users Table */}
        <Card className="col-span-1 lg:col-span-2 xl:col-span-3 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Users</h2>
            <div className="text-sm text-muted-foreground">Total: {users.length}</div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>License</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.license === 'Premium'
                            ? 'bg-purple-100 text-purple-800'
                            : user.license === 'Enterprise'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {user.license}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {activity.user.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-medium">{activity.user}</p>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
              </div>
              <div className="text-xs text-muted-foreground">{activity.timestamp}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
