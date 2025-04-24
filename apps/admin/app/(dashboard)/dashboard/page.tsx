import { Metadata } from 'next'
import Image from 'next/image'

import { Button } from '@workspace/ui/components/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs'
import { CalendarDateRangePicker } from '@/components/dashboard/date-range-picker'
import { MainNav } from '@/components/dashboard/main-nav'
import { Overview } from '@/components/dashboard/overview'
import { RecentSales } from '@/components/dashboard/recent-sales'
import { Search } from '@/components/dashboard/search'
import TeamSwitcher from '@/components/dashboard/team-switcher'
import { UserNav } from '@/components/dashboard/user-nav'
import { ModeToggle } from '@workspace/ui/components/mode-toggle'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Example dashboard app built using the components.',
}

type Stat = {
  id: number
  category: string
  value: string
  percentage: string
  daily: number
  weekly: number
  monthly: number
  desktop: number
  mobile: number
  tablet: number
  since_last_hour: string
}

const res = await fetch('http://localhost:3001/api/statistics', {
  cache: 'no-store',
})
const statistics: Stat[] = await res.json()

export default function DashboardPage() {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex h-screen">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <ModeToggle />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Tabs defaultValue="overview" className="space-y-4">
            <div className="flex items-center justify-between space-y-2">
              <div className="flex items-center space-x-4">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <TabsList>
                  <TabsTrigger value="overview" className="cursor-pointer">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="cursor-pointer">
                    Analytics
                  </TabsTrigger>
                  <TabsTrigger value="reports" className="cursor-pointer">
                    Reports
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="cursor-pointer">
                    Notifications
                  </TabsTrigger>
                </TabsList>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarDateRangePicker />
                <Button className="hover:cursor-pointer">Download</Button>
              </div>
            </div>

            {/* Overview - dostosowane rozmiary */}
            <TabsContent value="overview" className="space-y-2 flex-1 overflow-hidden">
              <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                    <CardTitle className="text-xs font-medium">Total Revenue</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-3 w-3 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent className="py-1">
                    <div className="text-lg font-bold">$45,231.89</div>
                    <p className="text-[10px] text-muted-foreground">+20.1% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                    <CardTitle className="text-xs font-medium">Subscriptions</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-3 w-3 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent className="py-1">
                    <div className="text-lg font-bold">+2350</div>
                    <p className="text-[10px] text-muted-foreground">+180.1% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                    <CardTitle className="text-xs font-medium">Sales</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-3 w-3 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent className="py-1">
                    <div className="text-lg font-bold">+12,234</div>
                    <p className="text-[10px] text-muted-foreground">+19% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                    <CardTitle className="text-xs font-medium">Active Now</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-3 w-3 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent className="py-1">
                    <div className="text-lg font-bold">+573</div>
                    <p className="text-[10px] text-muted-foreground">+201 since last hour</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-7 flex-1 overflow-hidden">
                <Card className="col-span-4">
                  <CardHeader className="pb-0.5">
                    <CardTitle className="text-xs">Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-1 py-0.5">
                    <div className="h-[306px]">
                      <Overview />
                    </div>
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader className="pb-0.5">
                    <CardTitle className="text-xs">Recent Sales</CardTitle>
                    <CardDescription className="text-[10px]">
                      You made 265 sales this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="max-h-[306px] overflow-auto py-0.5">
                    <RecentSales />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Analytics - tylko wykres Overview */}
            <TabsContent value="analytics" className="space-y-2 h-screen">
              <Card>
                <CardHeader className="pb-0.5">
                  <CardTitle className="text-xs">Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-1 py-0.5">
                  <div className="h-[60vh]">
                    <Overview />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reports - tylko Recent Sales */}
            <TabsContent value="reports" className="space-y-2">
              <Card>
                <CardHeader className="pb-0.5">
                  <CardTitle className="text-xs">Recent Sales</CardTitle>
                  <CardDescription className="text-[10px]">
                    You made {statistics[2].monthly} sales this month.
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-0.5 max-h-[469px] overflow-auto">
                  <RecentSales />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications - tylko cztery małe karty */}
            <TabsContent value="notifications" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+2350</div>
                    <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sales</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+12,234</div>
                    <p className="text-xs text-muted-foreground">+19% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">+201 since last hour</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
