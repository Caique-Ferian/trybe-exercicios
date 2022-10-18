const fakeSuccess = { code: 200, token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    .eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ
    .XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc` };

const fakeError = { code: 401, message: 'Incorrect email or password' };

const fieldError = { code: 400, message: 'All fields must be filled' };

const fakeUser = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

const fakeLogin = { email: 'admin@admin.com', password: 'secret_admin' };

export { fakeUser, fakeSuccess, fakeError, fieldError, fakeLogin };
