export class CheckinTemplateClass {
    static makeCheckin(userEmail: string, roomNumber: string, secretKey: string) {
        // const imageUrl = 'https://img.freepik.com/premium-photo/abstract-blur-luxury-hotel-lobby-background_1339-98449.jpg'; // Replace with your image URL
        const imageUrl = 'https://img.freepik.com/premium-photo/blurry-outside-front-luxury-hotel-building-with-soft-light-blurred-image-city-street-night-england_39190-453.jpg'; // Replace with your image URL

        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Welcome to Our Hotel!</title>
                <style>
                    /* Reset default styles */
                    body, h1, p {
                        margin: 0;
                        padding: 0;
                    }
                    
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f5eded;
                    }
                    
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #ffffff;
                        border-radius: 10px;
                        box-shadow: 0px 2px 6px rgba(255, 255, 255, 0.938);
                        position: relative;
                    }
                    
                    .header {
                        text-align: center;
                        color: #f1eaea;
                        margin-bottom: 20px;
                    }
                    
                    .header h1 {
                        color: #ffffff;
                    }
                    
                    .checkin-details {
                        padding: 20px;
                        background-color: rgba(255, 255, 255, 0.9);
                        position: relative;
                        overflow: hidden;
                        backdrop-filter: blur(10px);
                        -webkit-backdrop-filter: blur(100px);
                    }
                    
                    .checkin-details h2 {
                        color: #2c3e50;
                        margin-bottom: 10px;
                        font-size: 28px;
                        text-align: center; 
                    }
                    
                    .checkin-details p {
                        color: #555555;
                        font-size: 20px;
                        line-height: 1.6;
                        text-align: center; 
                    }
                    
                    .footer {
                        text-align: center;
                        margin-top: 20px;
                        color: #fdfbfb;
                    }
            
                    /* Background Image */
                    .container {
                        background: url('${imageUrl}') no-repeat center center;
                        background-size: cover;
                    }
            
                    /* Animation */
                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                        }
                        to {
                            opacity: 1;
                        }
                    }
            
                    .animated {
                        animation: fadeIn 1s ease-in-out;
                    }
                </style>
            </head>
            <body>
                <div class="container animated" style="background: url('${imageUrl}') no-repeat center center; background-size: cover;">
                    <div class="container animated">
                        <div class="header">
                            <h1>Welcome to Our Hotel!</h1>
                            <p><h2><strong>We are excited to welcome you to our hotel. Your check-in is successful!</strong></h2></p>
                        </div>
                        <div class="checkin-details">
                            <h2>Check-in Details</h2>
                            <p><strong>User Email:</strong> ${userEmail}</p>
                            <p><strong>Room Number:</strong> ${roomNumber}</p>
                            <p><strong>Your Secret Key:</strong> ${secretKey}</p>
                            <p><strong>Enjoy your stay with us!</strong></p>
                        </div>
                        <div class="footer">
                            <p><h2><strong>Best regards,</strong></h2></p>
                            <p><h2><strong>The Hotel Team</strong></h2></p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `;
    }

    static checkoutRequest(checkout_amount, url){
        // const imageUrl = 'https://cdn.pixabay.com/photo/2017/07/21/23/57/concert-2527495_1280.jpg';
        const imageUrl = 'https://img.freepik.com/premium-photo/blurry-outside-front-luxury-hotel-building-with-soft-light-blurred-image-city-street-night-england_39190-453.jpg';
    return `


    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>You're Invited!</title>
        <style>
            /* Reset default styles */
            body, h1, p {
                margin: 0;
                padding: 0;
            }
            
            body {
                font-family: Arial, sans-serif;
                background-color: #f5eded;
            }
            
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0px 2px 6px rgba(255, 255, 255, 0.938);
                position: relative;
            }
            
            .header {
                text-align: center;
                color:#f1eaea;
                margin-bottom: 20px;
            }
            
            .header h1 {
                color: #ffffff;
            }
            
            .invitation-details {
                padding: 20px;
                background-color: rgba(255, 255, 255, 0.9);
                position: relative;
                overflow: hidden;
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(100px);
            }
            
            .invitation-details h2 {
                color: #2c3e50;
                margin-bottom: 10px;
                font-size: 28px;
                text-align: center; 
            }
            
            .invitation-details p {
                color: #555555;
                font-size: 20px;
                line-height: 1.6;
                text-align: center; 
            }
            
            .footer {
                text-align: center;
                margin-top: 20px;
                color: #fdfbfb;
            }
    
            /* Background Image */
            .container {
                background: url('../../../../Downloads/party.jpg') no-repeat center center;
                background-size: cover;
            }
    
            /* Animation */
            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
    
            .animated {
                animation: fadeIn 1s ease-in-out;
            }
</style>
</head>
<body>
<div class="container animated" style="background: url('${imageUrl}') no-repeat center center; background-size: cover;">
<div class="container animated">
    <div class="header">
        <h1>CheckOut link</h1>
        <p><h2><strong>Kindly pay the checkout amount</strong></h2></p>
    </div>
    <div class="invitation-details">
        <h2>Checkout Details</h2>
        <p><strong>Kindly pay the checkout amount from the below link</p>
        <p><strong>Payable amount: ${checkout_amount} INR </strong></p>
        <a class="confirmation-button" href="${url}" target="_blank">Pay Checkout</a>
    </div>
    <div class="footer">
        <p><h2><strong>If you have any questions, please contact us at amvlit44@gmail.com</strong></h2></p>
    </div>
</div>
</body>
</html>

    `;
}

static checkoutBill(checkin_id, payment_id){
    // const imageUrl = 'https://cdn.pixabay.com/photo/2017/07/21/23/57/concert-2527495_1280.jpg';
    const imageUrl = 'https://img.freepik.com/premium-photo/blurry-outside-front-luxury-hotel-building-with-soft-light-blurred-image-city-street-night-england_39190-453.jpg';
return `


<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>You're Invited!</title>
    <style>
        /* Reset default styles */
        body, h1, p {
            margin: 0;
            padding: 0;
        }
        
        body {
            font-family: Arial, sans-serif;
            background-color: #f5eded;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0px 2px 6px rgba(255, 255, 255, 0.938);
            position: relative;
        }
        
        .header {
            text-align: center;
            color:#f1eaea;
            margin-bottom: 20px;
        }
        
        .header h1 {
            color: #ffffff;
        }
        
        .invitation-details {
            padding: 20px;
            background-color: rgba(255, 255, 255, 0.9);
            position: relative;
            overflow: hidden;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(100px);
        }
        
        .invitation-details h2 {
            color: #2c3e50;
            margin-bottom: 10px;
            font-size: 28px;
            text-align: center; 
        }
        
        .invitation-details p {
            color: #555555;
            font-size: 20px;
            line-height: 1.6;
            text-align: center; 
        }
        
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #fdfbfb;
        }

        /* Background Image */
        .container {
            background: url('../../../../Downloads/party.jpg') no-repeat center center;
            background-size: cover;
        }

        /* Animation */
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        .animated {
            animation: fadeIn 1s ease-in-out;
        }
</style>
</head>
<body>
<div class="container animated" style="background: url('${imageUrl}') background-size: cover;">
<div class="container animated">
<div class="header">
    <h1>Payment Successful</h1>
    <p><h2><strong>Below is the bill of your payment</strong></h2></p>
</div>
<div class="invitation-details">
    <h2>Bill Details</h2>
    <p><strong> checin ID: ${checkin_id} </strong></p>
    <P><strong> payment ID : ${payment_id} </strong></p>
    <p><strong>Thank you for your visit we hope to see you agin</p>
</div>
<div class="footer">
    <p><h2><strong>If you have any questions, please contact us at amvlit44@gmail.com</strong></h2></p>
</div>
</div>
</body>
</html>

`;
}

static declineBill(checkin_id, payment_id){
    // const imageUrl = 'https://cdn.pixabay.com/photo/2017/07/21/23/57/concert-2527495_1280.jpg';
    const imageUrl = 'https://img.freepik.com/premium-photo/blurry-outside-front-luxury-hotel-building-with-soft-light-blurred-image-city-street-night-england_39190-453.jpg';
return `


<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>You're Invited!</title>
    <style>
        /* Reset default styles */
        body, h1, p {
            margin: 0;
            padding: 0;
        }
        
        body {
            font-family: Arial, sans-serif;
            background-color: #f5eded;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0px 2px 6px rgba(255, 255, 255, 0.938);
            position: relative;
        }
        
        .header {
            text-align: center;
            color:#f1eaea;
            margin-bottom: 20px;
        }
        
        .header h1 {
            color: #ffffff;
        }
        
        .invitation-details {
            padding: 20px;
            background-color: rgba(255, 255, 255, 0.9);
            position: relative;
            overflow: hidden;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(100px);
        }
        
        .invitation-details h2 {
            color: #2c3e50;
            margin-bottom: 10px;
            font-size: 28px;
            text-align: center; 
        }
        
        .invitation-details p {
            color: #555555;
            font-size: 20px;
            line-height: 1.6;
            text-align: center; 
        }
        
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #fdfbfb;
        }

        /* Background Image */
        .container {
            background: url('../../../../Downloads/party.jpg') no-repeat center center;
            background-size: cover;
        }

        /* Animation */
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        .animated {
            animation: fadeIn 1s ease-in-out;
        }
</style>
</head>
<body>
<div class="container animated" style="background: url('${imageUrl}') background-size: cover;">
<div class="container animated">
<div class="header">
    <h1>Payment Denied</h1>
    <p><h2><strong>Below is the payment status</strong></h2></p>
</div>
<div class="invitation-details">
    <h2>Payment Details</h2>
    <p><strong> checkin ID: ${checkin_id} </strong></p>
    <P><strong> payment ID : ${payment_id} </strong></p>
    <p><strong>Your payment has been declined kindly pay again</p>
</div>
<div class="footer">
    <p><h2><strong>If you have any questions, please contact us at amvlit44@gmail.com</strong></h2></p>
</div>
</div>
</body>
</html>

`;
}
}
