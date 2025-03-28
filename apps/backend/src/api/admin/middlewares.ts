import { MiddlewareRoute } from '@medusajs/framework'

import { commissionMiddlewares } from './commission/middlewares'
import { configurationMiddleware } from './configuration/middlewares'
import { orderSetsMiddlewares } from './order-sets/middlewares'
import { requestsMiddlewares } from './requests/middlewares'
import { returnRequestsMiddlewares } from './return-request/middlewares'
import { reviewsMiddlewares } from './reviews/middlewares'
import { sellerMiddlewares } from './sellers/middlewares'

import { adminCompaniesMiddlewares } from "./company/middlewares";
import { adminQuotesMiddlewares } from "./quotes/middlewares";
import { adminApprovalsMiddlewares } from "./approvals/middlewares";
export const adminMiddlewares: MiddlewareRoute[] = [
  ...orderSetsMiddlewares,
  ...requestsMiddlewares,
  ...configurationMiddleware,
  ...returnRequestsMiddlewares,
  ...commissionMiddlewares,
  ...sellerMiddlewares,
  ...reviewsMiddlewares,
    ...adminCompaniesMiddlewares,
    ...adminQuotesMiddlewares,
    ...adminApprovalsMiddlewares,
]
