export const API_ENDPOINTS = {
    AUTH: {
        BASE: "/auth",

        REGISTER_EMPLOYEE: "/register/employee",
        REGISTER_CLIENT: "/register/client",

        VERIFY_EMAIL: "/verify-email",
        RESEND_VERIFICATION: "/resend-verification",

        LOGIN: "/login",

        FORGOT_PASSWORD: "/forgot-password",
        VERIFY_RESET_OTP: "/verify-reset-otp",
        RESET_PASSWORD: "/reset-password",

        CHANGE_PASSWORD: "/change-password",
        ME: "/me",
        LOGOUT: "/logout",
    },

    USERS: {
        BASE: "/users",

        BY_ID: "/:id",
        ACTIVATE: "/:id/activate",
        DEACTIVATE: "/:id/deactivate",
    },

    EMPLOYEES: {
        BASE: "/employees",

        BY_ID: "/:id",
        APPROVE: "/:id/approve",
        REJECT: "/:id/reject",

        TASKS: "/:id/tasks",
        MY_TASKS: "/me/tasks",
    },

    CLIENTS: {
        BASE: "/clients",

        BY_ID: "/:id",
        SITES: "/:id/sites",
    },

    INQUIRIES: {
        BASE: "/inquiries",

        BY_ID: "/:id",
        STATUS: "/:id/status",
        ASSIGN: "/:id/assign",
        CONVERT: "/:id/convert",
    },

    SITES: {
        BASE: "/sites",

        BY_ID: "/:id",
        PROGRESS: "/:id/progress",
        TASKS: "/:id/tasks",
        FLOOR_PLANS: "/:id/floor-plans",
    },

    TASKS: {
        BASE: "/tasks",

        BY_ID: "/:id",
        STATUS: "/:id/status",
    },

    FLOOR_PLANS: {
        BASE: "/floor-plans",

        BY_SITE: "/site/:siteId",
        BY_ID: "/:id",

        APPROVE: "/:id/approve",
        REJECT: "/:id/reject",
    },

    MAPS: {
        BASE: "/maps",

        SITES: "/sites",
        SITE_BY_ID: "/sites/:id",
        NEARBY: "/nearby",
        CITY_SUMMARY: "/cities/summary",
    },

    HEALTH: {
        BASE: "/health",
        VERSION: "/version",
    },
} as const;