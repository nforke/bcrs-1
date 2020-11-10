/**
 * =====================================================================
 * Title: Bobs Computer Repair Shop
 * Author: Nicole Forke, Janet Blohn, and Joann Saeou
 * Date: 11/04/2020
 * Description: Role model
 * =====================================================================
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let roleSchema = new Schema({ // mapping the schema
        text: { type: String, unique: true },
        isDisabled: {type: Boolean, default: false}
    }, { collection: 'roles', // implicitly specifying the collection we're connecting to
    versionKey: false  // Don't create a version key on new records
        });

module.exports = mongoose.model('Role ', roleSchema);
