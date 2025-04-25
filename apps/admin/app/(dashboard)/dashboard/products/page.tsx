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
import { ModeToggle } from '@workspace/ui/components/mode-toggle'
import { motion } from 'framer-motion'

export const metadata: Metadata = {
  title: 'Products',
  description: 'Manage your product inventory.',
}

type Product = {
  id: number
  name: string
  description: string
  price: string
  stock: number
}

const res = await fetch('http://localhost:3001/api/products', {
  cache: 'no-store',
})
const products: Product[] = await res.json()

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
          <motion.div
            className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-purple-500/10 dark:bg-gray-600/20 blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 8,
              ease: 'easeInOut',
            }}
          />

          <motion.div
            className="absolute bottom-20 left-[10%] w-72 h-72 rounded-full bg-cyan-500/10 dark:bg-gray-500/10 blur-3xl"
            animate={{
              x: [0, -20, 0],
              y: [0, 20, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 10,
              ease: 'easeInOut',
            }}
          />
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Products</h2>
            <div className="flex items-center space-x-2">
              <Button className="hover:cursor-pointer">
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>
          </div>
          <Card className="h-[calc(100vh-208px)]">
            <CardHeader>
              <CardTitle>Product Inventory</CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100%-2rem)]">
              <div className="h-full overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="sticky top-0">Name</TableHead>
                      <TableHead className="hidden md:table-cell sticky top-0">
                        Description
                      </TableHead>
                      <TableHead className="sticky top-0">Price</TableHead>
                      <TableHead className="sticky top-0">Stock</TableHead>
                      <TableHead className="sticky top-0 w-[100px]">Actions</TableHead>
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
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
