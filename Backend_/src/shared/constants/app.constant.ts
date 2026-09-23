export const APP_CONFIG = {
    JSON_BODY_LIMIT: "1mb",

    CORS_METHODS: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "OPTIONS",
    ],

    CORS_ALLOWED_HEADERS: [
        "Content-Type",
        "Authorization",
        "X-Request-ID",
    ],
} as const;