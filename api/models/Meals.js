/**
 * Meals.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    orderName:{
      type:'string'
    },
    orderType:{
      type:'string'
    },
    orderCount:{
      type: 'string'
    }
  },
};

