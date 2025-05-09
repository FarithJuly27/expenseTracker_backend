const moment = require("moment");

const getDateFilter = async (dateFilter) => {
  const currentDate = moment().startOf("day");
  switch (dateFilter) {
    case "yesterday":
      return {
        transactionDate: {
          $gte: moment(currentDate).subtract(1, "days").startOf("day").toDate(),
          $lte: moment(currentDate).subtract(1, "days").endOf("day").toDate(),
        },
      };
    case "thisWeek":
      return {
        transactionDate: {
          $gte: moment(currentDate).startOf("week").toDate(),
          $lte: moment(currentDate).endOf("day").toDate(),
        },
      };
    case "thisMonth":
      return {
        transactionDate: {
          $gte: moment(currentDate).startOf("month").toDate(),
          $lte: moment(currentDate).endOf("day").toDate(),
        },
      };
    case "thisYear":
      return {
        transactionDate: {
          $gte: moment(currentDate).startOf("year").toDate(),
          $lte: moment(currentDate).endOf("day").toDate(),
        },
      };
    default:
      return {
        transactionDate: {
          $gte: currentDate.toDate(),
          $lte: moment(currentDate).endOf("day").toDate(),
        },
      };
  }
};

module.exports = {
  getDateFilter,
};
