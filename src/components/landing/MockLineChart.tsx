import { useTranslation } from "react-i18next";

export default function MockLineChart() {
  const { t } = useTranslation();

  const data = [
    { month: "Jan", value: 2500 },
    { month: "Fév", value: 3200 },
    { month: "Mar", value: 2900 },
    { month: "Avr", value: 4100 },
    { month: "Mai", value: 4800 },
    { month: "Jun", value: 5600 },
  ];

  const maxValue = 6000;
  const width = 400;
  const height = 200;
  const padding = 40;

  const points = data
    .map((item, index) => {
      const x = padding + (index * (width - 2 * padding)) / (data.length - 1);
      const y =
        height - padding - (item.value / maxValue) * (height - 2 * padding);
      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = `${padding},${height - padding} ${points} ${width - padding},${height - padding}`;

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 bg-white rounded-xl">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900">
          {t("charts.lineChart.title")}
        </h3>
        <p className="text-sm text-gray-500">
          {t("charts.lineChart.subtitle")}
        </p>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <g className="opacity-20">
          {[0, 25, 50, 75, 100].map((percent) => {
            const y =
              height - padding - (percent / 100) * (height - 2 * padding);
            return (
              <line
                key={percent}
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="#94a3b8"
                strokeWidth="1"
                strokeDasharray="4,4"
              />
            );
          })}
        </g>

        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D32F2F" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#D32F2F" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <polygon points={areaPoints} fill="url(#areaGradient)" />

        <polyline
          points={points}
          fill="none"
          stroke="#D32F2F"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {data.map((item, index) => {
          const x =
            padding + (index * (width - 2 * padding)) / (data.length - 1);
          const y =
            height -
            padding -
            (item.value / maxValue) * (height - 2 * padding);
          return (
            <g key={index}>
              <circle
                cx={x}
                cy={y}
                r="5"
                fill="#fff"
                stroke="#D32F2F"
                strokeWidth="2"
              />
              <text
                x={x}
                y={y - 15}
                textAnchor="middle"
                className="text-xs font-semibold fill-gray-700"
              >
                {item.value}€
              </text>
            </g>
          );
        })}

        {data.map((item, index) => {
          const x =
            padding + (index * (width - 2 * padding)) / (data.length - 1);
          return (
            <text
              key={index}
              x={x}
              y={height - 10}
              textAnchor="middle"
              className="text-xs fill-gray-600 font-medium"
            >
              {item.month}
            </text>
          );
        })}

        {[0, 2000, 4000, 6000].map((value, index) => {
          const y =
            height -
            padding -
            (value / maxValue) * (height - 2 * padding);
          return (
            <text
              key={index}
              x={padding - 10}
              y={y + 4}
              textAnchor="end"
              className="text-xs fill-gray-600"
            >
              {value}€
            </text>
          );
        })}
      </svg>

      <div className="flex items-center gap-2 mt-4">
        <div className="w-4 h-1 bg-primary-600 rounded"></div>
        <span className="text-xs text-gray-600">
          {t("charts.lineChart.legend")}
        </span>
      </div>
    </div>
  );
}
