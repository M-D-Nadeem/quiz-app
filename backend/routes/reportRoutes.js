const router =  require("express").Router()
const {addReport,getAllAttempts,getAllAttemptsByUser, getInfoGrouped} = require("../controllers/reportController")
const authMiddleware = require("../middlewares/authMiddleware")


router.post("/addReport",authMiddleware,addReport)
router.post("/getAllAttempts",authMiddleware,getAllAttempts)
router.get("/getAllAttemptsByUser",authMiddleware,getAllAttemptsByUser)
router.get("/getinfogroup",authMiddleware,getInfoGrouped)

module.exports = router;