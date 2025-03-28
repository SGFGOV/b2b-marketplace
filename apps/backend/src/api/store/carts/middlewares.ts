import {
  MiddlewareRoute,
  validateAndTransformBody,
  validateAndTransformQuery
} from '@medusajs/framework'
import * as QueryConfig from '@medusajs/medusa/api/store/carts/query-config'
import { StoreGetCartsCart } from '@medusajs/medusa/api/store/carts/validators'
import { StoreAddCartShippingMethods } from '@medusajs/medusa/api/store/carts/validators'
import {
  authenticate,

} from "@medusajs/framework";

import { retrieveCartTransformQueryConfig } from "./query-config";
import {
  GetCartLineItemsBulkParams,
  StoreAddLineItemsBulk,
} from "./validators";

export const storeCartsMiddlewares: MiddlewareRoute[] = [
  {
    method: ['POST'],
    matcher: '/store/carts/:id/shipping-methods',
    middlewares: [
      validateAndTransformBody(StoreAddCartShippingMethods),
      validateAndTransformQuery(
        StoreGetCartsCart,
        QueryConfig.retrieveTransformQueryConfig
      )
    ]
  },{
      method: ["POST"],
      matcher: "/store/carts/:id/line-items/bulk",
      middlewares: [
        validateAndTransformBody(StoreAddLineItemsBulk),
        validateAndTransformQuery(
          GetCartLineItemsBulkParams,
          retrieveCartTransformQueryConfig
        ),
      ],
    },
    {
      method: ["POST"],
      matcher: "/store/carts/:id/approvals",
      middlewares: [authenticate("customer", ["bearer", "session"])],
    },
]
