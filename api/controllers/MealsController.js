const axios = require('axios');
/**
 * MealsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  add: function (req, res) {
    res.view('add');
  },
  create: async function (req, res) {
    let data = {
      name: req.body.ordername,
      price: req.body.ordertype,
      imageUrl: req.body.imageUrl
    };
    let url = "http://localhost:3000/api/v1/products";
    let apiKey = Buffer.from("apikey-v2-1rtd1hybbnnqlgai4tlk02dex6ddga2p8o0raf3mh7gr" + ':' + "418499c556f4106f87b728121b0de2b6").toString('base64');
    let config = { headers: { 'Authorization': 'Basic ' + apiKey } };
    try {
      let status = await axios.post(url, data, config);
      res.redirect('/meals/list');
    } catch (error) {
      console.log(error);
    }
  },
  list: async function (req, res) {
    try {
      let url = "https://fbb91cc6-43c8-4eb0-8d8d-f20743a1a88a-bluemix.cloudantnosqldb.appdomain.cloud/products/_all_docs?include_docs=true";
      let apiKey = Buffer.from("apikey-v2-1rtd1hybbnnqlgai4tlk02dex6ddga2p8o0raf3mh7gr" + ':' + "418499c556f4106f87b728121b0de2b6").toString('base64');
      let config = { headers: { 'Authorization': 'Basic ' + apiKey } };
      let result = await axios.get(url, config);
      let orders = result.data.rows;
      res.view('list', { orders: orders });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
  edit: async function (req, res) {
    let id = req.query.id;
    let url = "https://fbb91cc6-43c8-4eb0-8d8d-f20743a1a88a-bluemix.cloudantnosqldb.appdomain.cloud/products/" + id;
    let apiKey = Buffer.from("apikey-v2-1rtd1hybbnnqlgai4tlk02dex6ddga2p8o0raf3mh7gr" + ':' + "418499c556f4106f87b728121b0de2b6").toString('base64');
    let config = { headers: { 'Authorization': 'Basic ' + apiKey } };
    try {
      let result = await axios.get(url, config);
      let order = result.data;
      res.view('edit', { order: order });
    } catch (error) {
      console.log(error);
    }
  },
  update: async function (req, res) {
    let id = req.query.id;
    let rev = await getRevId(id);
    let data = {
      name: req.body.ordername,
      price: req.body.ordertype,
      imageUrl: req.body.imageUrl
    };
    let url = "http://localhost:3000/api/v1/products/" + id + "?rev=" + rev;
    let apiKey = Buffer.from("apikey-v2-1rtd1hybbnnqlgai4tlk02dex6ddga2p8o0raf3mh7gr" + ':' + "418499c556f4106f87b728121b0de2b6").toString('base64');
    let config = { headers: { 'Authorization': 'Basic ' + apiKey } };
    try {
      let status = await axios.put(url, data, config);
      res.redirect('/meals/list');
      return false;
    } catch (error) {
      console.log(error);
    }
  },
  delete: async function (req, res) {
    let id = req.query.id;
    let rev = await getRevId(id);
    let url = "https://fbb91cc6-43c8-4eb0-8d8d-f20743a1a88a-bluemix.cloudantnosqldb.appdomain.cloud/products/" + id + "?rev=" + rev;
    let apiKey = Buffer.from("apikey-v2-1rtd1hybbnnqlgai4tlk02dex6ddga2p8o0raf3mh7gr" + ':' + "418499c556f4106f87b728121b0de2b6").toString('base64');
    let config = { headers: { 'Authorization': 'Basic ' + apiKey } };
    try {
      let status = await axios.delete(url, config);
      res.redirect('/meals/list');
      return false;
    } catch (error) {
      console.log(error);
    }
  }
};

async function getRevId(id) {
  let url = "https://fbb91cc6-43c8-4eb0-8d8d-f20743a1a88a-bluemix.cloudantnosqldb.appdomain.cloud/products/" + id;
  let apiKey = Buffer.from("apikey-v2-1rtd1hybbnnqlgai4tlk02dex6ddga2p8o0raf3mh7gr" + ':' + "418499c556f4106f87b728121b0de2b6").toString('base64');
  let config = { headers: { 'Authorization': 'Basic ' + apiKey } };
  let result = await axios.get(url, config);
  return result.data._rev;
}


