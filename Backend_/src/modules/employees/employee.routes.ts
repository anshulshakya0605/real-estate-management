import { Router } from "express";
import { authenticate, authorize } from "../../middleware/auth.middleware";
import { ROLES } from "../../shared/constants";
import { validate } from "../../middleware/validate.middleware";
import { employeeListQuerySchema, rejectEmployeeSchema, updateEmployeeSchema } from "./employee.dto";
import { approveEmployee, getEmployeeById, getEmployees, rejectedEmployee, updateEmployee } from "./employee.controller";



const router = Router();

// get employees list
router.get('/',
    authenticate,
    authorize(ROLES.ADMIN),
    validate(employeeListQuerySchema),
    getEmployees
)

// get employee
router.get('/:id',
    authenticate,
    authorize(ROLES.ADMIN),
    getEmployeeById
)

// update employee
router.patch('/:id',
    authenticate,
    authorize(ROLES.ADMIN),
    validate(updateEmployeeSchema),
    updateEmployee
)

// approve employee
router.patch('/:id/approve',
    authenticate,
    authorize(ROLES.ADMIN),
    approveEmployee
)

// rejected employee
router.patch('/:id/reject',
    authenticate,
    authorize(ROLES.ADMIN),
    validate(rejectEmployeeSchema),
    rejectedEmployee
)

export default router;