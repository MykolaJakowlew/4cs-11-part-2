// let a = [1, 23, 4];
// let b = [5, ...a]; // => [5, 1, 23, 4]
// let c = [6, a]; // => [6, [1, 23, 4]]
//
// a = { g: 67, h: { y: 67 } };
// b = { f: 12, a }; // => { f: 12, a: { g: 67 } }
// c = { j: 56, ...a }; // => { j: 56, g: 67, h: { y: 67 } }

module.exports = {
 ...require('./tables'), // => { Tables }
 ...require('./orders'), // => { Orders }
 ...require('./dishes'), // => { Dishes } 
 ...require('./waiters') // => { Waiters }
}; // => { Dishes, Waiters, Orders, Tables }