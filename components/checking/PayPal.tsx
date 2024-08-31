"use client";
import React from "react";
import "dotenv";
import {
  PayPalButtons,
  FUNDING,
  PayPalScriptProvider,
  PayPalButtonsComponentProps,
  ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";
export default function PaypalButton({ setPay, total }: any) {
  const clientId = process.env.PAYPAL_ID;

  const option: ReactPayPalScriptOptions = {
    clientId: clientId as string,
    currency: "USD",
    intent: "capture",
  };

  const createOrder: PayPalButtonsComponentProps["createOrder"] = async (
    data,
    actions
  ) => {
    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [{ amount: { value: total, currency_code: "USD" } }],
    });
  };
  const onApprove: PayPalButtonsComponentProps["onApprove"] = async (
    data,
    actions
  ) => {


    if (data.orderID) {
 
      setPay(data);
    }
  };

  return (
    <PayPalScriptProvider options={option}>
      <PayPalButtons
        fundingSource={FUNDING.PAYPAL}
        createOrder={createOrder}
        onApprove={onApprove}
        style={{ height: 44 }}
      />
    </PayPalScriptProvider>
  );
}
