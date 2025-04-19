// 'use client'

// import { useState, useEffect } from 'react'
// import Link from 'next/link'
// import { MenuBar } from '@/components/home/menu-bar'
// import { Button } from '@workspace/ui/components/button'
// import { motion } from 'framer-motion'
// import { Sparkles } from 'lucide-react'
// import { usePathname } from 'next/navigation'
// import { ModeToggle } from '../mode-toggle'
// import { SignedIn, SignedOut } from '@clerk/nextjs'

// export function Header() {
//   const [isScrolled, setIsScrolled] = useState(false)
//   const [currentSection] = useState(0)
//   const pathname = usePathname()
//   const isHomePage = pathname === '/home'

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10)
//     }

//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   return (
//     <header
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         isScrolled || (isHomePage && currentSection > 0)
//           ? 'bg-background/80 backdrop-blur-lg shadow-md py-2 dark:bg-gray-900/80'
//           : 'bg-transparent py-4'
//       }`}
//     >
//       <div className="container mx-auto flex items-center justify-between px-4 4xl:text-2xl">
//         <Link href="/home" className="flex items-center gap-2">
//           <motion.div
//             initial={{ rotate: -10 }}
//             animate={{ rotate: 10 }}
//             transition={{
//               repeat: Number.POSITIVE_INFINITY,
//               repeatType: 'reverse',
//               duration: 2,
//               ease: 'easeInOut',
//             }}
//           >
//             <Sparkles className="h-6 w-6 xl:h-8 xl:w-8 2xl:h-10 2xl:w-10 text-purple-500 dark:text-gray-400" />
//           </motion.div>
//           <span className="text-xl 3xl:text-3xl font-bold bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-gray-300 dark:to-gray-100 bg-clip-text text-transparent">
//             AylaAI
//           </span>
//         </Link>

//         <div className="hidden md:block">
//           <MenuBar />
//         </div>

//         <div className="flex items-center gap-4 ">
//           <ModeToggle />
//           <SignedOut>
//             <Link href="/sign-in">
//               <Button
//                 size="lg"
//                 className="bg-gradient-to-r 2xl:text-2xl from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 dark:from-gray-900 dark:to-gray-600 dark:hover:from-gray-700 dark:hover:to-gray-500 text-white hover:cursor-pointer"
//               >
//                 Login
//               </Button>
//             </Link>
//           </SignedOut>
//           <SignedIn>
//             <Link href="/buy-license">
//               <Button
//                 size="lg"
//                 className="bg-gradient-to-r 2xl:text-2xl from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 dark:from-gray-900 dark:to-gray-600 dark:hover:from-gray-700 dark:hover:to-gray-500 text-white hover:cursor-pointer"
//               >
//                 Buy License
//               </Button>
//             </Link>
//           </SignedIn>
//         </div>
//       </div>
//     </header>
//   )
// }

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MenuBar } from '@/components/home/menu-bar'
import { Button } from '@workspace/ui/components/button'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { ModeToggle } from '@/components/home/mode-toggle'
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [hasLicense, setHasLicense] = useState(false)
  const [loading, setLoading] = useState(true)
  const { user, isLoaded } = useUser()
  const pathname = usePathname()
  const isHomePage = pathname === '/home'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const fetchLicense = async () => {
      if (isLoaded && user) {
        const res = await fetch('/api/get-license', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user.primaryEmailAddress?.emailAddress,
          }),
        })

        const data = await res.json()
        if (data.license) {
          setHasLicense(true)
        }
        setLoading(false)
      }
    }

    fetchLicense()
  }, [isLoaded, user])

  // Callback, który będzie wywołany po wygenerowaniu licencji
  // const updateLicenseStatus = (newStatus: boolean) => {
  //   setHasLicense(newStatus)
  // }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent ${
        isScrolled || isHomePage ? 'py-2' : 'py-4'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 4xl:text-2xl">
        <Link href="/home" className="flex items-center gap-2">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 10 }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: 'reverse',
              duration: 2,
              ease: 'easeInOut',
            }}
          >
            <Sparkles className="h-6 w-6 xl:h-8 xl:w-8 2xl:h-10 2xl:w-10 text-purple-500 dark:text-gray-400" />
          </motion.div>
          <span className="text-xl 3xl:text-3xl font-bold bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-gray-300 dark:to-gray-100 bg-clip-text text-transparent">
            AylaAI
          </span>
        </Link>

        <div className="hidden md:block">
          <MenuBar />
        </div>

        <div className="flex items-center gap-4 ">
          <ModeToggle />
          <SignedOut>
            <Link href="/sign-in">
              <Button
                size="lg"
                className="bg-gradient-to-r 2xl:text-2xl from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 dark:from-gray-900 dark:to-gray-600 dark:hover:from-gray-700 dark:hover:to-gray-500 text-white hover:cursor-pointer"
              >
                Login
              </Button>
            </Link>
          </SignedOut>
          <SignedIn>
            {loading ? (
              <Button size="lg" disabled>
                Ładowanie...
              </Button>
            ) : hasLicense || pathname === '/buy-license' ? (
              <Link href="/license-info">
                <Button
                  size="lg"
                  className="bg-gradient-to-r 2xl:text-2xl from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 dark:from-gray-900 dark:to-gray-600 dark:hover:from-gray-700 dark:hover:to-gray-500 text-white hover:cursor-pointer"
                >
                  License Info
                </Button>
              </Link>
            ) : (
              <Link href="/buy-license">
                <Button
                  size="lg"
                  className="bg-gradient-to-r 2xl:text-2xl from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 dark:from-gray-900 dark:to-gray-600 dark:hover:from-gray-700 dark:hover:to-gray-500 text-white hover:cursor-pointer"
                >
                  Buy License
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>
    </header>
  )
}
