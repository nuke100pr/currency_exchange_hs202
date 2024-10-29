import Globe, { GlobeInstance } from "globe.gl";
import { request, getCoordinates } from "./utils";
import {
  GLOBE_IMAGE_URL,
  BACKGROUND_IMAGE_URL,
  GEOJSON_URL,
  CASES_API,
} from "./Constants";
import { interpolateRgb, scaleSequential } from "d3";
import {EnvironmentalData,Parent_Country,Child_Country,Countries, Country } from "./Country";
import { GlobalCounts } from "./GlobalCounts";
import { getPolygonLabel } from "./PolygonLabel";
import React, { useState } from 'react';
import * as fs from 'fs';


import * as XLSX from 'xlsx';



let dvalue;
let temp_value_t;
const getVal = (feat: any) => {

  const currency_key = 'full_currency_data';
  let value_temp1 = getDataFromLocalStorage(currency_key);

  let countryName = feat.currencyData.country_name;
  let value_final_cur =0;
  const findValueByCountry = (countryName: string) => {
    const countryData = value_temp1.find(item => item.country === countryName);
    
    if (countryData) {
      return countryData.value;
    } else {
      return 0;
    }
  };

  value_final_cur = findValueByCountry(countryName);



  let result = Math.pow(value_final_cur, 2);
  return result;
};

interface Feature {
  properties: {
    NAME: string;
    POP_EST: number;
  };
  currencyData: Country;
}

let world: GlobeInstance;
const colorScale = scaleSequential(interpolateRgb("white", "darkgreen"))
  .domain([0, 2000]);

export function initGlobe() {


  const globeContainer: HTMLElement = document.getElementById("globeViz")!;
  world = Globe()(globeContainer)
    .globeImageUrl(GLOBE_IMAGE_URL)
    .backgroundImageUrl(BACKGROUND_IMAGE_URL)
    .showGraticules(false)
    .polygonAltitude(0.06)
    .showAtmosphere(false)
    .polygonCapColor((feat: any) => colorScale(getVal(feat)))
    .polygonSideColor(() => "rgba(100, 100, 100, 0.05)")
    .polygonStrokeColor(() => "#ffff")
    .polygonLabel(({ properties: d, currencyData: c }: any) => {
      const flagName = getFlagName(d);
      return getPolygonLabel(flagName, d, c);
    })
    .onPolygonHover((hoverD: any) =>
      world
        .polygonAltitude((d: any) => (d === hoverD ? 0.1 : 0.06))
        .polygonCapColor((d: any) =>
          d === hoverD ? "lavender" : colorScale(getVal(d))
        )
    )
    .polygonsTransitionDuration(100)
    .onPolygonClick((d) => handlePolygonClick(d));

  getCases();
  window.addEventListener("resize", (event: UIEvent) => {
    world.width(window.innerWidth);
    world.height(window.innerHeight);
  });


  function getFlagName(d: any) {
    switch (d.ADMIN) {
      case "France":
        return "fr";
      case "Norway":
        return "no";
      default:
        return d.ISO_A2.toLowerCase();
    }
  }
}

export function refreshGlobe() {


  const globeContainer: HTMLElement = document.getElementById("globeViz")!;
  world = Globe()(globeContainer)
    .globeImageUrl(GLOBE_IMAGE_URL)
    .backgroundImageUrl(BACKGROUND_IMAGE_URL)
    .showGraticules(false)
    .polygonAltitude(0.06)
    .showAtmosphere(true)
    .polygonCapColor((feat: any) => colorScale(getVal(feat)))
    .polygonSideColor(() => "rgba(100, 100, 100, 0.05)")
    .polygonStrokeColor(() => "#ffff")
    .polygonLabel(({ properties: d, currencyData: c }: any) => {
      const flagName = getFlagName(d);
      return getPolygonLabel(flagName, d, c);
    })
    .onPolygonHover((hoverD: any) =>
      world
        .polygonAltitude((d: any) => (d === hoverD ? 0.1 : 0.06))
        .polygonCapColor((d: any) =>
          d === hoverD ? "lavender" : colorScale(getVal(d))
        )
    )
    .polygonsTransitionDuration(100)
    .onPolygonClick((d) => handlePolygonClick(d));


  getCases2();  
  window.addEventListener("resize", (event: UIEvent) => {
    world.width(window.innerWidth);
    world.height(window.innerHeight);
  });


  function getFlagName(d: any) {
    switch (d.ADMIN) {
      case "France":
        return "fr";
      case "Norway":
        return "no";
      default:
        return d.ISO_A2.toLowerCase();
    }
  }
}

export const handlePolygonClick = (d) => {
  dvalue = d;
};

export const returnPolygonData = () =>
{
    if(dvalue!=undefined)
    {
      return dvalue;
    }
    else
    {
       return null;
    }
}



let dates: string[] = [];
let countries: Countries;
let featureCollection: Feature[];
let raw_data;
let struct_data;

async function getCases() 
{
  countries = await request(CASES_API);
  featureCollection = (await request(GEOJSON_URL)).features;
  dates = Object.keys(countries.India);
  await fetchAndStruct();
  await updateCounters();
  await updatePolygonsData();
  await updatePointOfView();
}

async function getCases2() 
{
  await fetchAndStruct2();
  await updateCounters();
  await updatePolygonsData();
  await updatePointOfView();
}

async function fetchAndStruct2() 
{
  const key = 'structured_data';
  let new_struct_data = undefined;
  let value_t = getDataFromLocalStorage(key);
  struct_data = value_t;

  value_t[temp_value_t.country_name] = {
    "water_quality_index": temp_value_t.water_quality_index,
    "air_quality_index": temp_value_t.air_quality_index,
    "carbon_emissions": temp_value_t.carbon_emissions,
    "renewable_energy_usage": temp_value_t.renewable_energy_usage,
    "waste_management_efficiency": temp_value_t.waste_management_efficiency, 
    "gdp": temp_value_t.gdp,
    "sustainable_development_score": temp_value_t.sustainable_development_score,
    "biodiversity_health_score": temp_value_t.biodiversity_health_score,
    "flag_code":temp_value_t.flag_code,
    "government_environmental_policies":temp_value_t.government_environmental_policies,
    "public_awareness_and_initiatives":temp_value_t.public_awareness_and_initiatives,
    "pollution_environment_investment_score":temp_value_t.pollution_environment_investment_score,
    "reforestation":temp_value_t.reforestation,
    "urbanization_impact_score":temp_value_t.urbanization_impact_score,
    "natural_resource_depletion":temp_value_t.natural_resource_depletion

};

struct_data = value_t;
saveDataToLocalStorage(key,struct_data);

}


async function fetchAndStruct() 
{
  try 
  {
    const response = await fetch('./data_full.xlsx');
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    
    raw_data = jsonData;

    const restructureData = (data: Country[]): Record<string, Omit<Country, 'country_name'>> => {
      const result: Record<string, Omit<Country, 'country_name'>> = {};
      data.forEach((country: Country) => {
        const { country_name, ...rest } = country;
        result[country_name] = rest;
      });
      return result;
    };

    struct_data = restructureData(raw_data);
    const key = 'structured_data';
    saveDataToLocalStorage(key,struct_data);
  } 
  catch (error) 
  {

  }

}

  
function updateCounters() 
{
  const date = dates.length - 1;
  let total_population:number = 0;
  let human_development_index:number =0 ;
  let total_gdp:number = 400;
  let total_carbon_emissions:number =0;
  Object.keys(struct_data).forEach((item: string) => {
    if (true) {
      total_gdp += +struct_data[item].gdp;
      total_carbon_emissions += +struct_data[item].carbon_emissions;
    }
  });

  GlobalCounts.totalGDP = total_gdp;
  GlobalCounts.totalCarbonEmissions = total_carbon_emissions-200000;
  GlobalCounts.set = true;
}



function updatePolygonsData() 
{
  const date = dates.length - 1;
    const structuredCountries = struct_data;
    for (let x = 0; x < featureCollection.length; x++) {
      const country = featureCollection[x].properties.NAME;
      if (structuredCountries[country]) {
        featureCollection[x].currencyData = {
          country_name: country,
          water_quality_index: structuredCountries[country].water_quality_index,
          air_quality_index: structuredCountries[country].air_quality_index,
          carbon_emissions: structuredCountries[country].carbon_emissions,
          renewable_energy_usage: structuredCountries[country].renewable_energy_usage,
          waste_management_efficiency: structuredCountries[country].waste_management_efficiency,
          gdp: structuredCountries[country].gdp,
          sustainable_development_score: structuredCountries[country].sustainable_development_score,
          biodiversity_health_score:structuredCountries[country].biodiversity_health_score,
          flag_code:structuredCountries[country].flag_code,
          government_environmental_policies:structuredCountries[country].government_environmental_policies,
          public_awareness_and_initiatives:structuredCountries[country].public_awareness_and_initiatives,
          pollution_environment_investment_score:structuredCountries[country].pollution_environment_investment_score,
          reforestation:structuredCountries[country].reforestation,
          urbanization_impact_score:structuredCountries[country].urbanization_impact_score,
          natural_resource_depletion:structuredCountries[country].natural_resource_depletion
          
        };
      } else { 
        featureCollection[x].currencyData = {
          country_name: country,
          water_quality_index: 0,
          air_quality_index: 0,
          carbon_emissions: 0,
          renewable_energy_usage: 0,
          waste_management_efficiency: 0,
          gdp: 0,
          sustainable_development_score: 0,
          biodiversity_health_score: 0,
          flag_code:"",
          government_environmental_policies:0,
          public_awareness_and_initiatives:0,
          pollution_environment_investment_score:0,
          reforestation:0,
          urbanization_impact_score:0,
          natural_resource_depletion:0
        };
      }
    }



  const maxVal = Math.max(...featureCollection.map(getVal));
  colorScale.domain([0,8000]);
  world.polygonsData(featureCollection);
}


export function updateSubmittedPolygonsData(newSubData) 
{
  temp_value_t = newSubData;
  refreshGlobe();
}


export function saveDataToLocalStorage(key, data) 
{
  const jsonData = JSON.stringify(data); 
  localStorage.setItem(key, jsonData);   

}

export function getDataFromLocalStorage(key) 
{
  const jsonData = localStorage.getItem(key); 
  if (jsonData) 
  {
    return JSON.parse(jsonData);  
  }
  return null;  
}

export async function updatePointOfView()
{
  try {
    const { latitude, longitude } = await getCoordinates();

    world.pointOfView(
      {
        lat: latitude,
        lng: longitude,  
        
      },
      1000
    );
  } catch (e) {
    console.log("Unable to set point of view.");
  }
}
