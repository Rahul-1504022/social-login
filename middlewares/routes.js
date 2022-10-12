const authGoogleRouter = require('../routers/authGoogleRouter');

module.exports = (app) => {
    app.use('/auth/google', authGoogleRouter);
}