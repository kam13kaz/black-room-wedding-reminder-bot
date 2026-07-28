import prisma from "../config/prisma.js";

export const getContributors = async (req, res) => {
  try {
    const contributors = await prisma.contributor.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(contributors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch contributors" });
  }
};

export const createContributor = async (req, res) => {
  try {
    const { fullName, phone, pledgedAmount } = req.body;

    // Validation
    if (!fullName || !phone || pledgedAmount == null) {
      return res.status(400).json({
        message: "Full name, phone and pledged amount are required.",
      });
    }

    const contributor = await prisma.contributor.create({
      data: {
        fullName,
        phone,
        pledgedAmount: Number(pledgedAmount),
      },
    });

    res.status(201).json({
      message: "Contributor added successfully",
      contributor,
    });
  } catch (error) {
    console.error(error);

    // Handle duplicate phone numbers
    if (error.code === "P2002") {
      return res.status(409).json({
        message: "A contributor with this phone number already exists.",
      });
    }

    res.status(500).json({
      message: "Failed to create contributor",
    });
  }
};

export const updateContributor = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const {
      fullName,
      phone,
      pledgedAmount,
      paidAmount,
      status,
    } = req.body;

    const contributor = await prisma.contributor.update({
      where: { id },
      data: {
        fullName,
        phone,
        pledgedAmount,
        paidAmount,
        status,
      },
    });

    res.json({
      message: "Contributor updated successfully",
      contributor,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update contributor",
    });
  }
};

export const deleteContributor = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.contributor.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Contributor deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete contributor",
    });
  }
};