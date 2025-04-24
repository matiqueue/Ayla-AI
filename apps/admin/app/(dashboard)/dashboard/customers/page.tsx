import type { Metadata } from 'next'
import Image from 'next/image'
import { PencilIcon, TrashIcon, UserPlusIcon } from 'lucide-react'

import { Button } from '@workspace/ui/components/button'
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@workspace/ui/components/table'
import { MainNav } from '@/components/dashboard/main-nav'
import { Search } from '@/components/dashboard/search'
import TeamSwitcher from '@/components/dashboard/team-switcher'
import { UserNav } from '@/components/dashboard/user-nav'
import { data } from '@/data/data'

export const metadata: Metadata = {
  title: 'Customers',
  description: 'Manage your customer information.',
}

const customers = data['recent-sales'].users

export default function CustomersPage() {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/customers-light.png"
          width={1280}
          height={866}
          alt="Customers"
          className="block dark:hidden"
        />
        <Image
          src="/examples/customers-dark.png"
          width={1280}
          height={866}
          alt="Customers"
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
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
            <div className="flex items-center space-x-2">
              <Button className="hover:cursor-pointer">
                <UserPlusIcon className="mr-2 h-4 w-4" />
                Add Customer
              </Button>
            </div>
          </div>
          <Card className="h-[calc(100vh-208px)]">
            <CardHeader>
              <CardTitle>Customer List</CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100%-2rem)]">
              <div className="h-full overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="sticky top-0">Name</TableHead>
                      <TableHead className="sticky top-0">Email</TableHead>
                      <TableHead className="sticky top-0">Phone</TableHead>
                      <TableHead className="sticky top-0">Address</TableHead>
                      <TableHead className="sticky top-0 w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.phone}</TableCell>
                        <TableCell className="max-w-[300px] truncate">{customer.address}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon" className="hover:cursor-pointer">
                              <PencilIcon className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:cursor-pointer">
                              <TrashIcon className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
