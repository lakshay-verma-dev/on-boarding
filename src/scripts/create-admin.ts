import "dotenv/config";

import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

async function createAdmin() {
    try {
        await connectDB();

        console.log("MongoDB Connected");

        const existingAdmin = await User.findOne({
            email: "admin@hrm.com",
        });

        if (existingAdmin) {
            console.log("Admin already exists");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(
            "admin123",
            10
        );

        const admin = await User.create({
            name: "Super Admin",
            email: "admin@hrm.com",
            password: hashedPassword,
            role: "ADMIN",
            designation: "Super Admin",
            department: "Management",
            isActive: true,
        });

        console.log("=================================");
        console.log("Admin created successfully");
        console.log("=================================");

        console.log({
            email: admin.email,
            password: "admin123",
            role: admin.role,
        });

        process.exit(0);
    } catch (error) {
        console.log("=================================");
        console.log("Error creating admin");
        console.log(error);
        console.log("=================================");

        process.exit(1);
    }
}

createAdmin();