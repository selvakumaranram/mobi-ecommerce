const express = require('express');
const router = express.Router();
const brandcontroller = require('../../controllers/admin/brand.controller');

router.post(
    '/create',    
    brandcontroller.create
  );
  
  router.get(
    '/brandbyid/:id',
    brandcontroller.brandbyid
  );
  router.get(
    '/getallbrand',
    brandcontroller.getallbrand
  );
  
  
  module.exports = router;