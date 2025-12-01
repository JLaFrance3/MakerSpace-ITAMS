/**
 * StockLevelsChart.tsx
 * An interactive bar chart that displays general inventory
 * data and provides more detailed inventory information upon
 * clicking individual bars
 */

import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
// import type { Item } from '../types/index.ts';
import { Alert, Container, Spinner } from 'react-bootstrap';
import { ItemDetailModal } from '../components/ItemDetailModal';
// import { setChartData } from 'recharts/types/state/chartDataSlice';

type ChartData = {
  name: string;
  total: number;
  lowThreshold: number;
  units: string;
};

type ItemVariant = {
  name: string;
  total: number;
  lowThreshold: number;
  units: string;
};

const ITEM_VARIANTS: { [key: string]: ItemVariant[] } = {
  Filament: [
    { name: 'ABS Filament', total: 30, lowThreshold: 20, units: 'meters' },
    { name: 'PLA Filament', total: 15, lowThreshold: 20, units: 'meters' },
    { name: 'SBU Filament', total: 15, lowThreshold: 8, units: 'meters' },
  ],
  Vinyl: [
    { name: 'Red Vinyl', total: 5, lowThreshold: 10, units: 'meters' },
    { name: 'Blue Vinyl', total: 3, lowThreshold: 10, units: 'meters' },
    { name: 'Clear Vinyl', total: 2, lowThreshold: 5, units: 'meters' },
  ],
  Wood: [
    { name: 'Pine Wood', total: 12, lowThreshold: 5, units: 'pcs' },
    { name: 'Oak Wood', total: 5, lowThreshold: 3, units: 'pcs' },
    { name: 'Plywood', total: 3, lowThreshold: 2, units: 'pcs' },
  ],
};

function StockLevelsChart() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>('');

  const handleItemClick = (itemName: string) => {
    setSelectedItem(itemName);
    setShowModal(true);
  };

  // Fetch data
  useEffect(() => {
    setLoading(true);
    setError(null);

    /**
     * TODO: async function?
     * Here's some fake data in the interim
     */
    const fakeChartData: ChartData[] = [
      {
        name: 'Filament',
        total: 60,
        lowThreshold: 20,
        units: 'meters',
      },
      {
        name: 'Vinyl',
        total: 10,
        lowThreshold: 20,
        units: 'meters',
      },
      {
        name: 'Wood',
        total: 20,
        lowThreshold: 8,
        units: 'pcs',
      },
    ];

    
    setData(fakeChartData); //TODO: set chart data with http response
    setLoading(false);
  }, []);

  return (
    <>
      <h1>Stock Levels</h1>
      <ResponsiveContainer width="100%" aspect={1.618} maxHeight={500}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="name" cursor="pointer" onClick={(e) => {
            if (e && e.payload && e.payload.name) {
              handleItemClick(e.payload.name);
            }
          }} />
          <YAxis />
          <CartesianGrid strokeDasharray={'3 3'} />
          <Bar dataKey="total" fill="#8884d8" onClick={(e) => {
            if (e && e.payload && e.payload.name) {
              handleItemClick(e.payload.name);
            }
          }} cursor="pointer" />
        </BarChart>
      </ResponsiveContainer>

      <ItemDetailModal
        show={showModal}
        itemName={selectedItem}
        variants={ITEM_VARIANTS[selectedItem] || []}
        onHide={() => setShowModal(false)}
      />
    </>
  );
}

export default StockLevelsChart;
