const checkAuthenticated = require("./user");



test("makes sure that the user is authenticated", () => {
    req.isAuthenticated = false
    expect(checkAuthenticated(false,res,next)).toBe(res.redirect('/signup'))
    req
})