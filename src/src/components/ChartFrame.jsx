import { useState } from "react";
import { Download, Maximize2, X } from "lucide-react";
import { LineChart, Line, BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export function ChartFrame({ data, type = "line", title, xKey = "x", yKey = "y", yKey2 }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  
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

    const commonProps = {
      data,
      margin: { top: 20, right: 30, left: 20, bottom: 20 },
    };

    switch (type) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height="100%" minHeight={300}>
            <BarChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey={Object.keys(data[0])[0]} stroke="#5a6c7d" style={{ fontSize: '14px' }} />
              <YAxis stroke="#5a6c7d" style={{ fontSize: '14px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "white", 
                  border: "2px solid #66BB6A",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                }} 
              />
              <Legend wrapperStyle={{ fontSize: '14px' }} />
              <Bar dataKey={Object.keys(data[0])[1]} fill="#66BB6A" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case "scatter":
        return (
          <ResponsiveContainer width="100%" height="100%" minHeight={300}>
            <ScatterChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey={Object.keys(data[0])[0]} stroke="#5a6c7d" style={{ fontSize: '14px' }} />
              <YAxis dataKey={Object.keys(data[0])[1]} stroke="#5a6c7d" style={{ fontSize: '14px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "white", 
                  border: "2px solid #66BB6A",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                }} 
              />
              <Scatter name="Data Points" data={data} fill="#66BB6A" />
            </ScatterChart>
          </ResponsiveContainer>
        );

      case "line":
      default:
        const keys = Object.keys(data[0]);
        const dataKey1 = keys[1];
        const dataKey2 = keys[2];
        
        return (
          <ResponsiveContainer width="100%" height="100%" minHeight={300}>
            <LineChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey={keys[0]} stroke="#5a6c7d" style={{ fontSize: '14px' }} />
              <YAxis stroke="#5a6c7d" style={{ fontSize: '14px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "white", 
                  border: "2px solid #66BB6A",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                }} 
              />
              <Legend wrapperStyle={{ fontSize: '14px' }} />
              <Line type="monotone" dataKey={dataKey1} stroke="#66BB6A" strokeWidth={3} dot={{ fill: "#66BB6A", r: 5 }} />
              {dataKey2 && <Line type="monotone" dataKey={dataKey2} stroke="#2E7D32" strokeWidth={3} dot={{ fill: "#2E7D32", r: 5 }} />}
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };

  const chartContent = (
    <div 
      className={isFullscreen ? "bg-white rounded-xl p-6 shadow-2xl flex flex-col" : "bg-white border-2 border-[#C8E6C9] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"} 
      style={isFullscreen ? { width: '90vw', height: '90vh', maxHeight: '90vh' } : { width: '100%' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-[#E8F5E9]" style={{ flexShrink: 0 }}>
        <div>
          <h3 className="text-[#2c3e50] mb-1">{title}</h3>
          <p className="text-sm text-[#5a6c7d]">Interactive data visualization</p>
        </div>
        <div className="flex gap-2">
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
      <div className="flex gap-3 pt-4 border-t-2 border-[#E8F5E9]" style={{ flexShrink: 0 }}>
        <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#2E7D32] text-white rounded-lg hover:bg-[#1B5E20] hover:shadow-lg transition-all">
          <Download className="w-4 h-4" />
          Download Data
        </button>
        <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#66BB6A] text-white rounded-lg hover:bg-[#388E3C] hover:shadow-lg transition-all">
          <Download className="w-4 h-4" />
          Download Figure
        </button>
      </div>
    </div>
  );

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-8">
        {chartContent}
      </div>
    );
  }

  return chartContent;
}
