// 7. Transparent College Budget & Sponsorship Tracking
// ● All college sponsorships and budgets (event funds, department budgets) are public.
// ● Expense proofs (bills, receipts, images) must be uploaded for verifi cation.
// ● Similar transparency for mess budgets managed by students.

import {
  Sponsorship,
  Budget,
  Expense,
} from "../models/budgetAndSponsorship.model.js"
const sponsorshipController = {
  getAllSponsorships: async (req, res) => {
    try {
      const sponsorships = await Sponsorship.find().populate("approvedBy")
      res.json(sponsorships)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server error" })
    }
  },

  getSponsorshipById: async (req, res) => {
    try {
      const sponsorship = await Sponsorship.findById(req.params.id).populate(
        "approvedBy"
      )
      if (!sponsorship) {
        return res.status(404).json({ message: "Sponsorship not found" })
      }
      res.json(sponsorship)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server error" })
    }
  },

  createSponsorship: async (req, res) => {
    try {
      const newSponsorship = new Sponsorship(req.body)
      await newSponsorship.save()
      res.status(201).json(newSponsorship)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server error" })
    }
  },

  updateSponsorship: async (req, res) => {
    try {
      const updatedSponsorship = await Sponsorship.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true } // Important: runValidators to enforce schema validation
      ).populate("approvedBy")
      if (!updatedSponsorship) {
        return res.status(404).json({ message: "Sponsorship not found" })
      }
      res.json(updatedSponsorship)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server error" })
    }
  },

  deleteSponsorship: async (req, res) => {
    try {
      const deletedSponsorship = await Sponsorship.findByIdAndDelete(
        req.params.id
      )
      if (!deletedSponsorship) {
        return res.status(404).json({ message: "Sponsorship not found" })
      }
      res.status(204).end() // 204 No Content for successful deletion
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server error" })
    }
  },
}

const expenseController = {
  addExpense: async (req, res) => {
    try {
      const { amount, description, date, category, budget } = req.body
      let proofImage = null
      if (req.file) {
        // Upload to S3 (or local storage)
        const s3Result = await uploadToS3(req.file) // Make sure uploadToS3 is defined
        proofImage = s3Result.Location // Get the URL
      }

      const newExpense = new Expense({
        amount,
        description,
        date,
        category,
        proofImage,
        budget,
        uploadedBy: req.user._id, // User from auth middleware
      })
      await newExpense.save()
      res.status(201).json(newExpense)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server error" })
    }
  },

  getAllExpenses: async (req, res) => {
    try {
      const expenses = await Expense.find().populate("budget uploadedBy")
      res.json(expenses)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server error" })
    }
  },

  getExpenseById: async (req, res) => {
    try {
      const expense = await Expense.findById(req.params.id).populate(
        "budget uploadedBy"
      )
      if (!expense) {
        return res.status(404).json({ message: "Expense not found" })
      }
      res.json(expense)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server error" })
    }
  },

  updateExpense: async (req, res) => {
    try {
      const { amount, description, date, category, budget } = req.body
      let proofImage = null

      if (req.file) {
        const s3Result = await uploadToS3(req.file)
        proofImage = s3Result.Location
      }

      const updatedExpense = await Expense.findByIdAndUpdate(
        req.params.id,
        { amount, description, date, category, budget, proofImage }, // Update with req.body and proofImage
        { new: true, runValidators: true }
      ).populate("budget uploadedBy")

      if (!updatedExpense) {
        return res.status(404).json({ message: "Expense not found" })
      }
      res.json(updatedExpense)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server error" })
    }
  },

  deleteExpense: async (req, res) => {
    try {
      const deletedExpense = await Expense.findByIdAndDelete(req.params.id)
      if (!deletedExpense) {
        return res.status(404).json({ message: "Expense not found" })
      }
      res.status(204).end()
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server error" })
    }
  },
}

const budgetController = {
  getAllBudgets: async (req, res) => {
    try {
      const budgets = await Budget.find().populate("department event mess")
      res.json(budgets)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server error" })
    }
  },

  getBudgetById: async (req, res) => {
    try {
      const budget = await Budget.findById(req.params.id).populate(
        "department event mess"
      )
      if (!budget) {
        return res.status(404).json({ message: "Budget not found" })
      }
      res.json(budget)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server error" })
    }
  },

  createBudget: async (req, res) => {
    try {
      const newBudget = new Budget(req.body)
      const savedBudget = await newBudget.save() // Save and get the saved document
      res.status(201).json(savedBudget) // Send the saved document in the response
    } catch (error) {
      console.error(error)
      if (error.name === "ValidationError") {
        // Check for Mongoose validation errors
        return res.status(400).json({ message: error.message }) // Send validation error
      }
      res.status(500).json({ message: "Server error" })
    }
  },

  updateBudget: async (req, res) => {
    try {
      const updatedBudget = await Budget.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true } // Run validators!
      ).populate("department event mess") // Populate after update

      if (!updatedBudget) {
        return res.status(404).json({ message: "Budget not found" })
      }
      res.json(updatedBudget)
    } catch (error) {
      console.error(error)
      if (error.name === "ValidationError") {
        return res.status(400).json({ message: error.message })
      }
      res.status(500).json({ message: "Server error" })
    }
  },

  deleteBudget: async (req, res) => {
    try {
      const deletedBudget = await Budget.findByIdAndDelete(req.params.id)
      if (!deletedBudget) {
        return res.status(404).json({ message: "Budget not found" })
      }
      await Expense.deleteMany({ budget: deletedBudget._id }) // Delete associated expenses
      res.status(204).end()
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server error" })
    }
  },
}

import { asyncHandler } from "../utils/utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/utils/cloudinary.js"

const createBudget = asyncHandler(async (req, res) => {
  try {
    const { category, allocatedAmount, department, event, mess, general } =
      req.body

    const newBudget = new Budget({
      category,
      allocatedAmount,
      department,
      event,
      mess,
      general,
    })

    const createdBudget = await newBudget.save()
    res.status(201).json({ message: "Budget created", createdBudget }) // 201 Created status code
  } catch (error) {
    res.status(400).json({ message: error.message }) // Or a more generic error message
  }
})

const getBudgets = asyncHandler(async (req, res) => {
  try {
    const budgets = await Budget.find() // Find all budgets
    res.json({ message: "Budgets fetch successfully", budgets })
  } catch (error) {
    res.status(500).json({ message: error.message }) // 500 Internal Server Error
  }
})

const getBudgetById = asyncHandler(async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id)

    if (budget) {
      res.json({ message: "Budget fetch successfully", budget })
    } else {
      res.status(404).json({ message: "Budget not found" }) // 404 Not Found
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

const updateBudget = asyncHandler(async (req, res) => {
  try {
    const { category, allocatedAmount, department, event, mess, general } =
      req.body

    const budget = await Budget.findById(req.params.id)

    if (budget) {
      budget.category = category || budget.category // Only update if a new value is provided
      budget.allocatedAmount = allocatedAmount || budget.allocatedAmount
      budget.department = department || budget.department
      budget.event = event || budget.event
      budget.mess = mess || budget.mess
      budget.general = general || budget.general

      const updatedBudget = await budget.save()
      res.json({ message: "Budget updated Successfully", updatedBudget })
    } else {
      res.status(404).json({ message: "Budget not found" })
    }
  } catch (error) {
    res.status(400).json({ message: error.message }) // Or a more specific error message
  }
})

const deleteBudget = asyncHandler(async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id)

    if (budget) {
      await Budget.findByIdAndDelete(req.params.id) // Or Budget.findByIdAndDelete(req.params.id) if you prefer
      res.json({ message: "Budget removed" })
    } else {
      res.status(404).json({ message: "Budget not found" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

const createExpense = async (req, res) => {
  try {
    const { amount, description, date, category, budget } = req.body
    let proofImage = req.files?.proofImage[0]?.path
    if (!proofImage) {
      throw new Error("Proof image is required")
    }
    let imageUrl
    if (proofImage) {
      imageUrl = await uploadOnCloudinary(proofImage)
    }

    const newExpense = new Expense({
      amount,
      description,
      date,
      category,
      proofImage: imageUrl?.url || "",
      budget,
      uploadedBy: req.user._id, // From authentication middleware
    })

    const savedExpense = await newExpense.save()
    res.status(201).json({ message: "Expense created", savedExpense })
  } catch (error) {
    console.error("Error creating expense:", error)
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message })
    }
    res.status(500).json({ message: "Server error" })
  }
}

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 }) // Sort by date descending (newest first)

    res.status(200).json({ message: "Expenses fetched successfully", expenses })
  } catch (error) {
    console.error("Error getting expenses:", error)
    res.status(500).json({ message: "Server error" })
  }
}

const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id)

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" })
    }
    res.status(200).json({ message: " Expense fetched successfully", expense })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

const updateExpense = async (req, res) => {
  try {
    const { amount, description, date, category } = req.body

    let proofImg = req.files?.proofImage[0]?.path
    let imgUrl
    if (proofImg) {
      imgUrl = await uploadOnCloudinary(proofImg)
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      { amount, description, date, category, proofImage: imgUrl?.url || "" },
      { new: true, runValidators: true }
    )

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" })
    }
    res.json({ message: "Expense updated successfully", updatedExpense })
  } catch (error) {
    console.error("Error updating expense:", error)
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message })
    }
    res.status(500).json({ message: "Server error" })
  }
}

const deleteExpense = async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id)
    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" })
    }
    res
      .status(200)
      .json({ message: "Expense deleted successfully", deletedExpense }) // 204 No Content
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

const createSponsorship= async (req, res) => {
    try {
        const { sponsorName, amount, purpose } = req.body;
        let agreementDocument = req.user.agreementDocument;

        if (agreementDocument) { 
            agreementDocument = await uploadOnCloudinary(agreementDocument);
        }

        const newSponsorship = new Sponsorship({
            sponsorName,
            amount,
            purpose,
            agreementDocument: agreementDocument?.url || "",
            approvedBy: req.user._id, // From auth middleware
        });

        const savedSponsorship = await newSponsorship.save();
        res.status(201).json({ message: "Sponsorship created", savedSponsorship});

    } catch (error) {
        console.error("Error creating sponsorship:", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Server error' });
    }
}

const getAllSponsorships= async (req, res) => {
    try {
        const sponsorships = await Sponsorship.find().populate('approvedBy', '-password'); // Populate and exclude password
        res.json(sponsorships);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const getSponsorshipById=async (req, res) => {
    try {
        const sponsorship = await Sponsorship.findById(req.params.id).populate('approvedBy', '-password');
        if (!sponsorship) {
            return res.status(404).json({ message: 'Sponsorship not found' });
        }
        res.json(sponsorship);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const updateSponsorship= async (req, res) => {
    try {
        const { sponsorName, amount, purpose } = req.body;
        let agreementDocument = req.user.agreementDocument;

        if (agreementDocument) {
            agreementDocument = await uploadOnCloudinary(agreementDocument);
        }

        const updatedSponsorship = await Sponsorship.findByIdAndUpdate(
            req.params.id,
            { sponsorName, amount, purpose, agreementDocument:agreementDocument?.url || "" }, // Update fields
            { new: true, runValidators: true }
        ).populate('approvedBy', '-password');

        if (!updatedSponsorship) {
            return res.status(404).json({ message: 'Sponsorship not found' });
        }
        res.json(updatedSponsorship);

    } catch (error) {
        console.error("Error updating sponsorship:", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Server error' });
    }
}

const deleteSponsorship=async (req, res) => {
    try {
        const deletedSponsorship = await Sponsorship.findByIdAndDelete(req.params.id);
        if (!deletedSponsorship) {
            return res.status(404).json({ message: 'Sponsorship not found' });
        }
        res.status(204).end(); // 204 No Content
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}


export {
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
  deleteSponsorship
}
