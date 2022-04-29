const res = require('express/lib/response')


const {fortune} = require( './index' )
exports.home = ( req, res ) => res.render( './index' )
exports.notFound = ( req, res ) => res.render( '404' )
exports.errorServ = ( err, req, res, next) => res.render( '500' )

