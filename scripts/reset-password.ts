import connectDB from "../lib/mongodb";
import Admin from "../models/Admin";
import bcrypt from "bcryptjs";

async function resetAdminPassword() {
  try {
    await connectDB();

    const hashedPassword = await bcrypt.hash("admin@1234", 10);

    const admin = await Admin.findOneAndUpdate(
      { username: "admin" },
      {
        password: hashedPassword,
      },
      { new: true }
    );

    if (!admin) {
      console.log("Admin user not found");
    }

    console.log("Admin password reset successfully");
  } catch (error) {
    console.error("Error resetting admin password:", error);
  }
}

resetAdminPassword();