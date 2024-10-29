import React, { useState } from 'react';
import {EnvironmentalData} from './Country';
import { returnPolygonData , updatePointOfView, updateSubmittedPolygonsData} from './Globe';
import ExpandableList from './expandable_list';
import { getDataFromLocalStorage } from './Globe';


let newSubmittedData = undefined;



interface EnvironmentalFormProps {
  onRecalculate: () => void;
}

const EnvironmentalForm: React.FC<EnvironmentalFormProps> = ({onRecalculate}) => {
  const [formData, setFormData] = useState<EnvironmentalData>({
    country_name:"",
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
  });


  const [country_name, setCountryName] = useState(undefined);
  const [currency_data, setCurrencyData] = useState(undefined);
  const [base_country, setBaseCountry] = useState(undefined);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseFloat(value),
    });
  };

  const handleLoad = () => {

    let value = returnPolygonData();

    if(value!=undefined)
    {
        setCountryName(value.currencyData.country_name);
        setFormData((prevState) => ({
            country_name:value.currencyData.country_name,
            water_quality_index: value.currencyData.water_quality_index,
            air_quality_index: value.currencyData.air_quality_index,
            carbon_emissions: value.currencyData.carbon_emissions,
            renewable_energy_usage: value.currencyData.renewable_energy_usage,
            waste_management_efficiency: value.currencyData.waste_managemnet_efficiency,
            gdp: value.currencyData.gdp,
            sustainable_development_score: value.currencyData.sustainable_development_score,
            biodiversity_health_score: value.currencyData.biodiversity_health_score,
            flag_code:value.currencyData.flag_code,
            government_environmental_policies:value.currencyData.government_environmental_policies, 
            public_awareness_and_initiatives:value.currencyData.public_awareness_and_initiatives,
            pollution_environment_investment_score:value.currencyData.pollution_environment_investment_score, 
            reforestation:value.currencyData.reforestation, 
            urbanization_impact_score:value.currencyData.urbanization_impact_score, 
            natural_resource_depletion:value.currencyData.natural_resource_depletion,
            
          }));
    }
  };

  const handleSubmit = () => {


    if(formData.country_name=="" )
    {
      return;
    }

     newSubmittedData = formData;
     updateSubmittedPolygonsData(newSubmittedData);
     onRecalculate();

     const key ='full_currency_data';

     let t1= getDataFromLocalStorage(key);
     let t2= newSubmittedData.country_name;

     setBaseCountry(t2);
     setCurrencyData(t1);

  };


 

  return (
    <div className='form_background'>
      <div className="expandable_list">
        <ExpandableList data = {currency_data} baseCountry={base_country}/>
      </div>
      <form className='form_background'>

        <div className='custom1'>
           <div>
             <h2 >Environmental Data Input</h2>
           </div>
           <div>
             <h1 style={{ fontSize: '20px' }} className=" text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">{country_name}</h1>
           </div>
        </div>
      
        <div>
          <label className='custom2'>Water Quality Index:</label>
          <input
            id="water_quality_index_input"
            type="number"
            name="water_quality_index"
            value={formData.water_quality_index}
            onChange={handleChange}
            className="mr-10 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label className='custom2'>Air Quality Index:</label>
          <input
            id="air_quality_index_input"
            type="number"
            name="air_quality_index"
            value={formData.air_quality_index}
            onChange={handleChange}
            className="mr-10 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label className='custom2'>Carbon Emissions (tons):</label>
          <input
            id="carbon_emissions_input"
            type="number"
            name="carbon_emissions"
            value={formData.carbon_emissions}
            onChange={handleChange}
            className="mr-10 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label className='custom2'>Renewable Energy Usage (%):</label>
          <input
            id="renewable_energy_usage_input"
            type="number"
            name="renewable_energy_usage"
            value={formData.renewable_energy_usage}
            onChange={handleChange}
            className="mr-10 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label className='custom2'>Waste Management Efficiency (%):</label>
          <input
            id="waste_management_efficiency_input"
            type="number"
            name="waste_management_efficiency"
            value={formData.waste_management_efficiency}
            onChange={handleChange}
            className="mr-10 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label className='custom2'>GDP (in billions):</label>
          <input
            id="gdp_input"
            type="number"
            name="gdp"
            value={formData.gdp}
            onChange={handleChange}
            className="mr-10 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label className='custom2'>Sustainable Development Score:</label>
          <input
            id="sustainable_development_score_input"
            type="number"
            name="sustainable_development_score"
            value={formData.sustainable_development_score}
            onChange={handleChange}
            className="mr-10 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label className='custom2'>Biodiversity Health Score:</label>
          <input
            id="biodiversity_health_score_input"
            type="number"
            name="biodiversity_health_score"
            value={formData.biodiversity_health_score}
            onChange={handleChange}
            className="mr-10 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label className='custom2'>Government Environmental Policies:</label>
          <input
            id="government_environmental_policies_input"
            type="number"
            name="government_environmental_policies"
            value={formData.government_environmental_policies}
            onChange={handleChange}
            className="mr-10 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label className='custom2'>Public Awareness and Initiatives:</label>
          <input
             id="public_awareness_and_initiatives_input"
             type="number"
             name="public_awareness_and_initiatives"
             value={formData.public_awareness_and_initiatives}
             onChange={handleChange}
             className="mr-10 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        </div>
        <div>
          <label className='custom2'>Pollution and Environment Investment Score:</label>
          <input
             id="pollution_environment_investment_score_input"
             type="number"
             name="pollution_environment_investment_score"
             value={formData.pollution_environment_investment_score}
             onChange={handleChange}
             className="mr-10 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        </div>
        <div>
          <label className='custom2'>Reforestation:</label>
          <input
             id="reforestation_input"
             type="number"
             name="reforestation"
             value={formData.reforestation}
             onChange={handleChange}
             className="mr-10 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
         />
        </div>
        <div>
          <label className='custom2'>Urbanization Impact Score:</label>
          <input
            id="urbanization_impact_score_input"
            type="number"
            name="urbanization_impact_score"
            value={formData.urbanization_impact_score}
            onChange={handleChange}
            className="mr-10 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        </div>
        <div>
          <label className='custom2'>Natural Resource Depletion:</label>
          <input
            id="natural_resource_depletion_input"
            type="number"
            name="natural_resource_depletion"
            value={formData.natural_resource_depletion}
            onChange={handleChange}
            className="mr-10 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        </div>

        <div className='sticky_button_case'>
        <button type='button' onClick={handleLoad} className="sticky_button  ml-20 w-40 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" >
          Load Data
        </button>
        <button type='button' onClick={handleSubmit} className="sticky_button ml-20 w-40 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          Submit Data
        </button>
        </div>

      </form>
    </div>
  );
}
  

export default EnvironmentalForm;
