export class BookingTemplateClass{
static generateBookingEmailTemplate(booking, room_id, booking_amount, checkoutAmount, url) {
    return `
      <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Booking Confirmation</title>
<style>
    body {
        font-family: Arial, sans-serif;
        background-color: #f5f5f5;
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }
    .container {
        background-color: #ffffff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        overflow: hidden;
        width: 400px;
        max-width: 90%;
    }
    .header {
        background-color: #007bff;
        color: white;
        text-align: center;
        padding: 20px;
        font-size: 24px;
    }
    .content {
        padding: 20px;
    }
    .message {
        color: #444;
        font-size: 16px;
        margin-bottom: 20px;
    }
    .details {
        color: #555;
        font-size: 14px;
        margin-bottom: 10px;
    }
    .confirmation-button {
        display: block;
        width: 100%;
        text-align: center;
        padding: 10px;
        background-color: #007bff;
        color: white;
        text-decoration: none;
        border-radius: 5px;
    }
    .thank-you {
        color: #555;
        text-align: center;
        font-size: 18px;
        margin-top: 20px;
    }
</style>
</head>
<body>
<div class="container">
    <div class="header">
        Booking Confirmation
    </div>
    <div class="content">
        <p class="message">Your booking has been created successfully.</p>
        <p class="details">Booking ID: ${booking}</p>
        <p class="details">Room ID: ${room_id}</p>
        <p class="details">Booking Amount: ${booking_amount}</p>
        <p class="details">Checkout Amount: ${checkoutAmount}</p>
        <a class="confirmation-button" href="${url}" target="_blank">Confirm Booking</a>
        <p class="thank-you">Thank you for choosing us!</p>
    </div>
</div>
</body>
</html>
    `;
}

static generateBill(payment_id, booking_amount) {
    return `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Booking Bill</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f5f5f5;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                }
                .container {
                    background-color: #ffffff;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    border-radius: 10px;
                    overflow: hidden;
                    width: 400px;
                    max-width: 90%;
                }
                .header {
                    background-color: #007bff;
                    color: white;
                    text-align: center;
                    padding: 20px;
                    font-size: 24px;
                }
                .content {
                    padding: 20px;
                }
                .message {
                    color: #444;
                    font-size: 16px;
                    margin-bottom: 20px;
                }
                .bill-details {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 15px;
                }
                .bill-label {
                    color: #777;
                }
                .bill-amount {
                    color: #222;
                    font-weight: bold;
                }
                .thank-you {
                    color: #555;
                    text-align: center;
                    font-size: 18px;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    Booking Bill
                </div>
                <div class="content">
                    <p class="message">Dear Customer,</p>
                    <p class="message">Here is the bill for the booking:</p>
                    <div class="bill-details">
                        <span class="bill-label">Payment ID:</span>
                        <span class="bill-amount">${payment_id}</span>
                    </div>
                    <div class="bill-details">
                        <span class="bill-label">Total Amount:</span>
                        <span class="bill-amount">${booking_amount} INR</span>
                    </div>
                    <p class="thank-you">Thank you for choosing our hotel!</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

static generateDenialEmailTemplate(payment_id, booking_amount) {
    return `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Booking Denial</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f5f5f5;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                }
                .container {
                    background-color: #ffffff;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    border-radius: 10px;
                    overflow: hidden;
                    width: 400px;
                    max-width: 90%;
                }
                .header {
                    background-color: #ff4444; /* Red color for denial */
                    color: white;
                    text-align: center;
                    padding: 20px;
                    font-size: 24px;
                }
                .content {
                    padding: 20px;
                }
                .message {
                    color: #444;
                    font-size: 16px;
                    margin-bottom: 20px;
                }
                .bill-details {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 15px;
                }
                .bill-label {
                    color: #777;
                }
                .bill-amount {
                    color: #222;
                    font-weight: bold;
                }
                .thank-you {
                    color: #555;
                    text-align: center;
                    font-size: 18px;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    Booking Denial
                </div>
                <div class="content">
                    <p class="message">Dear Customer,</p>
                    <p class="message">We regret to inform you that your booking has been denied.</p>
                    <div class="bill-details">
                        <span class="bill-label">Payment ID:</span>
                        <span class="bill-amount">${payment_id}</span>
                    </div>
                    <div class="bill-details">
                        <span class="bill-label">Total Amount:</span>
                        <span class="bill-amount">${booking_amount} INR</span>
                    </div>
                    <p class="thank-you">Thank you for considering us.</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

}