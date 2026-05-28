/**
 * PayPal configuration for WrapPro booking fees.
 *
 * Setup:
 * 1. Create a PayPal Business account: https://www.paypal.com/za/business
 * 2. Open https://developer.paypal.com/dashboard/applications/sandbox
 * 3. Create an app and copy the Client ID
 * 4. Paste it below (use Sandbox Client ID for testing, Live for production)
 */
const WRAPPRO_PAYPAL = {
    // Replace with your PayPal REST app Client ID
    clientId: 'YOUR_PAYPAL_CLIENT_ID',

    currency: 'ZAR',
    bookingFee: '250.00',
    itemName: 'WrapPro Appointment Booking Fee',
    itemDescription: 'Non-refundable booking fee — deducted from your final invoice',

    // Pages PayPal redirects to after payment (must be real URLs when live)
    returnUrl: typeof window !== 'undefined'
        ? new URL('pricing.html?booking=success', window.location.href).href
        : '',
    cancelUrl: typeof window !== 'undefined'
        ? new URL('pricing.html?booking=cancelled', window.location.href).href
        : ''
};
