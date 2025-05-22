import React, { useState, useEffect, useMemo } from 'react';
import MapComponent from './components/MapComponent/MapComponent';
import DataPanel from './components/DataPanel/DataPanel';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import './index.css';

function App() {
  const [drillholesData, setDrillholesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:3001/api/drillholes');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDrillholesData(data);
      } catch (e) {
        setError(e.message);
        console.error('Error fetching data:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  // Extract unique companies and years from the fetched data
  const companies = useMemo(() => {
    if (!drillholesData) return ['all'];
    const uniqueCompanies = [...new Set(drillholesData.features.map(f => f.properties.Company).filter(c => c !== null))];
    return ['all', ...uniqueCompanies.sort()];
  }, [drillholesData]);

  const yearsDrilled = useMemo(() => {
    if (!drillholesData) return [];
    const uniqueYears = [...new Set(drillholesData.features.map(f => f.properties['Year Drilled']).filter(y => y !== null))];
    return uniqueYears.sort((a, b) => a - b);
  }, [drillholesData]);

  // Filter drillholes based on selectedCompany and selectedYear
  const filteredDrillholes = useMemo(() => {
    if (!drillholesData) return { type: 'FeatureCollection', features: [] };
    let filtered = drillholesData.features;

    if (selectedCompany !== 'all') {
      filtered = filtered.filter(f => f.properties.Company === selectedCompany);
    }

    if (selectedYear !== 'all') {
      filtered = filtered.filter(f => f.properties['Year Drilled'] === selectedYear);
    }

    return { ...drillholesData, features: filtered };
  }, [drillholesData, selectedCompany, selectedYear]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error loading data: {error}</div>;
  }

  return (
    <div className="App">
      <div className="controls-panel">
        <h2>Drillhole Map Filters</h2>

        {/* Company Filter */}
        <div className="control-group">
          <label htmlFor="company-filter">Filter by Company:</label>
          <select
            id="company-filter"
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            disabled={loading || error}
          >
            {companies.map(company => (
              <option key={company} value={company}>
                {company === 'all' ? 'All Companies' : company}
              </option>
            ))}
          </select>
        </div>

        {/* Year Drilled Slider */}
        <div className="control-group">
          <label htmlFor="year-slider">
            Filter by Year: <span id="current-year-display">{selectedYear === 'all' ? 'All Years' : selectedYear}</span>
          </label>
          <input
            type="range"
            id="year-slider"
            min="0"
            max={yearsDrilled.length}
            value={selectedYear === 'all' ? yearsDrilled.length : yearsDrilled.indexOf(selectedYear)}
            onChange={(e) => {
              const sliderIndex = parseInt(e.target.value, 10);
              if (sliderIndex === yearsDrilled.length) {
                setSelectedYear('all');
              } else {
                setSelectedYear(yearsDrilled[sliderIndex]);
              }
            }}
            disabled={loading || error || yearsDrilled.length === 0}
          />
        </div>

        {/* Legend for Total Depth Coloring */}
        <div className="legend">
          <h3>Total Depth Legend:</h3>
          <div><span style={{ backgroundColor: '#28a745' }} className="legend-color-box"></span> &lt; 300m (Shallow)</div>
          <div><span style={{ backgroundColor: '#ffc107' }} className="legend-color-box"></span> 300m - 700m (Medium)</div>
          <div><span style={{ backgroundColor: '#dc3545' }} className="legend-color-box"></span> &gt; 700m (Deep)</div>
          <div><span style={{ backgroundColor: '#3388ff' }} className="legend-color-box"></span> No Depth Data</div>
        </div>
      </div>

      {drillholesData && <MapComponent filteredDrillholes={filteredDrillholes} />}
      {drillholesData && <DataPanel data={filteredDrillholes} />}
    </div>
  );
}

export default App;








// WITHOUT NODEJS API CALL
// import React, { useState, useEffect, useMemo } from 'react';
// import MapComponent from './components/MapComponent/MapComponent';
// import DataPanel from './components/DataPanel/DataPanel';
// import drillholesData from './data/drillholes.json';
// import './index.css';

// function App() {
//   const [selectedCompany, setSelectedCompany] = useState('all');
//   const [selectedYear, setSelectedYear] = useState('all');

//   // Extract unique companies and years from the original data
//   const companies = useMemo(() => {
//     const uniqueCompanies = [...new Set(drillholesData.features.map(f => f.properties.Company).filter(c => c !== null))];
//     return ['all', ...uniqueCompanies.sort()];
//   }, []);

//   const yearsDrilled = useMemo(() => {
//     const uniqueYears = [...new Set(drillholesData.features.map(f => f.properties['Year Drilled']).filter(y => y !== null))];
//     return uniqueYears.sort((a, b) => a - b);
//   }, []);

//   // Filter drillholes based on selectedCompany and selectedYear
//   const filteredDrillholes = useMemo(() => {
//     let filtered = drillholesData.features;

//     if (selectedCompany !== 'all') {
//       filtered = filtered.filter(f => f.properties.Company === selectedCompany);
//     }

//     if (selectedYear !== 'all') {
//       filtered = filtered.filter(f => f.properties['Year Drilled'] === selectedYear);
//     }

//     return { ...drillholesData, features: filtered };
//   }, [selectedCompany, selectedYear]);

//   return (
//     <div className="App">
//       <div className="controls-panel">
//         <h2>Drillhole Map Filters</h2>

//         {/* Company Filter */}
//         <div className="control-group">
//           <label htmlFor="company-filter">Filter by Company:</label>
//           <select
//             id="company-filter"
//             value={selectedCompany}
//             onChange={(e) => setSelectedCompany(e.target.value)}
//           >
//             {companies.map(company => (
//               <option key={company} value={company}>
//                 {company === 'all' ? 'All Companies' : company}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Year Drilled Slider */}
//         <div className="control-group">
//           <label htmlFor="year-slider">
//             Filter by Year: <span id="current-year-display">{selectedYear === 'all' ? 'All Years' : selectedYear}</span>
//           </label>
//           <input
//             type="range"
//             id="year-slider"
//             min="0"
//             max={yearsDrilled.length} // max index for the years array + 1 for 'All Years'
//             value={selectedYear === 'all' ? yearsDrilled.length : yearsDrilled.indexOf(selectedYear)}
//             onChange={(e) => {
//               const sliderIndex = parseInt(e.target.value, 10);
//               if (sliderIndex === yearsDrilled.length) {
//                 setSelectedYear('all');
//               } else {
//                 setSelectedYear(yearsDrilled[sliderIndex]);
//               }
//             }}
//             disabled={yearsDrilled.length === 0}
//           />
//         </div>

//         {/* Legend for Total Depth Coloring */}
//         <div className="legend">
//           <h3>Total Depth Legend:</h3>
//           <div><span style={{ backgroundColor: '#28a745' }} className="legend-color-box"></span> &lt; 300m (Shallow)</div>
//           <div><span style={{ backgroundColor: '#ffc107' }} className="legend-color-box"></span> 300m - 700m (Medium)</div>
//           <div><span style={{ backgroundColor: '#dc3545' }} className="legend-color-box"></span> &gt; 700m (Deep)</div>
//           <div><span style={{ backgroundColor: '#3388ff' }} className="legend-color-box"></span> No Depth Data</div>
//         </div>
//       </div>

//       <MapComponent filteredDrillholes={filteredDrillholes} />
//       <DataPanel data={filteredDrillholes} />
//     </div>
//   );
// }

// export default App;