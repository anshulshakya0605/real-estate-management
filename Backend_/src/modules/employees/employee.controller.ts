import { RequestHandler } from "express";
import { catchAsync } from "../../utils/catchAsync";
import * as employeeService from './employee.service.js'
import { sendListSuccess, sendSuccess } from "../../utils/response";
import { EMPLOYEE_MESSAGES, HTTP_STATUS } from "../../shared/constants";
import { AccountStatus, City, Trade } from "../../shared/enums";


export const getEmployees: RequestHandler = catchAsync(
    async (req, res) => {
        const query = {
            trade: req.query.trade as Trade | undefined,

            city: req.query.city as City | undefined,

            availability: req.query.availability === 'true'
             ? true
             : req.query.availability === 'false'
             ? false : undefined,

             accountStatus: req.query.accountStatus as AccountStatus | undefined,

             page: req.query.page ? Number(req.query.page) : undefined,

             limit: req.query.limit ? Number(req.query.limit) : undefined,

        }

        const result = await employeeService.getEmployees(query);
        console.log('result: ', result);
        
        return sendListSuccess(
            res, 
            HTTP_STATUS.OK,
            EMPLOYEE_MESSAGES.EMPLOYEES_FETCHED,
            result.data,
            result.pagination,
            String(req.id)
        )
    }
    
)

export const getEmployeeById: RequestHandler = catchAsync( async (req, res) => {

    const employee = await employeeService.getEmployeeById(req.params.id)

    return sendSuccess(
        res,
        HTTP_STATUS.OK,
        EMPLOYEE_MESSAGES.EMPLOYEE_FETCHED,
        employee,
        String(req.id)
    )

})

export const updateEmployee: RequestHandler = catchAsync( async (req, res) => {
    const employee = await employeeService.updateEmployee(req.params.id, req.body)
    return sendSuccess(
        res,
        HTTP_STATUS.OK,
        EMPLOYEE_MESSAGES.EMPLOYEE_UPDATED,
        employee,
        String(req.id)
    )
})

export const approveEmployee: RequestHandler = catchAsync( async (req, res) => {
    const employee = await employeeService.approveEmployee(req.params.id, req.user!.userId)
    return sendSuccess(
        res,
        HTTP_STATUS.OK,
        EMPLOYEE_MESSAGES.EMPLOYEE_APPROVED,
        employee,
        String(req.id)
    )
})

export const rejectedEmployee: RequestHandler = catchAsync(async (req, res) => {
    const employee = await employeeService.rejectEmployee(req.params.id, req.body)
    return sendSuccess(
        res,
        HTTP_STATUS.OK,
        EMPLOYEE_MESSAGES.EMPLOYEE_REJECTED,
        employee,
        String(req.id)
    )
})