
export const responseMessages = {
    success: 'Success',
    internalServerError: 'Internal server error',
    unauthorized: 'Unauthorized',
    emailError: ' Email already registered',
    mobError: 'Mobile already registered',
    userAlreadyAuthorized: 'User is already authorized',
    UserNotAuthorized: 'User is not authorized',
    userDeleted: 'User deleted',
    userNotFound: 'User not found or confirmation token expired.' ,
    credentials: 'Invalid user credentials',
    notLoggedIn: 'User is not logged in',
    loginSuccessful: 'Login Successful',
    logoutSuccessful: 'Logout successful',
    confirmedSuccessfully: 'Account confirmed successfuly',
    emailNotFound: 'Email not found',
    notAllowed: "Not allowed",
    userDeactivated: 'User deactivated successfully',
    errorUserDeactivated: "Error deactivating user",
    userUpdated: "User updated successfully",
    errorUpdatingUser: "Error updating user",
    passwordResetMail: 'Password reset email sent successfully.',
    errorPasswordResetMail: 'Error sending password reset email.',
    passwordResetSuccess: 'Password reset successful.',
    notReset: 'Error resetting password.',
    tokenNAN: 'token is not correct'
};

export const responseStatus = {
    success: 200,
    unauthorized: 401,
    conflict: 409,
    internalServerError: 500,
    notFound: 404,
    badRequest: 400,
    forbidden: 403
};
