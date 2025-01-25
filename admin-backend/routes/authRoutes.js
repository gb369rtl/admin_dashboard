const express = require('express');
const auth = require('../controllers/auth');
const { setupMFA } = require('../controllers/MFA/MFA');
const { confirmMFA } = require('../controllers/MFA/confirmMFA');
const {authenticate} = require('../middlewares/authMiddleware');
// const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();


router.post('/edit/:id', auth.editAdmin);
router.get('/delete/:id', auth.deleteAdmin);
router.get('/get', auth.getAdmins);
router.post('/chpass', auth.changePassword);

router.post('/create', auth.createAdmin);
router.post('/sendOtp', auth.sendOTP);

router.post('/login', auth.loginAdmin);
router.post('/mfa', auth.verifyMFA);
router.post('/setupMFA',authenticate, setupMFA);
router.post('/verify-mfa-setup',authenticate, confirmMFA);

router.post("/logout", auth.logoutAdmin);

const {
    getRolePermissions,
    updateRolePermissions,
    deleteRole,
    assignRoleToAdmin,
    getAdminRoleAndPermissions,
    getAllRoles,
  } = require('../controllers/RoleController');
  
router.get('/roles', getAllRoles); // Fetch aall role
  router.get('/roles/:role', getRolePermissions); // Fetch all roles
router.post('/roles', updateRolePermissions); // Create or update a role
router.delete('/roles/:role', deleteRole); // Delete a role
router.post('/roles/assign', assignRoleToAdmin); // Assign a role to an admin
router.get('/admin/:adminId/role', getAdminRoleAndPermissions); // Fetch an admin's role



// router.post('/setup-mfa', verifyToken, authController.setupMFA);

module.exports = router;
