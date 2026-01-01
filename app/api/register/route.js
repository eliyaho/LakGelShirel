import { NextResponse } from "next/server";
import { connectDB  } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// פונקציות ואלידציה
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) => password.length >= 6;
const validateName = (name) => /^[a-zA-Zא-ת0-9 ]{2,}$/.test(name.trim());

export async function POST(req) {
  try {
    await connectDB ();

    const { name, email, password } = await req.json();

    // בדיקות חוקיות
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "חסרים פרטים" },
        { status: 400 }
      );
    }

    if (!validateName(name)) {
      return NextResponse.json(
        { message: "שם לא חוקי – מינימום 2 תווים, אותיות ומספרים בלבד" },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { message: "כתובת אימייל לא חוקית" },
        { status: 400 }
      );
    }

    if (!validatePassword(password)) {
      return NextResponse.json(
        { message: "סיסמה חייבת להכיל לפחות 6 תווים" },
        { status: 400 }
      );
    }

    // בדיקה אם המשתמש קיים
    const exists = await User.findOne({ email });
    if (exists) {
      return NextResponse.json(
        { message: "האימייל כבר קיים" },
        { status: 409 }
      );
    }

    // הצפנת סיסמה
    const hashedPassword = await bcrypt.hash(password, 10);

    // יצירת המשתמש
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // יצירת JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      message: "נרשמת בהצלחה",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return NextResponse.json(
      { message: "שגיאת שרת" },
      { status: 500 }
    );
  }
}
