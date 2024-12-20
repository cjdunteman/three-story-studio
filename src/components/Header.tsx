'use client'

import { useState } from "react"
import Link from "next/link"
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon } from "@heroicons/react/24/outline"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header>
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <img
              src="/3SS_logo_transparent.png"
              className="h-32 w-auto"
              alt="Three Story Studio Logo"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        {/* Large screen layout */}
        <div className="hidden lg:flex lg:gap-x-12">
          <div className="text-3xl">
            <Link className="pr-4 border-r mr-4 border-black" href="/">
                  Home
              </Link>
              <Link className="pr-4 border-r mr-4 border-black" href="/peeks">
                  Peeks
              </Link>
              <Link className="" href="/stories">
                  Stories
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <div>      
              <a href="mailto:kristin@threestorystudio.com">
                <button className="border-2 py-2 px-4 rounded text-3xl border-lightBeige">Inquire</button>
              </a>
            </div>
        </div>
      </nav>
      {/* The mobile menu is built from a Dialog component from Headless UI */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10">
          <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex flex-row-reverse">
             <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="flex flex-col gap-8">
              <Link className="text-2xl font-bold" href="/">Home</Link>
              <Link className="text-2xl font-bold" href="/peeks">Peeks</Link>
              <Link className="text-2xl font-bold" href="/stories">Stories</Link>
              <a href="mailto:kristin@threestorystudio.com">
                  <button className="border-2 py-2 px-2 rounded text-3xl border-lightBeige">Inquire
                  </button>
              </a>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </header>
  )
}