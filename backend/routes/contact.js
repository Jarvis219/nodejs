import express from "express";
const router = express.Router();
import {
    addContact,
    contactID,
    removeContact,
    listContact,
    readContact,
    updateContact
} from '../controllers/contactControllers';
import {
    userID
} from "../controllers/userControllers";
import {
    requireSignin,
    isAuth,
    isAdmin
} from "../controllers/auth";
router.post('/contacts', addContact);
router.delete('/contacts/:contactId/:userId', requireSignin, isAuth, isAdmin, removeContact);
router.get('/contacts', listContact);
router.get('/contacts/:contactId', readContact);
router.put('/contacts/:contactId/:userId', requireSignin, isAuth, isAdmin, updateContact);

router.param("contactId", contactID);
router.param('userId', userID);
module.exports = router;