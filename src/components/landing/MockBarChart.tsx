import { useTranslation } from "react-i18next";

export default function MockBarChart() {
  const { t } = useTranslation();

  const data = [
    { month: "Jan", value: 45, label: "45" },
    { month: "Fév", value: 62, label: "62" },
    { month: "Mar", value: 58, label: "58" },
    { month: "Avr", value: 75, label: "75" },
    { month: "Mai", value: 88, label: "88" },
    { month: "Jun", value: 95, label: "95" },
  ];

  const maxValue = 100;

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 bg-white rounded-xl">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900">
          {t("charts.barChart.title")}
        </h3>
        <p className="text-sm text-gray-500">{t("charts.barChart.subtitle")}</p>
      </div>

      <div className="flex-1 flex items-end justify-around gap-3">
        {data.map((item, index) => {
          const height = (item.value / maxValue) * 100;
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="w-full flex flex-col items-center justify-end h-48">
                <div
                  className="w-full bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-lg transition-all duration-500 hover:scale-105 relative group"
                  style={{ height: `${height}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {item.label} {t("charts.barChart.sets")}
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-2 font-medium">
                {item.month}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
