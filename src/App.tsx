import * as React from "react";
import "./styles.css";
import "./index.css";
import { useState, useEffect } from "react";
import { initGlobe } from "./Globe";
import { GlobalCounts } from "./GlobalCounts";
import { Counter } from "./Counter";
import { Spinner } from "./Spinner";
import EnvironmentalForm from "./input_form";
import CurrencyList from "./currency_list";
import { getDataFromLocalStorage,saveDataToLocalStorage } from "./Globe";

export default function App() {
  const [totals, setTotals] = useState<number[]>([]);
  const [loaderTimeout, timedOut] = useState(false);
  useEffect(() => initGlobe(), []);
  useEffect(() => {
    setTimeout(() => timedOut(true), 5000);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      let total: number[] = [];
      total.push(GlobalCounts.totalGDP);
      total.push(GlobalCounts.totalCarbonEmissions);
      total.push(GlobalCounts.humanDevelopmentIndex);
      total.push(GlobalCounts.totalPopulation);
      setTotals(total);
      if (!GlobalCounts.set) window.location.reload();
    }, 3000);
  }, [GlobalCounts.set]);

   


  const key = 'structured_data';
  let struct_data = getDataFromLocalStorage(key);
  let full_currency_data;

  const calculateTop10Currencies = () => {
    const signs: { [key: string]: number } = {
      water_quality_index: 2,
      air_quality_index: 2,
      carbon_emissions: -15,
      renewable_energy_usage: 5,
      waste_management_efficiency: 5,
      gdp: 10,
      sustainable_development_score: 5,
      biodiversity_health_score: 4,
      government_environmental_policies:5,
      public_awareness_and_initiatives:3,
      pollution_environment_investment_score:4,
      reforestation:4,
      urbanization_impact_score:-4,
      natural_resource_depletion:-10
    };
  
    const normalizedData: { [country: string]: { [key: string]: number } } = {};
    const S_total: { [country: string]: number } = {};
  
    
    const parameters = Object.keys(signs);
  
    for (const parameter of parameters) {
      const values = Object.values(struct_data).map(country => country[parameter]);
  
      if (values.every(value => typeof value === 'number')) {
        const minVal = Math.min(...values);
        const maxVal = Math.max(...values);
  
        const normalizedValues = values.map(value => (value - minVal) / (maxVal - minVal));
  
        Object.keys(struct_data).forEach((country, i) => {
          if (!normalizedData[country]) {
            normalizedData[country] = {};
          }
          normalizedData[country][parameter] = normalizedValues[i];
        });
      } else {
        console.warn(`Skipping parameter "${parameter}" due to non-numeric values.`);
      }
    }
  
    for (const country in normalizedData) {
      S_total[country] = Object.keys(signs).reduce((sum, param) => {
        return sum + (normalizedData[country][param] || 0) * signs[param]; 
      }, 0);
    }
    
  
    const S_total_values = Object.values(S_total);

    const mean_S = S_total_values.reduce((sum, val) => sum + val, 0) / S_total_values.length;
    
    const std_S = Math.sqrt(
      S_total_values.reduce((sum, val) => sum + Math.pow(val - mean_S, 2), 0) / S_total_values.length
    );
    
    const normalizedCurrencyValues: { [country: string]: number } = {};
    for (const country in S_total) {
      const z_c = Math.pow((S_total[country] - mean_S) / std_S+3,3) ;
      normalizedCurrencyValues[country] = z_c;
    }

    
    
  
    const full_currency_data = Object.entries(normalizedCurrencyValues)
      .map(([country, value]) => ({ country, value }))
      .sort((a, b) => b.value - a.value);
  
    const currency_key = 'full_currency_data';
    saveDataToLocalStorage(currency_key, full_currency_data);
    
    console.log(full_currency_data);
    
    return full_currency_data.slice(0, 10);
  };
  

  
  const [top10Currencies, setTop10Currencies] = useState<any[]>([]);

  
  useEffect(() => {
    const topCurrencies = calculateTop10Currencies();
    setTop10Currencies(topCurrencies);
  }, []);


  const handleRecalculate = () => {
    const recalculatedCurrencies = calculateTop10Currencies();
    setTop10Currencies(recalculatedCurrencies);
  };

  return (
    <React.Fragment>

     <div><div className="mainContainer">
        <EnvironmentalForm onRecalculate={handleRecalculate}/>
      </div>

      <div className="mainContainer2">
         <CurrencyList top10Currencies={top10Currencies}/>
      </div></div>


      
      
      <div id="globeViz"></div>
      <div className="top-info-container">
        <div className="title">Global Currency Exchange</div>
        <div className="title-desc">
          Hover on a country or territory for details
        </div>
      </div>
      <div className="bottom-info-container">
        <span className="gradient-container">
          LOW<div className="gradient"></div>HIGH
        </span>
        </div>
        {/* <Spinner loaded={GlobalCounts.set || loaderTimeout} />
        {GlobalCounts.set ? (
          <>
            <div
              style={{ fontSize: "14px", color: "#ccd6f6", marginTop: "35px" }}
            >
              Total Counts <span className="updated"></span>
            </div>
            <div style={{ color: "#e6f1ff", padding: "0 5px" }}>
              <span id="population">
                TOTAL POPULATION:
                <Counter count={totals[0]} />
              </span>
              <span id="carbon_emissions">
                {" "}
                • CARBON EMISSIONS:
                <Counter count={totals[1]} />
              </span>
              <span id="gdp">
                {" "}
                • TOTAL GDP:
                <Counter count={totals[2]} />
              </span>
              <span id="human_development_index">
                {" "}
                • HUMAN DEVELOPMENT INDEX:
                <Counter count={totals[3]} />
              </span>
            </div>
          </>
        ) : null}
      </div> */}
    </React.Fragment>
  );
}
