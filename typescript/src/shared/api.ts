import Stripe from 'stripe';
import {createCustomer, listCustomers} from './customers/functions';
import {createProduct, listProducts} from './products/functions';
import {createPrice, listPrices} from './prices/functions';
import {createPaymentLink} from './paymentLinks/functions';
import {
  createInvoice,
  listInvoices,
  finalizeInvoice,
} from '@/shared/invoices/functions';
import {createInvoiceItem} from '@/shared/invoiceItems/functions';
import {retrieveBalance} from '@/shared/balance/functions';
import {createRefund} from '@/shared/refunds/functions';
import {searchDocumentation} from '@/shared/documentation/functions';
import {listPaymentIntents} from '@/shared/paymentIntents/functions';
import {listSubscriptions} from '@/shared/subscriptions/functions';

import type {Context} from './configuration';

class StripeAPI {
  stripe: Stripe;

  context: Context;

  constructor(secretKey: string, context?: Context) {
    const stripeClient = new Stripe(secretKey, {
      appInfo: {
        name: 'stripe-agent-toolkit-typescript',
        version: '0.5.3',
        url: 'https://github.com/stripe/agent-toolkit',
      },
    });
    this.stripe = stripeClient;
    this.context = context || {};
  }

  async createMeterEvent({
    event,
    customer,
    value,
  }: {
    event: string;
    customer: string;
    value: string;
  }) {
    await this.stripe.billing.meterEvents.create(
      {
        event_name: event,
        payload: {
          stripe_customer_id: customer,
          value: value,
        },
      },
      this.context.account ? {stripeAccount: this.context.account} : undefined
    );
  }

  async run(method: string, arg: any) {
    if (method === 'create_customer') {
      const output = JSON.stringify(
        await createCustomer(this.stripe, this.context, arg)
      );
      return output;
    } else if (method === 'list_customers') {
      const output = JSON.stringify(
        await listCustomers(this.stripe, this.context, arg)
      );
      return output;
    } else if (method === 'create_product') {
      const output = JSON.stringify(
        await createProduct(this.stripe, this.context, arg)
      );
      return output;
    } else if (method === 'list_products') {
      const output = JSON.stringify(
        await listProducts(this.stripe, this.context, arg)
      );
      return output;
    } else if (method === 'create_price') {
      const output = JSON.stringify(
        await createPrice(this.stripe, this.context, arg)
      );
      return output;
    } else if (method === 'list_prices') {
      const output = JSON.stringify(
        await listPrices(this.stripe, this.context, arg)
      );
      return output;
    } else if (method === 'create_payment_link') {
      const output = JSON.stringify(
        await createPaymentLink(this.stripe, this.context, arg)
      );
      return output;
    } else if (method === 'create_invoice') {
      const output = JSON.stringify(
        await createInvoice(this.stripe, this.context, arg)
      );
      return output;
    } else if (method === 'list_invoices') {
      const output = JSON.stringify(
        await listInvoices(this.stripe, this.context, arg)
      );
      return output;
    } else if (method === 'create_invoice_item') {
      const output = JSON.stringify(
        await createInvoiceItem(this.stripe, this.context, arg)
      );
      return output;
    } else if (method === 'finalize_invoice') {
      const output = JSON.stringify(
        await finalizeInvoice(this.stripe, this.context, arg)
      );
      return output;
    } else if (method === 'retrieve_balance') {
      const output = JSON.stringify(
        await retrieveBalance(this.stripe, this.context, arg)
      );
      return output;
    } else if (method === 'create_refund') {
      const output = JSON.stringify(
        await createRefund(this.stripe, this.context, arg)
      );
      return output;
    } else if (method === 'list_payment_intents') {
      const output = JSON.stringify(
        await listPaymentIntents(this.stripe, this.context, arg)
      );
      return output;
    } else if (method === 'list_subscriptions') {
      const output = JSON.stringify(
        await listSubscriptions(this.stripe, this.context, arg)
      );
      return output;
    } else if (method === 'search_documentation') {
      const output = JSON.stringify(
        await searchDocumentation(this.stripe, this.context, arg)
      );
      return output;
    } else {
      throw new Error('Invalid method ' + method);
    }
  }
}

export default StripeAPI;
