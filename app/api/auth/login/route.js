import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import User from "@/lib/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await connectMongo();

  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json(
      { message: "אימייל או סיסמה שגויים" },
      { status: 401 }
    );
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return NextResponse.json(
      { message: "אימייל או סיסמה שגויים" },
      { status: 401 }
    );
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return NextResponse.json({
    user: { id: user._id, name: user.name, email: user.email },
    token,
  });
}
