import { MiddlewareRoute, authenticate } from '@medusajs/framework'

import { storeOrderReturnRequestsMiddlewares } from './return-request/middlewares'
import { storeReviewMiddlewares } from './reviews/middlewares'
import { storeApprovalsMiddlewares } from "./approvals/middlewares";
import { storeCartsMiddlewares } from "./carts/middlewares";
import { storeCompaniesMiddlewares } from "./companies/middlewares";
import { storeFreeShippingMiddlewares } from "./free-shipping/middlewares";
import { storeQuotesMiddlewares } from "./quotes/middlewares";

export const storeMiddlewares: MiddlewareRoute[] = [
  {
    matcher: '/store/reviews/*',
    middlewares: [authenticate('customer', ['bearer', 'session'])]
  },
  {
    matcher: '/store/return-request/*',
    middlewares: [authenticate('customer', ['bearer', 'session'])]
  },
  ...storeCartsMiddlewares,
  ...storeOrderReturnRequestsMiddlewares,
  ...storeReviewMiddlewares,
  ...storeCartsMiddlewares,
    ...storeCompaniesMiddlewares,
    ...storeQuotesMiddlewares,
    ...storeFreeShippingMiddlewares,
    ...storeApprovalsMiddlewares,
  ];

