import { env } from "../../config/env.js";

const emailWrapper = (
    title: string,
    content: string,
): string => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
</head>

<body style="
    margin: 0;
    padding: 0;
    background-color: #f5f7fb;
    font-family: Arial, Helvetica, sans-serif;
">
    <div style="
        width: 100%;
        padding: 40px 0;
    ">
        <div style="
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            padding: 32px;
            box-sizing: border-box;
        ">

            <h1 style="
                margin: 0 0 24px;
                color: #111827;
                font-size: 24px;
            ">
                Real Estate Management
            </h1>

            ${content}

            <div style="
                margin-top: 32px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                color: #6b7280;
                font-size: 12px;
            ">
                <p>
                    This is an automated email. Please do not reply.
                </p>

                <p>
                    &copy; ${new Date().getFullYear()} Real Estate Management
                </p>
            </div>

        </div>
    </div>
</body>
</html>
`;
};

export const verificationOtpTemplate = (
    fullName: string,
    otp: string,
): string => {
    return emailWrapper(
        "Email Verification",
        `
            <p style="font-size: 16px; color: #374151;">
                Hello ${fullName},
            </p>

            <p style="font-size: 16px; color: #374151;">
                Thank you for registering with us.
                Please use the OTP below to verify your email address.
            </p>

            <div style="
                margin: 28px 0;
                padding: 20px;
                background-color: #f3f4f6;
                border-radius: 8px;
                text-align: center;
            ">
                <span style="
                    font-size: 32px;
                    font-weight: bold;
                    letter-spacing: 8px;
                    color: #111827;
                ">
                    ${otp}
                </span>
            </div>

            <p style="font-size: 14px; color: #6b7280;">
                This OTP will expire in
                ${env.OTP_EXPIRY_MINUTES} minutes.
            </p>

            <p style="font-size: 14px; color: #6b7280;">
                If you did not create this account, you can safely ignore
                this email.
            </p>
        `,
    );
};

export const passwordResetOtpTemplate = (
    fullName: string,
    otp: string,
): string => {
    return emailWrapper(
        "Password Reset",
        `
            <p style="font-size: 16px; color: #374151;">
                Hello ${fullName},
            </p>

            <p style="font-size: 16px; color: #374151;">
                We received a request to reset your password.
                Use the OTP below to continue.
            </p>

            <div style="
                margin: 28px 0;
                padding: 20px;
                background-color: #f3f4f6;
                border-radius: 8px;
                text-align: center;
            ">
                <span style="
                    font-size: 32px;
                    font-weight: bold;
                    letter-spacing: 8px;
                    color: #111827;
                ">
                    ${otp}
                </span>
            </div>

            <p style="font-size: 14px; color: #6b7280;">
                This OTP will expire in
                ${env.OTP_EXPIRY_MINUTES} minutes.
            </p>

            <p style="font-size: 14px; color: #6b7280;">
                If you did not request a password reset, please ignore
                this email.
            </p>
        `,
    );
};

export const welcomeEmailTemplate = (
    fullName: string,
): string => {
    return emailWrapper(
        "Welcome",
        `
            <p style="font-size: 16px; color: #374151;">
                Hello ${fullName},
            </p>

            <p style="font-size: 16px; color: #374151;">
                Your email has been successfully verified.
                Welcome to Real Estate Management.
            </p>

            <p style="font-size: 16px; color: #374151;">
                Your account is now ready to use.
            </p>
        `,
    );
};

export const passwordChangedEmailTemplate = (
    fullName: string,
): string => {
    return emailWrapper(
        "Password Changed",
        `
            <p style="font-size: 16px; color: #374151;">
                Hello ${fullName},
            </p>

            <p style="font-size: 16px; color: #374151;">
                Your password has been changed successfully.
            </p>

            <p style="font-size: 14px; color: #6b7280;">
                If you did not make this change, please contact the
                administrator immediately.
            </p>
        `,
    );
};