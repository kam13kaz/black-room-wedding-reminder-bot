import prisma from "../config/prisma.js";

export const createPayment = async (req, res) => {
  try {
    const { contributorId, amount, notes } = req.body;

    // 1. Create payment
    const payment = await prisma.payment.create({
      data: {
        contributorId: Number(contributorId),
        amount: Number(amount),
        notes,
      },
    });

    // 2. Get contributor
    const contributor = await prisma.contributor.findUnique({
      where: {
        id: Number(contributorId),
      },
    });

    const newPaidAmount =
      contributor.paidAmount + Number(amount);

    let status = "Pending";

    if (newPaidAmount > 0) {
      status = "Partial";
    }

    if (newPaidAmount >= contributor.pledgedAmount) {
      status = "Paid";
    }

    // 3. Update contributor
    await prisma.contributor.update({
      where: {
        id: contributor.id,
      },
      data: {
        paidAmount: newPaidAmount,
        status,
      },
    });

    res.status(201).json({
      message: "Payment recorded successfully",
      payment,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Payment failed",
    });
  }
};
export const getPayments = async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        contributor: true,
      },
      orderBy: {
        paymentDate: "desc",
      },
    });

    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch payments",
    });
  }
};