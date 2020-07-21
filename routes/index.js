var express = require("express");
var router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/test", async function (req, res, next) {
  try {
    //  const { quantity, cc_number, cc_exp_month, cc_exp_year, cc_cvc } = req.body;

    // credit card token
    const cardToken = await stripe.tokens.create({
      card: {
        number: 4242424242424242,
        exp_month: 06,
        exp_year: 2025,
        cvc: 181,
      },
    });
    console.log(cardToken);
    const payment = await stripe.charges.create({
      amount: 1000000,
      currency: "usd",
      source: cardToken.id,
      description: `Payment from user Smith for Grand Theft Auto V`,
    });
    console.log(payment);

    res.json(payment);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
