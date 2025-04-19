// @ts-nocheck

'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@workspace/ui/components/button'
import { Download } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@workspace/ui/components/table'
import { SectionNavigator } from '@/components/home/section-navigator' // Załóżmy, że to poprawna ścieżka

export default function DesktopDownloadPage() {
  const [selectedModel, setSelectedModel] = useState<'Win' | 'Mac' | 'Linux'>('Win')
  const [releases, setReleases] = useState<
    {
      version: string
      date: string
      downloadLinks: { Win?: string; Mac?: string; Linux?: string }
      notes: string
    }[]
  >([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const models = [
    { id: 'Win', name: 'Windows' },
    { id: 'Mac', name: 'Mac' },
    { id: 'Linux', name: 'Linux' },
  ]

  const columns = [
    {
      accessorKey: 'version',
      header: 'Version',
      cell: ({ row }: { row: { getValue: (key: string) => string; index: number } }) => (
        <div className={`font-medium `}>{row.getValue('version')}</div>
      ),
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }: { row: { getValue: (key: string) => string } }) => (
        <div>{row.getValue('date')}</div>
      ),
    },
    {
      accessorKey: 'notes',
      header: 'Notes',
      cell: ({ row }: { row: { getValue: (key: string) => string } }) => (
        <div
          className="text-sm text-muted-foreground overflow-hidden"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {row.getValue('notes')}
        </div>
      ),
    },
    {
      id: 'download',
      header: 'Download',
      cell: ({ row }: { row: { original: { downloadLinks: { [key: string]: string } } } }) => (
        <Button
          size="sm"
          className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 dark:from-gray-800 dark:to-gray-600 dark:hover:from-gray-700 dark:hover:to-gray-500 text-white"
          onClick={() => window.open(row.original.downloadLinks[selectedModel] || '#', '_blank')}
          disabled={!row.original.downloadLinks[selectedModel]}
        >
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      ),
    },
  ]

  useEffect(() => {
    interface Release {
      tag_name: string
      published_at: string
      assets?: { browser_download_url: string; name: string }[]
      body?: string
    }

    const fetchReleases = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('https://api.github.com/repos/revoltchat/desktop/releases')
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`)
        }
        const data: Release[] = await response.json()
        const formattedReleases = data
          .map((release: Release) => {
            const downloadLinks: {
              Win?: string
              Mac?: string
              Linux?: string
            } = {}
            release.assets?.forEach((asset) => {
              const assetName = asset.name.toLowerCase()
              if (assetName.includes('win') || assetName.includes('.exe')) {
                downloadLinks.Win = asset.browser_download_url
              } else if (assetName.includes('mac') || assetName.includes('.dmg')) {
                downloadLinks.Mac = asset.browser_download_url
              } else if (
                assetName.includes('linux') ||
                assetName.includes('.deb') ||
                assetName.includes('.rpm')
              ) {
                downloadLinks.Linux = asset.browser_download_url
              }
            })
            return {
              version: release.tag_name,
              date: release.published_at.split('T')[0],
              downloadLinks,
              notes: release.body || 'No release notes available.',
            }
          })
          .slice(0, 3)
        setReleases(formattedReleases)
      } catch (err) {
        console.error(err)
        setError('Failed to fetch releases. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchReleases()
  }, [])

  const table = useReactTable({
    data: releases,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const getSelectedDownloadLink = () => {
    if (releases.length > 0) {
      return releases[0].downloadLinks[selectedModel as 'Win' | 'Mac' | 'Linux'] || '#'
    }
    return '#'
  }

  const sections = ['Model Selection', 'Releases']

  const handleSectionChange = (index: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: index * window.innerHeight,
        behavior: 'smooth',
      })
    }
  }

  return (
    <>
      <div
        id="scroll-container"
        ref={scrollContainerRef}
        className="h-screen overflow-y-auto bg-gradient-to-b from-purple-500/5 to-cyan-500/5 dark:from-black/5 dark:to-black/5"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        <section className="snap-section h-screen flex items-center justify-center">
          {/* Gradient tła */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-cyan-500/5 dark:from-black/5 dark:to-black/5 pointer-events-none" />

          {/* Animowane kształty w tle */}
          <motion.div
            className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-purple-500/10 dark:bg-gray-600/20 blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              repeat: Infinity,
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
              repeat: Infinity,
              duration: 10,
              ease: 'easeInOut',
            }}
          />
          <div className="container mx-auto px-10 relative z-10 flex flex-col items-center">
            <div className="flex flex-col lg:flex-row justify-between gap-8 mb-2 w-full">
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <motion.h1
                  className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 leading-[1.05] overflow-visible bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-gray-400 dark:to-gray-200 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Download the Desktop Version
                </motion.h1>
                <motion.p
                  className="text-sm md:text-base xl:text-lg text-muted-foreground mb-3 max-w-md mx-auto lg:mx-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Choose a model optimized for your workflow. Whether you need a lightweight
                  assistant or a powerful AI engine, we’ve got you covered.
                </motion.p>
              </div>
              <div className="w-full lg:w-1/2">
                <motion.div
                  className="flex flex-col items-center gap-4 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <label className="block text-xl xl:text-3xl 2xl:text-4xl font-bold mb-2">
                    Select a model:
                  </label>
                  <div className="flex items-center gap-4 w-full max-w-xs">
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value as 'Win' | 'Mac' | 'Linux')}
                      className="w-full xl:text-lg px-4 py-2 border border-border rounded-md bg-background text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {models.map((model) => (
                        <option key={model.id} value={model.id}>
                          {model.name}
                        </option>
                      ))}
                    </select>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r xl:text-xl from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 dark:from-gray-800 dark:to-gray-600 dark:hover:from-gray-700 dark:hover:to-gray-500 text-white"
                      onClick={() => window.open(getSelectedDownloadLink(), '_blank')}
                      disabled={
                        isLoading || !getSelectedDownloadLink() || getSelectedDownloadLink() === '#'
                      }
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </motion.div>
                <motion.div
                  className="flex justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <Link
                    href="/product"
                    className="text-sm xl:text-base text-muted-foreground hover:underline"
                  >
                    Back to option selection
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section className="snap-section h-screen flex items-center justify-center">
          <div className="container mx-auto px-10 relative z-10 flex flex-col items-center">
            <div className="w-full">
              {isLoading ? (
                <p className="text-center text-muted-foreground">Loading releases...</p>
              ) : error ? (
                <p className="text-center text-red-500">{error}</p>
              ) : releases.length === 0 ? (
                <p className="text-center text-muted-foreground">No releases available.</p>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <TableHead key={header.id} className="font-bold">
                              {header.isPlaceholder
                                ? null
                                : flexRender(header.column.columnDef.header, header.getContext())}
                            </TableHead>
                          ))}
                        </TableRow>
                      ))}
                    </TableHeader>
                    <TableBody>
                      {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                          <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                            {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <td colSpan={columns.length} className="h-24 text-center">
                            No results.
                          </td>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <SectionNavigator sections={sections} onSectionChange={handleSectionChange} />
    </>
  )
}
