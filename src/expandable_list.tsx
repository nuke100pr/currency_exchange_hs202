import React, { useState } from 'react';

interface CountryData {
  country: string;
  value: number;
}

interface Props {
  data: CountryData[];
  baseCountry: string;
}

const ExpandableList: React.FC<Props> = ({ data, baseCountry }) => {
  const [isOpen, setIsOpen] = useState(false);

  let baseCountryData = undefined;
  if(data!=undefined)
  {
    baseCountryData = data.find((item) => item.country === baseCountry);
  }
  

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='expandable-list highest'>
      <button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={toggleOpen}>
        {isOpen ? 'Hide Exchange Rates' : `Show Exchange Rates for ${baseCountry}`}
      </button>
      {isOpen && baseCountryData && (
        <ul>
          {data.map((item) => (
            <li key={item.country}>
              {` ${baseCountry} to ${item.country}: ${(item.value / baseCountryData.value).toFixed(4)}`}
            </li>
          ))}
        </ul>
      )}
      {!isOpen && !baseCountryData && <p>Base country not found.</p>}
    </div>
  );
};

export default ExpandableList;
