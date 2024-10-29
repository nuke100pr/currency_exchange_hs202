import React from 'react';

interface CurrencyListProps {
  top10Currencies: { country: string; value: number }[];
}

const CurrencyList: React.FC<CurrencyListProps> = ({ top10Currencies }) => {
  return (
    <div className='background_basic' style={styles.container}>
      <h2 className='custom1'>Top 10 Currencies Based on Data</h2>
      <ul style={styles.list} className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
        {top10Currencies.map((currency, index) => (
          <li key={index} style={styles.listItem}>
            {currency.country} ({currency.value.toFixed(2)})
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative' as const,
    top: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    border: '1px solid #ccc',
    borderRadius: '5px',
    maxWidth: '400px',
    textAlign: 'center' as const,
    margin: ' auto',
    padding: '10px',
    zIndex: 10,
    height:'100%',
  },
  list: {
    listStyleType: 'none' as const,
    padding: 0,
    
  },
  listItem: {
    padding: '10px 0',
    borderBottom: '1px solid #ddd',
    fontSize: '18px'
  },
};

export default CurrencyList;
