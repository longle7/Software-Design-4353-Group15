const handlers = require( './handlers' )

test( 'testing home page', () => {
const req = {},
res = { render: jest.fn() }
handlers.home( req, res )
expect( res.render.mock.calls[ 0 ][ 0 ] ).toBe( './index' )
})

test( 'testing home page that is not found', () => {
const req = {},
res = { render: jest.fn() }
handlers.notFound( req, res )
expect( res.render.mock.calls[ 0 ][ 0 ] ).toBe( '404' )
})




