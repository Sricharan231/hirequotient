// import React from "react";
// import { TableRow, TableCell } from "@material-ui/core";

// const HoldingsRow = ({ holding }) => {
//   return (
//     <TableRow key={holding.name}>
//       <TableCell>{holding.name}</TableCell>
//       <TableCell>{holding.ticker}</TableCell>
//       <TableCell>{holding.asset_class}</TableCell>
//       <TableCell>{holding.avg_price}</TableCell>
//       <TableCell>{holding.market_price}</TableCell>
//       <TableCell>{holding.latest_chg_pct}</TableCell>
//       <TableCell>{holding.market_value_ccy}</TableCell>
//     </TableRow>
//   );
// };

// export default HoldingsRow;
import React from "react";
import { TableRow, TableCell } from "@material-ui/core";
import classNames from "classnames";
import "./HoldingsRow.css";

const HoldingsRow = ({ holding, index }) => {
  const isNegativeChange = holding.latest_chg_pct < 0;

  return (
    <TableRow key={holding.name} className={index % 2 === 0 ? "row-even" : "row-odd"}>
      <TableCell>{holding.name}</TableCell>
      <TableCell>{holding.ticker}</TableCell>
      <TableCell>{holding.asset_class}</TableCell>
      <TableCell>{holding.avg_price}</TableCell>
      <TableCell>{holding.market_price}</TableCell>
      <TableCell
        className={classNames({
          negativeChange: isNegativeChange,
        })}
      >
        {holding.latest_chg_pct}
      </TableCell>
      <TableCell>{holding.market_value_ccy}</TableCell>
    </TableRow>
  );
};

export default HoldingsRow;
