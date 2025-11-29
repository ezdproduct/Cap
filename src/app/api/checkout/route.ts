import { NextResponse } from 'next/server';
import { CartItem } from '@/store/cart';

const API_URL = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL;
const CONSUMER_KEY = process.env.NEXT_PUBLIC_WOOCOMMERCE_KEY;
const CONSUMER_SECRET = process.env.NEXT_PUBLIC_WOOCOMMERCE_SECRET;

if (!API_URL || !CONSUMER_KEY || !CONSUMER_SECRET) {
  console.error("WooCommerce API credentials are not configured in .env.local");
}

const auth = 'Basic ' + Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');

export async function POST(req: Request) {
  try {
    const { billingDetails, items, paymentMethodId, paymentMethodTitle } = await req.json();

    if (!billingDetails || !items || items.length === 0 || !paymentMethodId || !paymentMethodTitle) {
      return NextResponse.json({ message: 'Missing required checkout data.' }, { status: 400 });
    }

    const line_items = items.map((item: CartItem) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    const orderData = {
      payment_method: paymentMethodId,
      payment_method_title: paymentMethodTitle,
      set_paid: false,
      billing: {
        first_name: billingDetails.firstName,
        last_name: billingDetails.lastName,
        address_1: billingDetails.address || '',
        city: billingDetails.city || '',
        state: billingDetails.state || '',
        postcode: billingDetails.zip || '',
        country: 'US', // Defaulting to US, this could be a form field
        email: billingDetails.email,
        phone: billingDetails.phone || '',
      },
      shipping: { // Assuming shipping is same as billing for simplicity
        first_name: billingDetails.firstName,
        last_name: billingDetails.lastName,
        address_1: billingDetails.address || '',
        city: billingDetails.city || '',
        state: billingDetails.state || '',
        postcode: billingDetails.zip || '',
        country: 'US',
      },
      line_items: line_items,
      // In a real app, you'd calculate shipping and add shipping_lines here
    };

    const response = await fetch(`${API_URL}/wp-json/wc/v3/orders`, {
      method: 'POST',
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('WooCommerce API Error:', responseData);
      return NextResponse.json({ message: responseData.message || 'Failed to create order.' }, { status: response.status });
    }

    return NextResponse.json({ success: true, order: responseData }, { status: 201 });

  } catch (error) {
    console.error('Internal Server Error:', error);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}