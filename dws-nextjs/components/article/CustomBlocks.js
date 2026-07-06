import React from "react";

export function ArticleChart({ value }) {
  if (!value || !value.data || value.data.length === 0) return null;

  const { title, chartType, data } = value;
  const maxVal = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="bg-white border border-blue-50/50 rounded-2xl p-5 sm:p-6 my-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h4 className="text-brand-darkBg font-display font-bold text-sm sm:text-base">
          {title}
        </h4>
        <span className="text-[9px] uppercase font-extrabold tracking-widest px-2.5 py-1 rounded-full bg-brand-blue/5 text-brand-blue">
          {chartType === "bar" ? "Grafik Batang" : chartType === "line" ? "Grafik Garis" : "Grafik Lingkaran"}
        </span>
      </div>

      {chartType === "bar" && (
        <div className="pt-6 pb-2">
          {/* Vertical Bar Chart Grid */}
          <div className="flex items-end justify-between h-48 gap-3 sm:gap-6 border-b border-gray-100 pb-2 px-2">
            {data.map((item, idx) => {
              const heightPct = (item.value / maxVal) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                  {/* Tooltip */}
                  <div className="absolute -top-10 bg-brand-darkBg text-white text-[10px] font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md z-10 whitespace-nowrap">
                    {item.value}
                  </div>
                  
                  {/* Bar */}
                  <div 
                    style={{ height: `${heightPct}%` }}
                    className="w-full bg-gradient-to-t from-brand-blue to-brand-blueLight rounded-t-lg group-hover:brightness-110 transition-all duration-300 shadow-sm relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Value on top of bar */}
                  <span className="text-[10px] font-bold text-gray-500 mt-2">
                    {item.value}
                  </span>
                </div>
              );
            })}
          </div>
          
          {/* Labels */}
          <div className="flex justify-between gap-3 sm:gap-6 pt-2 px-2">
            {data.map((item, idx) => (
              <div key={idx} className="flex-1 text-center">
                <span className="text-[10px] sm:text-xs font-semibold text-gray-600 line-clamp-2 leading-tight">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {chartType === "line" && (
        <div className="pt-4 pb-2">
          {/* SVG Line Chart */}
          <div className="relative w-full h-48">
            <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
              {/* Grid Lines */}
              <line x1="0" y1="20" x2="500" y2="20" stroke="#F3F4F6" strokeWidth="1" />
              <line x1="0" y1="70" x2="500" y2="70" stroke="#F3F4F6" strokeWidth="1" />
              <line x1="0" y1="120" x2="500" y2="120" stroke="#F3F4F6" strokeWidth="1" />
              <line x1="0" y1="170" x2="500" y2="170" stroke="#F3F4F6" strokeWidth="1" />

              {/* Data Path */}
              {(() => {
                const points = data.map((item, idx) => {
                  const x = (idx / (data.length - 1)) * 480 + 10;
                  const y = 170 - (item.value / maxVal) * 140;
                  return { x, y };
                });
                
                const d = points.reduce((acc, p, idx) => {
                  return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
                }, "");

                return (
                  <>
                    <path 
                      d={d} 
                      fill="none" 
                      stroke="#0F80FF" 
                      strokeWidth="6" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="opacity-15"
                    />
                    <path 
                      d={d} 
                      fill="none" 
                      stroke="#0F80FF" 
                      strokeWidth="3" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                    {points.map((p, idx) => (
                      <g key={idx} className="group cursor-pointer">
                        <circle 
                          cx={p.x} 
                          cy={p.y} 
                          r="6" 
                          fill="#FFFFFF" 
                          stroke="#0F80FF" 
                          strokeWidth="3"
                        />
                        <text 
                          x={p.x} 
                          y={p.y - 12} 
                          textAnchor="middle" 
                          className="text-[10px] font-bold fill-gray-500 opacity-80"
                        >
                          {data[idx].value}
                        </text>
                      </g>
                    ))}
                  </>
                );
              })()}
            </svg>
          </div>

          {/* Labels */}
          <div className="flex justify-between pt-3 text-[10px] sm:text-xs font-semibold text-gray-500 px-1">
            {data.map((item, idx) => (
              <span key={idx} style={{ width: `${100 / data.length}%` }} className="text-center truncate">
                {item.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {chartType === "pie" && (
        <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-4">
          {/* Donut Chart */}
          <div className="relative w-32 h-32 shrink-0">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="#F3F4F6" strokeWidth="3" />
              {(() => {
                const total = data.reduce((acc, d) => acc + d.value, 0);
                let currentOffset = 0;
                const colors = ["#0F80FF", "#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE", "#DBEAFE"];

                return data.map((item, idx) => {
                  const sharePct = (item.value / total) * 100;
                  const strokeDash = `${sharePct} ${100 - sharePct}`;
                  const offset = 100 - currentOffset;
                  currentOffset += sharePct;
                  
                  return (
                    <circle
                      key={idx}
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="none"
                      stroke={colors[idx % colors.length]}
                      strokeWidth="3.2"
                      strokeDasharray={strokeDash}
                      strokeDashoffset={offset}
                      className="transition-all duration-300 cursor-pointer"
                    />
                  );
                });
              })()}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Total</span>
              <span className="text-sm font-extrabold text-brand-darkBg">
                {data.reduce((acc, d) => acc + d.value, 0)}
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex-grow space-y-2 max-w-xs w-full">
            {(() => {
              const total = data.reduce((acc, d) => acc + d.value, 0);
              const colors = ["#0F80FF", "#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE", "#DBEAFE"];
              
              return data.map((item, idx) => {
                const sharePct = ((item.value / total) * 100).toFixed(1);
                return (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: colors[idx % colors.length] }}></span>
                      <span className="font-semibold text-gray-600 truncate max-w-[120px]">{item.label}</span>
                    </div>
                    <span className="font-bold text-gray-700">{item.value} ({sharePct}%)</span>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

export function ArticleMarkdown({ value }) {
  if (!value || !value.markdownText) return null;

  const lines = value.markdownText.split("\n");
  
  return (
    <div className="space-y-3 my-6">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return null;

        // Headings
        if (trimmed.startsWith("# ")) {
          return <h2 key={idx} className="text-xl font-bold text-brand-darkBg mt-6 mb-2 border-b border-gray-100 pb-2">{trimmed.slice(2)}</h2>;
        }
        if (trimmed.startsWith("## ")) {
          return <h3 key={idx} className="text-lg font-bold text-brand-darkBg mt-4 mb-2">{trimmed.slice(3)}</h3>;
        }
        if (trimmed.startsWith("### ")) {
          return <h4 key={idx} className="text-base font-bold text-brand-darkBg mt-3 mb-2">{trimmed.slice(4)}</h4>;
        }

        // List item
        if (trimmed.startsWith("- ")) {
          return (
            <ul key={idx} className="list-disc list-inside ml-4 text-gray-600 text-sm sm:text-base">
              <li>{trimmed.slice(2)}</li>
            </ul>
          );
        }

        // Table row parsing
        if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
          if (trimmed.includes("---")) return null;
          
          const cells = trimmed.split("|").map(c => c.trim()).filter((_, i, arr) => i > 0 && i < arr.length - 1);
          return (
            <div key={idx} className="overflow-x-auto my-1">
              <table className="min-w-full border-collapse border border-gray-100">
                <tbody>
                  <tr className="bg-gray-50/50">
                    {cells.map((cell, cIdx) => (
                      <td key={cIdx} className="border border-gray-100 px-4 py-2 text-xs sm:text-sm text-gray-600 font-medium">
                        {cell}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          );
        }

        // Bold & Italic inline formatting helper
        const renderFormattedText = (text) => {
          // simple bold and italic parsing
          let parts = [text];
          // **bold**
          const boldRegex = /\*\*(.*?)\*\*/g;
          let match;
          
          return (
            <span>
              {text.split(boldRegex).map((part, i) => {
                if (i % 2 === 1) {
                  return <strong key={i} className="font-bold text-gray-800">{part}</strong>;
                }
                return part;
              })}
            </span>
          );
        };

        // Default paragraph
        return (
          <p key={idx} className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {renderFormattedText(trimmed)}
          </p>
        );
      })}
    </div>
  );
}
