export default {
    auth: {
        token: null,
        loginPending: false,
        signUpPending: false,
        signUpFailed: false,
        loginFailed: false,
        isEmailAvailable: true
    },
    dashboard: {
        profilePending: false,
        profileLoadFailed: false,
        profile: {
            id: null,
            firstName: null,
            lastName: null,
            phoneNumber: null,
            bio: null,
            email: null,
            company: null,
            profilePicture: null,
            title: null,
            listings: []
        }
    }
  };