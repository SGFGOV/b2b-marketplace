import { ContainerRegistrationKeys, Modules } from '@medusajs/framework/utils'
import { createOrderWorkflow } from '@medusajs/medusa/core-flows'

import sellerOrder from '../../links/seller-order'
import { calculateCommissionWorkflow } from '../commission/workflows/calculate-commission'
import { COMPANY_MODULE } from '#/modules/company'
import { StepResponse } from '@medusajs/framework/workflows-sdk'

createOrderWorkflow.hooks.orderCreated(async ({ order }, { container }) => {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK);
  
      if (!order.metadata?.company_id) {
        return new StepResponse(undefined, null);
      }
  
      await remoteLink.create({
        [Modules.ORDER]: {
          order_id: order.id,
        },
        [COMPANY_MODULE]: {
          company_id: order.metadata?.company_id,
        },
      });
  

  const {
    data: [seller]
  } = await query.graph({
    entity: sellerOrder.entryPoint,
    fields: ['seller_id'],
    filters: {
      order_id: order.id
    }
  })

  if (!seller) {
    return
  }

  await calculateCommissionWorkflow.run({
    input: {
      order_id: order.id,
      seller_id: seller.seller_id
    },
    container
  })
},async (orderId: string | null, { container }) => {
    if (!orderId) {
      return;
    }

    const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK);

    await remoteLink.dismiss({
      [Modules.ORDER]: {
        order_id: orderId,
      },
    });
  })
