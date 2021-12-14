/* Data comes in the following format: 
{
  symbol: "symbol", //stock symbol
  totalResults: 120, //total results
  results: [
      {
      o: 689.06,
      h: 700.9894,
      c: 665.64,
      l: 642.11,
      v: 56394908,
      t: 1635739200000,
      formated: "2021-11-01 00:00:00",
    }
  ]
}
*/
import React, { useEffect, useState } from "react";
import {NFLX,TEAM} from './sampleData'


export const OrganizeData = (arr, assets, ownership) => {
    const min = arr.reduce(
      (acc, entry) => (acc > entry.totalResults ? entry.totalResults : acc),
      Infinity
    );
    return arr.map((entry) => {
      const index = assets.indexOf(entry.symbol);
      return {
        symbol: entry.symbol,
        ownership: ownership[index],
        dates: entry.results
          .map((d) => ({
            price: d.o,
            date: d.formated,
          }))
          .slice(0, min),
      };
    });
  };

  
const fakeAssets = ["NFLX", "TEAM"];
const fakeOwnership = [50, 30];
const fakeResults = [NFLX, TEAM];
const data = OrganizeData(fakeResults, fakeAssets, fakeOwnership);
console.log("[DEBUG]", data);
