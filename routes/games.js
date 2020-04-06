const router = require('express').Router();
const { startNewGame, handleLeftClick, handleFlagPlacement, 
    handleClearance } = require('../controllers/games');

// Create new game
// @post game mode parameters
router.post('/new_game', startNewGame);

// Check field
// @post field ID 
router.post('/handle_left_click', handleLeftClick);

// Set flag
// @post field ID
router.post('/handle_right_click', handleFlagPlacement);

// Clear fields around the selected one
// @post field ID
router.post('/handle_clearance', handleClearance);


module.exports = router;