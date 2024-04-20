import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
} from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import HoldingsRow from "./HoldingsRow";

const HoldingsTable = () => {
  const [holdings, setHoldings] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    axios
      .get("https://canopy-frontend-task.now.sh/api/holdings")
      .then((response) => {
        setHoldings(response.data.payload);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleExpand = (assetClass) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [assetClass]: !prevExpanded[assetClass],
    }));
  };


const renderGroupedHoldings = () => {
    const groups = {};
    holdings.forEach((holding) => {
      if (!groups[holding.asset_class]) {
        groups[holding.asset_class] = [];
      }
      groups[holding.asset_class].push(holding);
    });
  
    return Object.entries(groups).map(([assetClass, holdingsInGroup]) => {
      const rowCount = holdingsInGroup.length; 
      return (
        <React.Fragment key={assetClass}>
          <TableRow>
            <TableCell colSpan={7}>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => handleExpand(assetClass)}
                style={{ color: expanded[assetClass]? "red" : "blue" }}
              >
                {expanded[assetClass] ? (
                  <KeyboardArrowUp />
                ) : (
                  <KeyboardArrowDown />
                )}
              </IconButton>
              {assetClass} ({rowCount}) 
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={7}>
              <Collapse in={expanded[assetClass]} timeout="auto" unmountOnExit>
               
                <Table aria-label="grouped holdings">
                <TableHead>
                  <TableRow  style={{ color: 'blue', fontWeight: 'bold' }}>
                    <TableCell style={{ fontFamily: 'Aptos Display', fontSize : 12, fontWeight:'bolder' }}>NAME OF THE HOLDINGS</TableCell>
                    <TableCell style={{ fontFamily: 'Aptos Display', fontSize : 12, fontWeight:'bolder' }}>TICKER</TableCell>
                    <TableCell style={{ fontFamily: 'Aptos Display', fontSize : 12, fontWeight:'bolder' }}>ASSET CLASS</TableCell>
                    <TableCell style={{ fontFamily: 'Aptos Display', fontSize : 12, fontWeight:'bolder' }}> AVERAGE PRICE</TableCell>
                    <TableCell style={{ fontFamily: 'Aptos Display', fontSize : 12, fontWeight:'bolder' }}>MARKET PRICE</TableCell>
                    <TableCell style={{ fontFamily: 'Aptos Display', fontSize : 12, fontWeight:'bolder' }}>LATEST CHANEG PERCENTAGE </TableCell>
                    <TableCell style={{ fontFamily: 'Aptos Display', fontSize : 12, fontWeight:'bolder' }}>MARKET VALUE BASE IN CCY</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {holdingsInGroup.map((holding, index) => (
                    <HoldingsRow key={holding.name} holding={holding} index={index} />
                  ))}
                </TableBody>
              </Table>
              </Collapse>
            </TableCell>
          </TableRow>
        </React.Fragment>
      );
    });
  };
  

  return (
    <TableContainer component={Paper}>
      <Table aria-label="holdings table">
        
        <TableBody>{renderGroupedHoldings()}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default HoldingsTable;
