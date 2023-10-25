import express from 'express';
import {  addUser, getUsers, getUserById, editUser, deleteUser } from '../controller/user-controller.js';
import auth from '../middlewares/auth.js'; 

const router = express.Router();

router.get('/', getUsers);
router.post('/add', auth, addUser);
router.get('/:id', getUserById);
router.put('/:id', auth,editUser);
router.delete('/:id',auth,deleteUser);

export default router;