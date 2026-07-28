import express from "express";

import {
  getContributors,
  createContributor,
  updateContributor,
  deleteContributor,
} from "../controllers/contributorController.js";

const router = express.Router();

router.get("/", getContributors);

router.post("/", createContributor);

router.put("/:id", updateContributor);

router.delete("/:id", deleteContributor);

export default router;