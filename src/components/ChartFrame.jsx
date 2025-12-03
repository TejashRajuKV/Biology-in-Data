import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Download, Maximize2, X } from "lucide-react";
import { LineChart, Line, BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export function ChartFrame({ data, type = "line", title, xKey = "x", yKey = "y", yKey2 }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  // local selection so user can change chart type at runtime
  const [selectedType, setSelectedType] = useState(type);

  // keep local selection in sync if caller changes `type` prop
  useEffect(() => setSelectedType(type), [type]);

  const generateQuickChart = () => {
    if (!data || data.length === 0) return null;

    const keys = Object.keys(data[0]);
    const labels = data.map(item => item[keys[0]]);
    const values = data.map(item => item[keys[1]]);

    let chartConfig;
    switch (selectedType) {
      case "bar":
        chartConfig = {
          type: 'bar',
          data: {
            labels,
            datasets: [{
              label: keys[1],
              data: values,
              backgroundColor: '#66BB6A',
              borderColor: '#2E7D32',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: { display: true, text: title }
            }
          }
        };
        break;
      case "scatter":
        chartConfig = {
          type: 'scatter',
          data: {
            datasets: [{
              label: 'Data Points',
              data: data.map(item => ({ x: item[keys[0]], y: item[keys[1]] })),
              backgroundColor: '#66BB6A',
              borderColor: '#2E7D32'
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: { display: true, text: title }
            }
          }
        };
        break;
      case "line":
      default:
        chartConfig = {
          type: 'line',
          data: {
            labels,
            datasets: [{
              label: keys[1],
              data: values,
              borderColor: '#66BB6A',
              backgroundColor: 'rgba(102, 187, 106, 0.1)',
              fill: true
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: { display: true, text: title }
            }
          }
        };
    }

    const chartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(chartConfig))}`;
    return chartUrl;
  };

  const renderChart = () => {
    if (!data || data.length === 0) {
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          minHeight: '300px',
          color: '#5a6c7d'
        }}>
          No data available
        </div>
      );
    }

    const chartUrl = generateQuickChart();
    if (!chartUrl) return null;

    return (
      <img
        src={chartUrl}
        alt={`${selectedType} chart for ${title}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          borderRadius: '8px'
        }}
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
    );
  };

  const chartRef = useRef(null);

  useEffect(() => {
    if (!isFullscreen) return;

    // lock background scroll and setup keyboard handler for Escape
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") setIsFullscreen(false);
    };

    window.addEventListener("keydown", onKey);

    // focus the modal content for keyboard users
    setTimeout(() => chartRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isFullscreen]);

  const chartContent = (
    <div
      className={isFullscreen ? "bg-white rounded-xl p-6 shadow-2xl flex flex-col" : "bg-white rounded-xl p-5 transition-all"}
      style={
        isFullscreen
          ? { width: '90vw', height: '90vh', maxHeight: '90vh' }
          : {
              width: '100%',
              // stronger card look to make the chart feel more like a card
              border: '1px solid var(--light-mint, #C8E6C9)',
              /* softer, lighter card shadow for a polished look */
              boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.98), rgba(255,255,255,0.99))',
            }
      }
    >
      {/* Header */}
      <div
        className="mb-6 pb-4"
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 12,
          flexShrink: 0,
          borderBottom: '2px solid var(--green-lighter, #E8F5E9)',
          paddingBottom: 14,
        }}
      >
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {/* decorative accent */}
          <div style={{ width: 6, height: 40, background: 'linear-gradient(180deg,var(--deep-forest,#2E7D32),var(--forest-dark,#1B5E20))', borderRadius: 6 }} />
          <div>
            <h3 className="text-[#2c3e50] mb-1" style={{ fontSize: '1.125rem', fontWeight: 700, lineHeight: 1.2 }}>{title}</h3>
            <p className="text-sm text-[#5a6c7d]" style={{ marginTop: 2 }}>Interactive data visualization</p>
          </div>
        </div>
        <div className="flex gap-2" style={{ alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
            <span style={{ color: '#4b5563', fontSize: 13, fontWeight: 400 }}>Chart type</span>
            {/* chart type selector (line / bar / scatter) */}
          </div>
          <label htmlFor="chart-type-select" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span className="sr-only">Chart type</span>
            <select
              id="chart-type-select"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              style={{
                height: 36,
                borderRadius: 8,
                padding: '6px 10px',
                border: '1px solid #e0e0e0',
                background: '#fff',
                color: '#2c3e50',
                fontSize: 14,
                cursor: 'pointer',
              }}
              aria-label="Select chart type"
            >
              <option value="line">Line</option>
              <option value="bar">Bar</option>
              <option value="scatter">Scatter</option>
            </select>
          </label>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2.5 hover:bg-[#E8F5E9] rounded-lg transition-all group border border-[#e0e0e0] hover:border-[#66BB6A]"
            title={isFullscreen ? "Exit fullscreen" : "View fullscreen"}
          >
            {isFullscreen ? (
              <X className="w-4 h-4 text-[#5a6c7d] group-hover:text-[#2E7D32]" />
            ) : (
              <Maximize2 className="w-4 h-4 text-[#5a6c7d] group-hover:text-[#2E7D32]" />
            )}
          </button>
        </div>
      </div>

      {/* Chart */}
      <div
        style={{
          width: '100%',
          height: isFullscreen ? 'calc(90vh - 240px)' : '400px',
          minHeight: isFullscreen ? '400px' : '300px',
          flex: isFullscreen ? '1 1 auto' : 'none',
          position: 'relative'
        }}
        className="mb-6 bg-white rounded-lg p-4"
      >
        {renderChart()}
      </div>

      {/* Download Buttons */}
      <div
        className="flex gap-5 pt-4 border-t-2 border-[#E8F5E9]"
        style={{
          flexShrink: 0,
          // enforce layout and gap in case utility classes are not applied
          display: 'flex',
          gap: '12px',
          paddingTop: '16px',
          borderTop: '2px solid #E8F5E9',
        }}
      >
        <button
          // inline-flex + align-center ensures icon and text sit on the same baseline
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg hover:shadow-lg transition-all border-none"
          style={{
            backgroundColor: '#2E7D32',
            color: '#ffffff',
            border: 'none',
            lineHeight: 1,
            height: 36,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.06) inset',
            paddingLeft: 12,
            paddingRight: 12,
          }}
          aria-label="Download data"
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: 6 }}>
            <Download className="w-4 h-4" style={{ display: 'inline-block', verticalAlign: 'middle' }} />
          </span>
          <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>Download Data</span>
        </button>
        <button
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg hover:shadow-lg transition-all border-none"
          style={{
            backgroundColor: '#2E7D32',
            color: '#ffffff',
            border: 'none',
            lineHeight: 1,
            height: 36,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.06) inset',
            paddingLeft: 12,
            paddingRight: 12,
          }}
          aria-label="Download figure"
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: 6 }}>
            <Download className="w-4 h-4" style={{ display: 'inline-block', verticalAlign: 'middle' }} />
          </span>
          <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>Download Figure</span>
        </button>
      </div>
    </div>
  );

  if (isFullscreen) {
    return createPortal(
      <div
        className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-8"
        role="dialog"
        aria-modal="true"
        onClick={(e) => {
          // if user clicked on the overlay (not the inner chart), close
          if (e.target === e.currentTarget) setIsFullscreen(false);
        }}
      >
        <div tabIndex={-1} ref={chartRef}>
          {chartContent}
        </div>
      </div>,
      document.body,
    );
  }

  return chartContent;
}
