import prisma from "../config/prisma.js";

export const getDashboardStats = async (req, res) => {
  try {
    // Get all contributors
    const contributors = await prisma.contributor.findMany();

    const totalContributors = contributors.length;

    const totalPledged = contributors.reduce(
      (sum, contributor) => sum + contributor.pledgedAmount,
      0
    );

    const totalCollected = contributors.reduce(
      (sum, contributor) => sum + contributor.paidAmount,
      0
    );

    const remainingAmount = totalPledged - totalCollected;

    const paidContributors = contributors.filter(
      (contributor) => contributor.status === "Paid"
    ).length;

    const partialContributors = contributors.filter(
      (contributor) => contributor.status === "Partial"
    ).length;

    const pendingContributors = contributors.filter(
      (contributor) => contributor.status === "Pending"
    ).length;

    res.json({
      totalContributors,
      totalPledged,
      totalCollected,
      remainingAmount,
      paidContributors,
      partialContributors,
      pendingContributors,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to load dashboard statistics",
    });
  }
};