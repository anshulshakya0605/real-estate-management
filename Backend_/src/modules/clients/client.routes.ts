import Router from 'express'
import { authenticate, authorize } from '../../middleware/auth.middleware';
import { Role } from '../../shared/enums';
import { validate } from '../../middleware/validate.middleware';
import { clientListQuerySchema } from './client.dto';
import { getClientById, getClients, getClientSites } from './client.controller';

const router = Router();

router.get('/', 
    authenticate,
    authorize(Role.ADMIN),
    validate(clientListQuerySchema),
    getClients
)

router.get('/:id',
    authenticate,
    authorize(Role.ADMIN),
    getClientById
)


router.get('/:id/sites',
    authenticate,
    authorize(Role.ADMIN, Role.CLIENT),
    getClientSites
)


export default router