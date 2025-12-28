import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import User from "@/lib/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectMongo();

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "חסרים פרטים" },
        { status: 400 }
      );
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return NextResponse.json(
        { message: "האימייל כבר קיים" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
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
