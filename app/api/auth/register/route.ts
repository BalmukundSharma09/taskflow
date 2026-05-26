import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { rateLimit } from "@/lib/rate-limit";
import { validateEmail, validatePassword, validateName, checkOrigin } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    if (!checkOrigin(request)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!rateLimit(`register:${clientIp}`, 5, 60_000)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await request.json();
    const { name, email, password } = body;

    const nameErr = validateName(name);
    if (nameErr) {
      return NextResponse.json({ error: nameErr }, { status: 400 });
    }

    const emailErr = validateEmail(email);
    if (emailErr) {
      return NextResponse.json({ error: emailErr }, { status: 400 });
    }

    const passwordErr = validatePassword(password);
    if (passwordErr) {
      return NextResponse.json({ error: passwordErr }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Invalid registration data" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User created successfully", userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
