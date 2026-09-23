export const LOGGER_CONFIG = {
    DEVELOPMENT_LEVEL: "debug",
    PRODUCTION_LEVEL: "info",

    APP_LOG_FILE: "app.log",
    ERROR_LOG_FILE: "error.log",

    REDACT_PATHS: [
        "password",
        "passwordHash",
        "token",
        "otp",
        "req.headers.authorization",
    ],
} as const;