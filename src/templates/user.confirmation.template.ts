export class UserTemplates {
    static generateConfirmationEmailTemplate(confirmationLink) {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Account Confirmation</title>
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
                    Account Confirmation
                </div>
                <div class="content">
                    <p class="message">Thank you for signing up. Please confirm your account by clicking the link below:</p>
                    <a class="confirmation-button" href="${confirmationLink}" target="_blank">Confirm Account</a>
                    <p class="thank-you">Thank you for choosing us!</p>
                </div>
            </div>
        </body>
        </html> 
        `;
    }
    
    static resetPassword(confirmationLink) {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Account Confirmation</title>
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
                    Password Reset
                </div>
                <div class="content">
                    <p class="message">Your Forget password token is given below:</p>
                    <a class= "message"> ${confirmationLink}</a>
                    <p class="thank-you">Thank you for choosing us!</p>
                </div>
            </div>
        </body>
        </html> 
        `;
    }
    
    
    }