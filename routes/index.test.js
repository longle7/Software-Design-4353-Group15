const index = require("./index");

test('testing home page', () => {
    const   req = {},
            res = { render: jest.fn() }
    index.home( req, res )
    expect( res.render.mock.calls[0][0]).toBe('home')
})
