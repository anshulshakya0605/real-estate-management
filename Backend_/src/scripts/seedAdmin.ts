import { connectDatabase, disconnectDatabase } from "../config/database";
import { env } from "../config/env";
import { User } from "../models";
import { AccountStatus, Role } from "../shared/enums/index";
import bcrypt from 'bcrypt'


const ADMIN_EMAIL = "admin@realestate.com";
const ADMIN_PASSWORD = "Admin@12345";
const ADMIN_NAME = "System Admin";

const seedAdmin = async (): Promise<void> => {
    try {
        await connectDatabase();

        const existingAdmin = await User.findOne({
            email: ADMIN_EMAIL,
            role: Role.ADMIN,
        });

        if (existingAdmin) {
            console.log("Admin already exists.");
            return;
        }

        const passwordHash = await bcrypt.hash(
            ADMIN_PASSWORD,
            env.BCRYPT_SALT_ROUNDS,
        );

        await User.create({
            email: ADMIN_EMAIL,
            passwordHash,
            fullName: ADMIN_NAME,
            role: Role.ADMIN,
            accountStatus: AccountStatus.ACTIVE,
            isActive: true,
            emailVerified: true,
        });

        console.log("Admin seeded successfully.");
        console.log(`Email: ${ADMIN_EMAIL}`);
        console.log(`Password: ${ADMIN_PASSWORD}`);
    } catch (error) {
        console.error("Admin seed failed:", error);
        process.exitCode = 1;
    } finally {
        await disconnectDatabase();
    }
};

void seedAdmin();