/**
 * WrapPro — appointment booking + PayPal R250 booking fee (pricing page only)
 */
(function () {
    const form = document.getElementById('appointmentForm');
    const paypalContainer = document.getElementById('paypal-button-container');
    const paypalNotice = document.getElementById('paypal-setup-notice');
    const bookingWrapper = document.getElementById('booking-payment-wrapper');
    const bookingConfirmation = document.getElementById('bookingConfirmation');

    if (!form || !paypalContainer) return;

    const config = typeof WRAPPRO_PAYPAL !== 'undefined' ? WRAPPRO_PAYPAL : null;
    const termsCheckbox = document.getElementById('termsAgreement');

    const dateInput = document.getElementById('preferredDate');
    if (dateInput) {
        dateInput.setAttribute('min', new Date().toISOString().split('T')[0]);
    }

    function getBookingPayload() {
        const data = new FormData(form);
        return {
            fullName: data.get('fullName'),
            phone: data.get('phone'),
            email: data.get('email'),
            vehicleMake: data.get('vehicleMake'),
            vehicleModel: data.get('vehicleModel'),
            vehicleYear: data.get('vehicleYear'),
            wrapType: data.get('wrapType'),
            wrapColor: data.get('wrapColor') || '',
            preferredDate: data.get('preferredDate'),
            preferredTime: data.get('preferredTime'),
            additionalNotes: data.get('additionalNotes') || '',
            bookingFee: config?.bookingFee || '250.00',
            currency: config?.currency || 'ZAR'
        };
    }

    function validateBookingForm() {
        if (!form.checkValidity()) {
            form.reportValidity();
            return false;
        }
        if (termsCheckbox && !termsCheckbox.checked) {
            alert('Please agree that the R250 booking fee is non-refundable.');
            termsCheckbox.focus();
            return false;
        }
        return true;
    }

    function showBookingConfirmation(paypalDetails) {
        const payload = getBookingPayload();
        if (paypalDetails) {
            sessionStorage.setItem('wrappro_last_booking', JSON.stringify({
                ...payload,
                paypalOrderId: paypalDetails.id,
                payerEmail: paypalDetails.payer?.email_address,
                paidAt: new Date().toISOString()
            }));
        }

        if (bookingWrapper) bookingWrapper.style.display = 'none';
        if (bookingConfirmation) {
            bookingConfirmation.style.display = 'block';
            bookingConfirmation.scrollIntoView({ behavior: 'smooth', block: 'center' });

            const refEl = document.getElementById('booking-paypal-ref');
            if (refEl && paypalDetails?.id) {
                refEl.textContent = `Payment reference: ${paypalDetails.id}`;
                refEl.style.display = 'block';
            }
        }
    }

    function handleReturnFromPayPal() {
        const params = new URLSearchParams(window.location.search);
        if (params.get('booking') === 'success') {
            showBookingConfirmation({ id: params.get('token') || 'PayPal' });
            window.history.replaceState({}, '', 'pricing.html#book-appointment');
        } else if (params.get('booking') === 'cancelled') {
            if (paypalNotice) {
                paypalNotice.textContent = 'Payment was cancelled. You can try again when ready.';
                paypalNotice.classList.add('visible', 'warning');
            }
            window.history.replaceState({}, '', 'pricing.html#book-appointment');
        }
    }

    function isPayPalConfigured() {
        return config?.clientId && !config.clientId.includes('YOUR_PAYPAL');
    }

    function loadPayPalSdk(clientId) {
        return new Promise((resolve, reject) => {
            if (window.paypal) {
                resolve();
                return;
            }
            const script = document.createElement('script');
            script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&currency=ZAR&intent=capture&components=buttons`;
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load PayPal SDK'));
            document.body.appendChild(script);
        });
    }

    function renderPayPalButtons() {
        window.paypal.Buttons({
            style: {
                layout: 'vertical',
                color: 'gold',
                shape: 'rect',
                label: 'paypal',
                height: 45
            },

            onClick(data, actions) {
                if (!validateBookingForm()) {
                    return actions.reject();
                }
            },

            createOrder(data, actions) {
                const booking = getBookingPayload();
                return actions.order.create({
                    intent: 'CAPTURE',
                    purchase_units: [{
                        description: config.itemDescription,
                        amount: {
                            currency_code: config.currency,
                            value: config.bookingFee,
                            breakdown: {
                                item_total: {
                                    currency_code: config.currency,
                                    value: config.bookingFee
                                }
                            }
                        },
                        items: [{
                            name: config.itemName,
                            description: `${booking.wrapType} — ${booking.vehicleMake} ${booking.vehicleModel}`,
                            unit_amount: {
                                currency_code: config.currency,
                                value: config.bookingFee
                            },
                            quantity: '1',
                            category: 'SERVICE'
                        }],
                        custom_id: JSON.stringify({
                            name: booking.fullName,
                            email: booking.email,
                            phone: booking.phone,
                            date: booking.preferredDate,
                            time: booking.preferredTime
                        }).slice(0, 127)
                    }],
                    application_context: {
                        brand_name: 'WrapPro',
                        shipping_preference: 'NO_SHIPPING',
                        user_action: 'PAY_NOW'
                    }
                });
            },

            onApprove(data, actions) {
                return actions.order.capture().then(function (details) {
                    console.log('PayPal payment captured:', details);
                    showBookingConfirmation(details);
                });
            },

            onError(err) {
                console.error('PayPal error:', err);
                if (paypalNotice) {
                    paypalNotice.textContent = 'Payment could not be completed. Please try again or contact us.';
                    paypalNotice.classList.add('visible', 'error');
                }
            },

            onCancel() {
                if (paypalNotice) {
                    paypalNotice.textContent = 'Payment cancelled. Your booking is not confirmed until the fee is paid.';
                    paypalNotice.classList.add('visible', 'warning');
                }
            }
        }).render('#paypal-button-container');
    }

    function showSetupInstructions() {
        if (paypalNotice) {
            paypalNotice.innerHTML =
                '<strong>PayPal not configured yet.</strong> Add your Client ID in <code>paypal-config.js</code>, then reload this page. ' +
                '<a href="https://developer.paypal.com/dashboard/applications/sandbox" target="_blank" rel="noopener">Get a Sandbox Client ID</a>';
            paypalNotice.classList.add('visible', 'warning');
        }
        paypalContainer.innerHTML =
            '<p class="paypal-placeholder">PayPal buttons will appear here after you add your Client ID.</p>';
    }

    async function initPayPal() {
        handleReturnFromPayPal();

        if (!isPayPalConfigured()) {
            showSetupInstructions();
            return;
        }

        try {
            await loadPayPalSdk(config.clientId);
            paypalContainer.innerHTML = '';
            renderPayPalButtons();
        } catch (e) {
            console.error(e);
            if (paypalNotice) {
                paypalNotice.textContent = 'Could not load PayPal. Check your connection and Client ID.';
                paypalNotice.classList.add('visible', 'error');
            }
        }
    }

    initPayPal();
})();
