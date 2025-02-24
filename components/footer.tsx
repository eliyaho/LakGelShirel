import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">לק גל שלי שיראל</h3>
            <p className="text-sm text-gray-400">מגלים את היופי שבך עם מוצרי לק איכותיים</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">קישורים מהירים</h4>
            <ul className="text-sm">
              <li className="mb-2">
                <Link href="/products" className="hover:text-pink-400">
                  מוצרים
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/about" className="hover:text-pink-400">
                  אודות
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/contact" className="hover:text-pink-400">
                  צור קשר
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/terms" className="hover:text-pink-400">
                  תנאי שימוש
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">צור קשר</h4>
            <p className="text-sm text-gray-400 mb-2">רחוב הלק 123</p>
            <p className="text-sm text-gray-400 mb-2">תל אביב, ישראל</p>
            <p className="text-sm text-gray-400 mb-2">טלפון: 03-1234567</p>
            <p className="text-sm text-gray-400">אימייל: info@lakgal.co.il</p>
          </div>
          <div className="w-full md:w-1/4">
            <h4 className="text-lg font-semibold mb-2">עקבו אחרינו</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} לק גל שלי שיראל. כל הזכויות שמורות.
        </div>
      </div>
    </footer>
  )
}

