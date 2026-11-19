import { Router } from 'express';
import { getHealth } from '../controllers/healthController.js';
import { checkZone } from '../controllers/zoneController.js';
import { listProducts } from '../controllers/catalogController.js';

export const healthRouter = Router();
healthRouter.get('/', getHealth);

export const zoneRouter = Router();
zoneRouter.get('/check/:pincode', checkZone);

export const catalogRouter = Router();
catalogRouter.get('/', listProducts);
