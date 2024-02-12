const express = require("express") ;
const router = express.Router();
const items = require("../public/items.json")
const formidable = require("formidable");
const fs = require("fs") 

router.get('/', (req , res, next) => {
    try {
        return res.json(items);
    } catch(err) {
        next(err);
    }
    });

    router.post('/', (req , res, next) => {
        try {
            const form = new formidable.Incomingform({
                allowEmptyFiles : true,
                minFileSize :0
                
            })
            const currentItems = items
            form.parse(req, (err,fields, files) => {
                if (err) {
                    next(err);
                    return;
                }
                const newObject ={}
                for (const key in fields) {
                    newObject[key] = fields [key] [0] ;
                
                }
                currentItems.push(newObject)
                fs.writeFile('.public/items.json', JSON.stringify(currentItems), function(err) {
                    if (err) {
                        next(err)
                        return
                    }
                });
                return res.json({fields, files, currentItems});
            });
        } catch (err) {
            next(err)
            return
        }

    });

    module.exports = router;
            
        