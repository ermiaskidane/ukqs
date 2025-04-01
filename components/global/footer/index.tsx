import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white">
        <div className="container px-4 py-8 md:px-6">
          <div className="mt-8 border-t border-blue-900 pt-8 text-sm">
            <div className="flex flex-col gap-4 md:flex-row md:justify-between">
              <p>© 2025 UKQS. All rights reserved.</p>
              <div className="flex gap-4">
                <Link href="#" className="hover:underline">
                  Terms & Conditions
                </Link>
                <Link href="#" className="hover:underline">
                  Privacy & GDPR Policy
                </Link>
                <Link href="#" className="hover:underline">
                  Cookies Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer
