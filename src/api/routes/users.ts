import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();
const userController = new UserController();

// User routes
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// User profile routes
router.get('/:id/profile', userController.getUserProfile);
router.put('/:id/profile', userController.updateUserProfile);

// User preferences routes
router.get('/:id/preferences', userController.getUserPreferences);
router.put('/:id/preferences', userController.updateUserPreferences);

export default router; 