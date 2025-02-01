import express from "express";
import path from "path";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./dbConn.js";
// import { fileURLToPath } from "url";
// import { dirname } from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// Initialize dotenv
dotenv.config();

// Set up Express app
const app = express();
const PORT = process.env.PORT || 3500;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
connectDB();
// app.use(express.static(path.join(__dirname, "dist")));
import inventory from "./model/inventory.js";
import user_registration from "./model/user_registration.js";
import user_company from "./model/user_company.js";
import billings from "./model/sales.js";
import purchasebillings from "./model/purchases.js";

// app.get("/login",async (req,res)=>{

// });
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });
app.post("/signup", async (req, res) => {
  try {
    const newUser = new user_registration({
      username: req.body.username,
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      // contact_prefix: req.body.contact_prefix,
      contact: req.body.contact,
    });
    await newUser.save();
    // res.redirect("/login");
    res.status(200).send("user registered");
  } catch (err) {
    console.error("error registering user", err);
    res.status(500).send("An error occured. Please try again.");
  }
});

app.get("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const user = user_registration.find({
      username: username,
      password: password,
    });
    res.send(user);
  } catch (err) {
    console.error(err);
  }
});

app.post("/user_company", async (req, res) => {
  try {
    const newCompany = req.body;
    const saveCompany = await user_company.insertMany(newCompany);
    // const newCompany = new user_company({
    //   username: req.body.username,
    //   company_name: req.body.company_name,
    //   gstin: req.body.gstin,
    //   date_of_incorporation: req.body.date_of_incorporation,
    //   office_address: req.body.office_address,
    //   access_allowed: req.body.access_allowed,
    //   emails_access_allowed: req.body.emails_access_allowed,
    //   goods: req.body.goods,
    //   services: req.body.services,
    // });
    // await newCompany.save();
    res.status(201).json({ message: "company registered", data: saveCompany });
  } catch (err) {
    console.error("error registering company", err);
    res.status(500).send("An error occured. Please try again.");
  }
});
app.put("/user_company", async (req, res) => {});
app.post("/billing", async (req, res) => {
  // also manage inventory
  try {
    const bills = req.body;
    const finalbills = await Promise.all(
      bills.map(async (bill) => {
        const total_selling_price = bill.sales.reduce((total, sale) => {
          return total + sale.selling_price * sale.quantity;
        }, 0);
        const GSTamount = (bill.GST_percentage / 100) * total_selling_price;
        const selling_price_tax_inclusive = total_selling_price + GSTamount;
        bill.total_selling_price = total_selling_price;
        bill.selling_price_tax_inclusive = selling_price_tax_inclusive;

        await Promise.all(
          sale.items.map(async (item) => {
            await inventory.updateOne(
              { series_name: item.series_name },
              { $inc: { quantity: -item.quantity } }
            );
          })
        );
        return bill;
      })
    );

    const savebills = await billings.insertMany(finalbills);

    res.status(201).json({ message: "bill saved", data: savebills });
  } catch (err) {
    res.status(500).json({
      message: "An error occured. Please try again.",
      error: err.message,
    });
  }
});

app.get("/billing", async (req, res) => {
  // for graphs of sales
  //   monthly,weekly,yearly sales(money)
  // monthly,weekly,yearly sales(products)
});
app.post("/purchases", async (req, res) => {
  // also manage inventory
  try {
    const bills = req.body;
    const finalbills = await Promise.all(
      bills.map(async (bill) => {
        const total_cost_price = bill.purchases.reduce((total, purchase) => {
          return total + purchase.cost_price_single_unit * purchase.quantity;
        }, 0);
        const GSTamount = (GST_percentage / 100) * total_cost_price;
        const total_cost_price_tax_inclusive = total_cost_price + GSTamount;
        bill.total_cost_price = total_cost_price;
        bill.total_cost_price_tax_inclusive = total_cost_price_tax_inclusive;

        await Promise.all(
          bill.purchases.map(async (purchase) => {
            const existingItem = await inventory.findOne({
              series_name: purchase.series_name,
            });
            if (existingItem) {
              await inventory.updateOne(
                { series_name: purchase.series_name },
                { $inc: { quantity: purchase.quantity } }
              );
            } else {
              await inventory.create({
                series_name: purchase.series_name,
                category_name: purchase.category_name,
                quantity: purchase.quantity,
              });
            }
          })
        );
        return bill;
      })
    );
    const savebills = await purchasebillings.insertMany(finalbills);
    res.status(201).json({ message: "bill saved", data: savebills });
  } catch (err) {
    res.status(500).json({
      message: "An error occured. Please try again.",
      error: err.message,
    });
  }
});

app.get("/purchases", async (req, res) => {
  // for graphs
});

app.post("/product_details", async (req, res) => {});

app.post("/inventory", async (req, res) => {
  try {
    const addProduct = req.body;
    const updateInventory = await inventory.insertMany(addProduct);
    res
      .status(201)
      .json({ message: "product added to inventory", data: updateInventory });
  } catch (err) {
    res.status(500).json({
      message: "An error occured. Please try again.",
      error: err.message,
    });
  }
});

app.post("/expenses", async (req, res) => {});

app.post("/bank_statement", async (req, res) => {});
app.get("/bank_statement", async (req, res) => {
  //  for tax calculation and for profit or loss calculation
});

app.post("/employee", async (req, res) => {
  const employee = req.body;
});
app.post("/client_details", async (req, res) => {});
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
