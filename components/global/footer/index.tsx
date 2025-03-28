import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white">
        <div className="container px-4 py-8 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-medium">Menu</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/" className="text-sm hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Become an approved centre
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    International Centre
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium">Quick links</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Qualifications
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Endorsed courses
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium">Connect with us</h3>
              <ul className="mt-4 space-y-2">
                <li className="text-sm">Email: info@ukqs.org.uk</li>
                <li className="text-sm">Office: +44 116 473 6140</li>
                <li className="text-sm">Phone: +447 886 141 907</li>
              </ul>
            </div>
          </div>
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