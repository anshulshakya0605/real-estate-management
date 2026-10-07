import { Router } from "express";
import { authenticate, authorize } from "../../middleware/auth.middleware";
import { Role } from "../../shared/enums";
import { validate } from "../../middleware/validate.middleware";
import { createSiteSchema, siteListQuerySchema, updateSiteSchema } from "./site.dto";
import { createSite, deleteSite, getSiteById, getSites, updateSite } from "./site.controller";


const router = Router();


router.post('/',
    authenticate,
    authorize(Role.ADMIN),
    validate(createSiteSchema),
    createSite
)

router.get('/', 
    authenticate,
    validate(siteListQuerySchema),
    getSites
)

router.get('/:id', 
    authenticate,
    getSiteById
)

router.patch('/:id',
    authenticate,
    authorize(Role.ADMIN),
    validate(updateSiteSchema),
    updateSite
)

router.delete('/:id',
    authenticate,
    authorize(Role.ADMIN),
    deleteSite
)


export default router