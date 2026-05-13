import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { name, email, password, type } = await req.json();

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: type || "employee",
    });

    // generate token
    const token = generateToken({
      id: user._id,
      role: user.role,
    });

    return Response.json({
      message: "User created successfully",
      user,
      token,
    });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}