import { format } from "d3";
import { FLAG_ENDPOINT } from "./Constants";
import { numberWithCommas } from "./utils";
import { getDataFromLocalStorage } from "./Globe";

export function getPolygonLabel(flagName: string, d: any, c: any): string {

  const currency_key = 'full_currency_data';
  let value_temp1 = getDataFromLocalStorage(currency_key);
  let country_currency = value_temp1[c.country_name];

  const findValueByCountry = (countryName: string) => {
    const countryData = value_temp1.find(item => item.country === countryName);
    
    if (countryData) {
      return countryData.value;
    } else {
      return 0;
    }
  };

  let value_final_cur = findValueByCountry(c.country_name);
  value_final_cur = value_final_cur.toFixed(4);

    

  return `
          <div class="card">
          
            <img class="card-img" src="${FLAG_ENDPOINT}/${c.flag_code}/flat/64.png" alt="flag" />
            <div class="container">
               <span class="card-title"><b>${d.NAME}</b></span> <br />
               <div class="card-spacer"></div>
               <hr />
               <div class="card-spacer"></div>
               <span>CurrencyValue: ${(value_final_cur)}</span>  <br />
               <span>Population: ${format(".3s")(d.POP_EST)}</span>
            </div>
          </div>
        `;
}



