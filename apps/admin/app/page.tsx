'use client'

import { useState, useEffect, SetStateAction } from 'react'
import Link from 'next/link'
import { Card } from '@workspace/ui/components/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@workspace/ui/components/table'
import { motion } from 'framer-motion'

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

  // States
  const [sortColumn, setSortColumn] = useState('id')
  const [sortDirection, setSortDirection] = useState('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLicense, setSelectedLicense] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [theme, setTheme] = useState('light')
  const usersPerPage = 10

  // Theme switching logic
  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('dark', 'custom')
    if (theme === 'dark') {
      root.classList.add('dark')
    } else if (theme === 'custom') {
      root.classList.add('custom')
    }
  }, [theme])

  // Compute license counts
  const licenseCounts = users.reduce((acc: Record<string, number>, user) => {
    acc[user.license] = (acc[user.license] || 0) + 1
    return acc
  }, {})
  const totalUsers = users.length
  const licensePercentages: Record<string, string> = {}
  for (const [license, count] of Object.entries(licenseCounts)) {
    licensePercentages[license] = ((count / totalUsers) * 100).toFixed(2) + '%'
  }
  const licenses = ['Basic', 'Premium', 'Enterprise']
  const maxCount = Math.max(...licenses.map((license) => licenseCounts[license] || 0))

  // Sorted users
  const sortedUsers = [...users].sort((a, b) => {
    let comparison = 0
    if (sortColumn === 'id') comparison = a.id.localeCompare(b.id)
    else if (sortColumn === 'email') comparison = a.email.localeCompare(b.email)
    else if (sortColumn === 'license') comparison = a.license.localeCompare(b.license)
    return sortDirection === 'asc' ? comparison : -comparison
  })

  // Filtered users
  const filteredUsers = sortedUsers.filter(
    (user) =>
      (selectedLicense === 'all' || user.license === selectedLicense) &&
      (user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)

  // Handle sort
  const handleSort = (column: SetStateAction<string>) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-8 relative overflow-hidden bg-white dark:bg-black custom:bg-gradient-to-br custom:bg-purple-500/10 custom:to-cyan-500/10">
      {/* Animated background shapes */}
      <motion.div
        className="absolute top-20 right-[10%] w-64 h-64 rounded-full blur-3xl bg-purple-300/30 dark:bg-gray-400/30 custom:bg-purple-500/30"
        animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 left-[10%] w-72 h-72 rounded-full blur-3xl bg-cyan-300/30 dark:bg-gray-300/30 custom:bg-cyan-500/30"
        animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
      />

      {/* Header */}
      <header className="flex justify-between items-center relative z-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white custom:text-white">
          Admin Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="p-2 border rounded bg-gray-100 dark:bg-gray-800 custom:bg-gray-800 text-gray-900 dark:text-white custom:text-white"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="custom">Custom</option>
          </select>
          <div className="bg-gray-100 dark:bg-gray-800 custom:bg-gray-800 p-2 rounded-md text-sm text-gray-900 dark:text-white custom:text-white">
            Last updated: {new Date().toLocaleDateString()}
          </div>
          <button
            onClick={() => alert('Odświeżanie danych...')}
            className="p-2 rounded text-white bg-blue-500 hover:bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600 custom:bg-purple-500 custom:hover:bg-purple-600"
          >
            Refresh
          </button>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        <Card className="p-6 bg-gray-50 dark:bg-gray-900 custom:bg-gray-900">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 custom:text-purple-300">
            Total Users
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white custom:text-white">
            1,234
          </p>
          <div className="mt-2 text-xs text-green-600 dark:text-green-400 custom:text-green-400">
            ↑ 12% from last month
          </div>
        </Card>
        <Card className="p-6 bg-gray-50 dark:bg-gray-900 custom:bg-gray-900">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 custom:text-purple-300">
            Active Licenses
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white custom:text-white">987</p>
          <div className="mt-2 text-xs text-green-600 dark:text-green-400 custom:text-green-400">
            ↑ 8% from last month
          </div>
        </Card>
        <Card className="p-6 bg-gray-50 dark:bg-gray-900 custom:bg-gray-900">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 custom:text-purple-300">
            Revenue
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white custom:text-white">
            $12,345
          </p>
          <div className="mt-2 text-xs text-green-600 dark:text-green-400 custom:text-green-400">
            ↑ 15% from last month
          </div>
        </Card>
      </div>

      {/* Chart and Users Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10">
        {/* Chart */}
        <Card className="col-span-1 lg:col-span-1 xl:col-span-1 p-6 bg-gray-50 dark:bg-gray-900 custom:bg-gray-900">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white custom:text-white">
            Dystrybucja licencji
          </h2>
          <div className="flex justify-around gap-2">
            {licenses.map((license, index) => {
              const count = licenseCounts[license] || 0
              const percentage = licensePercentages[license] || '0%'
              const heightPercentage = maxCount > 0 ? (count / maxCount) * 100 : 0
              return (
                <div key={license} className="flex flex-col items-center">
                  <div className="h-48 w-16 relative">
                    <div
                      className={`absolute bottom-0 w-full ${
                        index === 0 ? 'bg-purple-500' : index === 1 ? 'bg-cyan-500' : 'bg-green-500'
                      }`}
                      style={{ height: `${heightPercentage}%` }}
                    ></div>
                  </div>
                  <span className="mt-1 text-xs text-gray-900 dark:text-white custom:text-white">
                    {license}
                  </span>
                  <span className="text-xs text-gray-900 dark:text-white custom:text-white">
                    {count} ({percentage})
                  </span>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Users Table */}
        <Card className="col-span-1 lg:col-span-2 xl:col-span-3 p-6 bg-gray-50 dark:bg-gray-900 custom:bg-gray-900">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white custom:text-white">
              Użytkownicy
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400 custom:text-purple-300">
              Łącznie: {filteredUsers.length}
            </div>
          </div>
          <div className="mb-4 flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Szukaj po emailu lub ID"
              className="p-2 border rounded w-full sm:w-auto bg-white dark:bg-gray-800 custom:bg-gray-800 text-gray-900 dark:text-white custom:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="p-2 border rounded w-full sm:w-auto bg-white dark:bg-gray-800 custom:bg-gray-800 text-gray-900 dark:text-white custom:text-white"
              value={selectedLicense}
              onChange={(e) => setSelectedLicense(e.target.value)}
            >
              <option value="all">Wszystkie licencje</option>
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    onClick={() => handleSort('id')}
                    className="cursor-pointer text-gray-900 dark:text-white custom:text-white"
                  >
                    <div className="flex items-center">
                      ID
                      {sortColumn === 'id' && (
                        <span className="ml-1">{sortDirection === 'asc' ? '▲' : '▼'}</span>
                      )}
                    </div>
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort('email')}
                    className="cursor-pointer text-gray-900 dark:text-white custom:text-white"
                  >
                    <div className="flex items-center">
                      Email
                      {sortColumn === 'email' && (
                        <span className="ml-1">{sortDirection === 'asc' ? '▲' : '▼'}</span>
                      )}
                    </div>
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort('license')}
                    className="cursor-pointer text-gray-900 dark:text-white custom:text-white"
                  >
                    <div className="flex items-center">
                      Licencja
                      {sortColumn === 'license' && (
                        <span className="ml-1">{sortDirection === 'asc' ? '▲' : '▼'}</span>
                      )}
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Link
                        href={`/admin/users/${user.id}`}
                        className="text-blue-500 hover:underline dark:text-gray-400 custom:text-purple-300"
                      >
                        {user.id}
                      </Link>
                    </TableCell>
                    <TableCell className="text-gray-900 dark:text-white custom:text-white">
                      {user.email}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.license === 'Premium'
                            ? 'bg-purple-500 text-white'
                            : user.license === 'Enterprise'
                              ? 'bg-green-500 text-white'
                              : 'bg-blue-500 text-white'
                        } dark:bg-gray-800 dark:text-gray-400 custom:bg-purple-600 custom:text-white`}
                      >
                        {user.license}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex flex-col sm:flex-row justify-between mt-4 gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={`px-4 py-2 rounded ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-500 custom:bg-gray-800 custom:text-purple-500'
                  : 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600 custom:bg-purple-500 custom:hover:bg-purple-600'
              }`}
            >
              Poprzednia
            </button>
            <span className="text-gray-900 dark:text-white custom:text-white">
              Strona {currentPage} z {Math.ceil(filteredUsers.length / usersPerPage)}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className={`px-4 py-2 rounded ${
                indexOfLastUser >= filteredUsers.length
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-500 custom:bg-gray-800 custom:text-purple-500'
                  : 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600 custom:bg-purple-500 custom:hover:bg-purple-600'
              }`}
            >
              Następna
            </button>
          </div>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="p-6 relative z-10 bg-gray-50 dark:bg-gray-900 custom:bg-gray-900">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white custom:text-white">
          Ostatnie aktywności
        </h2>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 custom:hover:bg-purple-900/20"
            >
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-500 dark:bg-gray-800 dark:text-gray-400 custom:bg-gray-800 custom:text-purple-300">
                {activity.user.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white custom:text-white">
                  {activity.user}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 custom:text-purple-300">
                  {activity.action}
                </p>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 custom:text-purple-300">
                {activity.timestamp}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
