import type { Metadata } from 'next'
import Image from 'next/image'
import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react'

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

export const metadata: Metadata = {
  title: 'Products',
  description: 'Manage your product inventory.',
}

// Sample product data
const products = [
  {
    id: '1',
    name: 'Premium Headphones',
    description: 'Wireless noise-cancelling headphones with premium sound quality',
    price: '$249.99',
    stock: 45,
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Fitness tracker with heart rate monitoring and sleep analysis',
    price: '$199.99',
    stock: 32,
  },
  {
    id: '3',
    name: 'Ergonomic Keyboard',
    description: 'Mechanical keyboard with customizable RGB lighting',
    price: '$129.99',
    stock: 78,
  },
  {
    id: '4',
    name: 'Ultra HD Monitor',
    description: '32-inch 4K monitor with HDR support and USB-C connectivity',
    price: '$399.99',
    stock: 15,
  },
  {
    id: '5',
    name: 'Wireless Mouse',
    description: 'Precision wireless mouse with programmable buttons',
    price: '$59.99',
    stock: 120,
  },
  {
    id: '6',
    name: 'Portable SSD',
    description: '1TB external SSD with USB 3.2 and shock-resistant design',
    price: '$179.99',
    stock: 53,
  },
]

export default function ProductsPage() {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/products-light.png"
          width={1280}
          height={866}
          alt="Products"
          className="block dark:hidden"
        />
        <Image
          src="/examples/products-dark.png"
          width={1280}
          height={866}
          alt="Products"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
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
            <h2 className="text-3xl font-bold tracking-tight">Products</h2>
            <div className="flex items-center space-x-2">
              <Button className="hover:cursor-pointer">
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Product Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Description</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell className="hidden md:table-cell max-w-[300px] truncate">
                        {product.description}
                      </TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>
                        <span
                          className={`${product.stock < 20 ? 'text-red-500' : product.stock < 50 ? 'text-yellow-500' : 'text-green-500'}`}
                        >
                          {product.stock}
                        </span>
                      </TableCell>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
