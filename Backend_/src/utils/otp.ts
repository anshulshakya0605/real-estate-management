import { randomInt } from "crypto"
import { CONFIG } from "../shared/constants"
import { env } from "../config/env";
import bcrypt from 'bcrypt'


export const generateOtp = (): string => {
    const minimum = 10 ** (CONFIG.OTP_LENGTH - 1);
    const maximum = 10 ** CONFIG.OTP_LENGTH;

    return randomInt(minimum, maximum).toString();
}

export const hashOtp = async (
    otp: string,
): Promise<string> => {
    return bcrypt.hash(
        otp,
        env.BCRYPT_SALT_ROUNDS,
    );
};

export const compareOtp = async (
    otp: string,
    otpHash: string,
): Promise<boolean> => {
    return bcrypt.compare(
        otp,
        otpHash,
    );
};

export const getOtpExpiryDate = (): Date => {
    const expiryMilliseconds =
        CONFIG.OTP_EXPIRY_MINUTES *
        60 *
        1000;

    return new Date(
        Date.now() + expiryMilliseconds,
    );
};