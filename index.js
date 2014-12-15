'use strict';

var Promise = require('bluebird');

module.exports = increment;

var sort = [
	[ '_id', 1 ],
];

var modify = {
	$inc: { count: 1 },
};

var options = {
	new: true,
	upsert: true,
	fields: {
		count: 1,
	},
};

function increment( collection, name, cb ) {
	return Promise
		.join(collection, name)
		.spread(function( collection, name ){
			return new Promise(function( resolve, reject ){
				collection.findAndModify({
					_id: name,
				}, sort, modify, options, function( err, doc ){
					err && reject(err) || resolve(doc.count);
				});
			});
		})
		.nodeify(cb);
}
