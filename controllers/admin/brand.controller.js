const {
    Brand,
    validate
  
} = require('../../models/Brand');

exports.create = async (req, res) => {
    try {
        //  const { errors, isValid } = validateProfileInput(req.body);
        const {
            error
        } = validate(req.body);
        const errors = {};
        if (error) {
            for (let err of error.details) {
                errors[err.path[0]] = (err.message).replace(/"/g, "");
            }
        }
        if (error) return res.status(422).json({
            "statusCode": "422",
            "msg": "",
            "success": false,
            "response": {},
            errors
        });

        const brand = new Brand({
            brand_name: req.body.brand_name,
            brand_image: req.body.brand_image,
            serial_number:req.body.serial_number
        })

        await brand.save()
            .then(brand => res.json({
                "status": "200",
                "success": true,
                "msg": "brand is sucessfully created",
                "response": brand
            }))
    } catch (err) {
        return res.status(422).json({
            "statusCode": "422",
            "msg": "",
            "success": false,
            "user": {},
            "error": err.message
        });
    }
}

exports.getallbrand = async (req, res) => {
    const errors = {};

    Brand.find()   
         .then(brand => {
               if (!brand) {
                errors.nobrand = 'There are no document';
                return res.status(404).json({
                    "statuscode": "404",
                    "msg": "",
                    "success": true,
                    errors
                });
            }

            return res.status(200).json({
                statuscode: "200",
                "success": true,
                "msg": "brand fetched sucessfully",
                response: brand
            });
        })
        .catch(err => res.status(404).json({
            "statuscode": "200",
            "success": false,
            "msg" : 'There are no brand',
            "error": err.message
        }));
}

exports.brandbyid = async (req, res) => {
    const errors = {};

    Brand.findOne({
            _id: req.params.id
        })
      
        .then(brand => {
            if (!brand) {
                errors.nobrand = 'There is no document for this user';
                return res.status(404).json({
                    "status": "404",
                    "success": false,
                    errors
                });
            }
            return res.status(200).json({
                "status": "200",
                "success": true,
                "response": brand,
                "msg": "brand is fetched sucessfully",
            });
        })
        .catch(err => res.status(404).json({
            "status": "404",
            success: false,
            "error": err.message
        }));
}