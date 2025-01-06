import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Set up nodemailer transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send Email Function
const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};

// Send Order Confirmation (Email)
const sendOrderConfirmation = async (userEmail, orderDetails) => {
  const { orderItems, totalPrice, shippingAddress } = orderDetails;

  const orderSummary = orderItems
    .map(item => `${item.name} (Qty: ${item.qty}, Price: $${item.price})`)
    .join("\n");

  const emailText = `
    Thank you for your order!

    Order Details:
    ${orderSummary}

    Total Price: $${totalPrice}

    Shipping Address:
    ${shippingAddress}

    We will notify you once your order has been shipped.

    Regards,
    SmartMart Team
  `;

  try {
    const info = await sendEmail(userEmail, "Order Confirmation", emailText);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

// Notify Admin on New Order
const notifyAdminNewOrder = async (adminEmail, orderDetails) => {
  const { orderItems, totalPrice, shippingAddress, user } = orderDetails;

  const orderSummary = orderItems
    .map(item => `${item.name} (Qty: ${item.qty}, Price: $${item.price})`)
    .join("\n");

  const emailText = `
    New order received!

    Order Summary:
    ${orderSummary}

    Total Price: $${totalPrice}

    Shipping Address:
    ${shippingAddress}

    Customer:
    ${user.name} - ${user.email}

    Please check the order details in the Admin Panel.
  `;

  try {
    const info = await sendEmail(adminEmail, "New Order Received", emailText);
    console.log("Admin notified:", info.response);
  } catch (error) {
    console.error("Error notifying admin:", error.message);
  }
};

// Notify Manager about Low Stock (Example)
const notifyManagerLowStock = async (managerEmail, productName, remainingStock) => {
  const emailText = `
    Alert: Low stock for ${productName}!

    Remaining stock: ${remainingStock} units.

    Please restock the item to avoid any issues with customer orders.

    Regards,
    SmartMart System
  `;

  try {
    const info = await sendEmail(managerEmail, `Low Stock Alert: ${productName}`, emailText);
    console.log("Manager notified:", info.response);
  } catch (error) {
    console.error("Error notifying manager:", error.message);
  }
};

// Notify Customers on Order Delivery
const notifyOrderDelivered = async (userEmail, orderDetails) => {
  const { orderItems, totalPrice, shippingAddress } = orderDetails;

  const orderSummary = orderItems
    .map(item => `${item.name} (Qty: ${item.qty}, Price: $${item.price})`)
    .join("\n");

  const emailText = `
    Your order has been delivered!

    Order Summary:
    ${orderSummary}

    Total Price: $${totalPrice}

    Shipping Address:
    ${shippingAddress}

    Thank you for shopping with us!

    Regards,
    SmartMart Team
  `;

  try {
    const info = await sendEmail(userEmail, "Order Delivered", emailText);
    console.log("Delivery notification sent:", info.response);
  } catch (error) {
    console.error("Error notifying delivery:", error.message);
  }
};

// Notify User about Price Change
const notifyPriceChange = async (userEmail, productName, oldPrice, newPrice) => {
  const emailText = `
    Price change for ${productName}!

    Old Price: $${oldPrice}
    New Price: $${newPrice}

    Don't miss out on this offer!

    Regards,
    SmartMart Team
  `;

  try {
    const info = await sendEmail(userEmail, `Price Update: ${productName}`, emailText);
    console.log("Price change notification sent:", info.response);
  } catch (error) {
    console.error("Error notifying price change:", error.message);
  }
};

export {
  sendOrderConfirmation,
  notifyAdminNewOrder,
  notifyManagerLowStock,
  notifyOrderDelivered,
  notifyPriceChange,
};
