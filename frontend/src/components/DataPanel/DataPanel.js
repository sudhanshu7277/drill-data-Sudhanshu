import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const DataPanel = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (!data || data.features.length === 0) {
      d3.select(chartRef.current).selectAll('*').remove();
      d3.select(chartRef.current).append('p').text('No data for chart.');
      return;
    }

    const companyCounts = {};
    data.features.forEach(feature => {
      const company = feature.properties.Company;
      if (company !== null) {
        companyCounts[company] = (companyCounts[company] || 0) + 1;
      }
    });

    const chartData = Object.entries(companyCounts).map(([company, count]) => ({ company, count }));

    // Clear previous chart
    d3.select(chartRef.current).selectAll('*').remove();
    const margin = { top: 20, right: 20, bottom: 60, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .range([0, width])
      .domain(chartData.map(d => d.company))
      .padding(0.1);

    const y = d3.scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(chartData, d => d.count) || 0]);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    svg.append('g')
      .call(d3.axisLeft(y));

    svg.selectAll('.bar')
      .data(chartData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.company))
      .attr('width', x.bandwidth())
      .attr('y', d => y(d.count))
      .attr('height', d => height - y(d.count))
      .attr('fill', 'steelblue');

  }, [data]);

  return (
    <div style={{ width: '30vw', float: 'right', padding: '10px', overflowY: 'auto', maxHeight: '100vh' }}>
      <h3>Data Insights (Drillholes per Company)</h3>
      <div ref={chartRef}></div>

      <h3>Filtered Drillhole Data</h3>
      <div style={{ maxHeight: 'calc(100vh - 400px)', overflowY: 'auto' }}> {/* Adjust max-height as needed */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Hole ID</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Company</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Total Depth</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Year Drilled</th>
            </tr>
          </thead>
          <tbody>
            {data && data.features.length > 0 ? (
              data.features.map((feature, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{feature.properties.Hole_ID}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{feature.properties.Company || 'N/A'}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{feature.properties['Total depth'] !== null ? feature.properties['Total depth'].toFixed(2) : 'N/A'}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{feature.properties['Year Drilled'] || 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>No data to display.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataPanel;