import { Router, application } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import {
  createBudget,
  getBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  createSponsorship,
  getAllSponsorships,
  getSponsorshipById,
  updateSponsorship,
  deleteSponsorship,
} from "../controllers/budgetAndSponsorshipTracking.controller.js"
import { upload } from "../middlewares/multer.middleware.js"
const router = Router()
router.use(verifyJWT)
router.route("/budgets").post(createBudget).get(getBudgets) // POST /api/budgets (create) and GET /api/budgets (read all)
router
  .route("/budgets/:id")
  .get(getBudgetById)
  .put(updateBudget)
  .delete(deleteBudget) // GET /api/budgets/:id (read one), PUT /api/budgets/:id (update), DELETE /api/budgets/:id (delete)

router
  .route("/expense")
  .post(upload.fields([{ name: "proofImage", maxCount: 1 }]), createExpense)
  .get(getAllExpenses)

router
  .route("/expense/:id")
  .get(getExpenseById)
  .put(upload.fields([{ name: "proofImage", maxCount: 1 }]), updateExpense) //compulsory to update image proof
  .delete(deleteExpense)

router.post(
  "/sponsorship",
  verifyJWT,
  upload.single("agreementDocument"),
  createSponsorship
) // Create

router.get("/sponsorship", getAllSponsorships) // Get all (public)

router.get("/sponsorship/:id", getSponsorshipById) // Get by ID (public)
router.put(
  "/sponsorship/:id",
  verifyJWT,
  upload.single("agreementDocument"),
  updateSponsorship
) // Update
router.delete("/sponsorship/:id", verifyJWT, deleteSponsorship) // Delete

// router.post('/', verifyJWT, authorize(['admin']), upload.single('agreementDocument'), createSponsorship); // Create
// router.get('/', getAllSponsorships); // Get all (public)
// router.get('/:id', getSponsorshipById); // Get by ID (public)
// router.put('/:id', verifyJWT, authorize(['admin']), upload.single('agreementDocument'), updateSponsorship); // Update
// router.delete('/:id', verifyJWT, authorize(['admin']), deleteSponsorship); // Delete

export default router
