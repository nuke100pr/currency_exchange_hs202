export interface Countries {
  [country: string]: {
    [date: string]: Country;
  };
}

export interface Country {
  country_name:string;
  water_quality_index:number;
  air_quality_index:number;
  carbon_emissions:number;
  renewable_energy_usage:number;
  waste_management_efficiency:number;
  gdp:number;
  sustainable_development_score:number;
  biodiversity_health_score:number;
  flag_code:string;
  government_environmental_policies:number,
  public_awareness_and_initiatives:number,
  pollution_environment_investment_score:number,
  reforestation:number,
  urbanization_impact_score:number,
  natural_resource_depletion:number
}

export interface Parent_Country {
  [country:string]:
  {
     child_country:Child_Country;
  }

}

export interface Child_Country {
  water_quality_index:number;
  air_quality_index:number;
  carbon_emissions:number;
  renewable_energy_usage:number;
  waste_management_efficiency:number;
  gdp:number;
  sustainable_development_score:number;
  biodiversity_health_score:number;
  flag_code:string;
  government_environmental_policies:number,
  public_awareness_and_initiatives:number,
  pollution_environment_investment_score:number,
  reforestation:number,
  urbanization_impact_score:number,
  natural_resource_depletion:number
}

export interface EnvironmentalData {
  country_name:string,
  water_quality_index: number;
  air_quality_index: number;
  carbon_emissions: number;
  renewable_energy_usage: number;
  waste_management_efficiency: number;
  gdp: number;
  sustainable_development_score: number;
  biodiversity_health_score: number;
  flag_code:string;
  government_environmental_policies:number,
  public_awareness_and_initiatives:number,
  pollution_environment_investment_score:number,
  reforestation:number,
  urbanization_impact_score:number,
  natural_resource_depletion:number
}


