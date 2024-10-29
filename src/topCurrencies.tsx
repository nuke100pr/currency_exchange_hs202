import React from 'react';
import { getDataFromLocalStorage ,saveDataToLocalStorage} from './Globe';
import { useState,useEffect } from 'react';

interface Currency {
  name: string;
  symbol: string;
}

const CurrencyList: React.FC = () => {

  const key = 'structured_data';
  let struct_data = getDataFromLocalStorage(key);
  console.log(struct_data);

   const calculateTop10Currencies = () => {
    const currencyValues = Object.entries(struct_data).map(([country, info]) => ({
      country,
      value: info.carbon_emissions / info.gdp
    }));

    return currencyValues.sort((a, b) => b.value - a.value).slice(0, 10);
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
    <div style={styles.container}>
      <h2>Top 10 Currencies</h2>
      <ul style={styles.list}>
        {top10Currencies.map((currency, index) => (
          <li key={index} style={styles.listItem}>
            {currency.country} (Value: {currency.value.toFixed(4)})
          </li>
        ))}
      </ul>
    </div>
  );
};


const styles = {
  container: {
    position: 'absolute' as const, 
    top: '20px', 
    left: '50%',
    transform: 'translateX(-50%)', 
    border: '1px solid #ccc',
    borderRadius: '5px',
    maxWidth: '400px',
    textAlign: 'center' as const,
    margin: '0',
    padding: '10px', 
    backgroundColor: '#fff',
    zIndex: 10, 
  },
  list: {
    listStyleType: 'none' as const,
    padding: 0,
  },
  listItem: {
    padding: '10px 0',
    borderBottom: '1px solid #ddd',
  },
};



export default CurrencyList;
