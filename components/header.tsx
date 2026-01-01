"use client";

import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* לוגו */}
        <Link href="/" className="text-2xl font-semibold text-pink-600">
          Shirel Malka
        </Link>

        {/* ניווט */}
        <nav className="hidden md:flex space-x-4">
          <Link href="/products" className="text-gray-600 hover:text-pink-600">
            מוצרים
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-pink-600">
            אודות
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-pink-600">
            צור קשר
          </Link>
        </nav>

        {/* כפתורי צד ימין */}
        <div className="flex items-center space-x-4">
          {/* כפתור לוגין */}
          <Link href="/login">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5 text-gray-600" />
              <span className="sr-only">חשבון</span>
            </Button>
          </Link>

          {/* כפתור סל קניות */}
          <Link href="/cart">
            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5 text-gray-600" />
              <span className="sr-only">עגלת קניות</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
