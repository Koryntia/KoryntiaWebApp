const loanController = require('../controllers/loanController')
module.exports = (app) => {
  app.post("/api/getMyLoan", loanController.getMy_loan)
  app.get("/api/getRecentLoan", loanController.getRecent_loan)
};


