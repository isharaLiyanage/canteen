import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import { startOfWeek, endOfWeek, subWeeks } from "date-fns";
import { getServerSession } from "next-auth/next";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const session = await getServerSession();
  console.log(session?.role);
  // if (session?.role !== "admin") return null;
  try {
    const currentWeekRange = weekRange(0);
    const lastWeekRange = weekRange(1);
    const beforeLastWeekRange = weekRange(2);

    const usersDetails = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        email: true,

        orders: {
          select: {
            id: true,
            price: true,
            status: true,
            payment: true,
            orderItems: {
              select: {
                quantity: true,
              },
            },
          },
        },
      },
    });
    const usersWithTotalPrice = usersDetails.map((user) => ({
      id: user.id,
      email: user.email,
      total: user.orders.reduce((total, order) => {
        return total + order.price;
      }, 0),
    }));

    const totalSales = await prisma.orders.aggregate({
      _sum: {
        price: true,
      },
    });

    const summaryOfSales = await prisma.orders.findMany({});

    const current = summaryOfSales
      .filter(
        (order) =>
          order.createAt >= currentWeekRange.start &&
          order.createAt <= currentWeekRange.end
      )
      .reduce(
        (sum, order) => {
          order.status === "DELIVERED" ? sum.delivered++ : sum.delivered;

          sum.sales += order.price;
          sum.orders++;
          return sum;
        },
        { sales: 0, orders: 0, delivered: 0 }
      );

    const lastWeek = summaryOfSales
      .filter(
        (order) =>
          order.createAt >= lastWeekRange.start &&
          order.createAt <= lastWeekRange.end
      )
      .reduce(
        (sum, order) => {
          order.status === "DELIVERED" ? sum.delivered++ : sum.delivered;

          sum.sales += order.price;
          sum.orders++;
          return sum;
        },
        { sales: 0, orders: 0, delivered: 0 }
      );

    const beforeLastWeek = summaryOfSales
      .filter(
        (order) =>
          order.createAt >= beforeLastWeekRange.start &&
          order.createAt <= beforeLastWeekRange.end
      )
      .reduce(
        (sum, order) => {
          order.status === "DELIVERED" ? sum.delivered++ : sum.delivered;
          sum.sales += order.price;
          sum.orders++;
          return sum;
        },
        { sales: 0, orders: 0, delivered: 0 }
      );

    const salesSummary = { current, lastWeek, beforeLastWeek };

    const newUsers = await prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
    });

    const newOrders = await prisma.orders.count({
      where: {
        createAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
    });

    const deliveredOrders = await prisma.orders.count({
      where: {
        status: "DELIVERED",
        createAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
    });
    const details = {
      usersDetails: usersWithTotalPrice,
      deliveredOrders,
      newOrders,
      newUsers,
      totalSales: totalSales._sum.price,
      salesSummary,
    };
    return new NextResponse(
      JSON.stringify({
        details,
        status: 200,
        massage: "done",
      })
    );
  } catch (er) {
    console.log(er);
    return new NextResponse(
      JSON.stringify({
        er,
        status: 500,
        massage: "Internal Server Error",
      })
    );
  }
};

const weekRange = (weeksAgo: any) => {
  const nowData = new Date();
  const start = startOfWeek(subWeeks(nowData, weeksAgo), { weekStartsOn: 1 });
  const end = endOfWeek(subWeeks(nowData, weeksAgo), { weekStartsOn: 1 });

  return { start, end };
};
