
export const responseMessages = {
    internalServerError: 'Internal server error',
    roomNotExist: 'Room does not exist',
    roomNotAvailable: 'Room is not available',
    userNotExist: 'User does not exist',
    bookingIdNotFound: 'Booking ID not found in request',
    paymentIdNotFound: 'Payment ID not found in request',
    bookingNotFound: 'Booking not found',
    bookingNotStored: 'Error saving booking',
    userNotFound: 'User not found',
    bookingSuccess: 'Booking accepted successfully',
    bookingDeniedSuccess: 'Booking Rejected',
    notValidDate: 'Not a valid date',
    greaterBookingDate: 'Booking date must be greater than the checkIN date.',
    greaterCheckoutDate: 'Checkout date must be greater than the checkin date.'
};

export const responseStatus = {
    internalServerError: 500,
    badRequest: 400,
    created: 201,
    notFound: 404,
    success: 200
};
