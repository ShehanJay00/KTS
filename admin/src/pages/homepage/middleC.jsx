import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Nov",
    Gamapaha: 2400,
    Minuwangoda: 2600,
    Yakkala: 3400,
    Nittabuwa: 6369,
  },
  {
    name: "Dec",
    Gamapaha: 3400,
    Minuwangoda: 2550,
    Yakkala: 1400,
    Nittabuwa: 4529,
  },
  {
    name: "Jan",
    Gamapaha: 1800,
    Minuwangoda: 2800,
    Yakkala: 4400,
    Nittabuwa: 1869,
  },
  {
    name: "Feb",
    Gamapaha: 4580,
    Minuwangoda: 2300,
    Yakkala: 2400,
    Nittabuwa: 2454,
  },
  {
    name: "Mar",
    Gamapaha: 4500,
    Minuwangoda: 6400,
    Yakkala: 2800,
    Nittabuwa: 3389,
  },
  {
    name: "Apr",
    Gamapaha: 4000,
    Minuwangoda: 2400,
    Yakkala: 2400,
    Nittabuwa: 4555,
  },
  {
    name: "May",
    Gamapaha: 3000,
    Minuwangoda: 1398,
    Yakkala: 2210,
    Nittabuwa: 3339,
  },
  {
    name: "Jun",
    Gamapaha: 2000,
    Minuwangoda: 6800,
    Yakkala: 2290,
    Nittabuwa: 2339,
  },
  {
    name: "jul",
    Gamapaha: 2780,
    Minuwangoda: 3908,
    Yakkala: 2000,
    Nittabuwa: 1111,
  },
  {
    name: "Aug",
    Gamapaha: 1890,
    Minuwangoda: 4800,
    Yakkala: 2181,
    Nittabuwa: 4555,
  },
  {
    name: "Sep",
    Gamapaha: 2390,
    Minuwangoda: 3800,
    Yakkala: 2500,
    Nittabuwa: 4539,
  },
  {
    name: "Oct",
    Gamapaha: 3490,
    Minuwangoda: 4300,
    Yakkala: 2100,
    Nittabuwa: 6369,
  },
];

function MiddleC() {
  return (
    <div className="w-full h-full bg-gray-200 rounded-[10px] ">
      <div className="flex flex-col w-full h-full pl-2 pr-2">
        <div className="flex  flex-col items-center">
          <div className="font-tinos font-semibold text-lg text-gray-700 text-center">
            Most Profit Routes
          </div>
          <div className="bg-gray-400 h-[1px] w-[20%] relative mb-2">
            <div className="absolute w-[8px] h-[8px] bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-gray-400" />
          </div>
        </div>
        <div className="w-full h-full pr-2">
          <ResponsiveContainer width="100%" height={165}>
            <LineChart data={data}>
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis
                dataKey="name"
                fontSize={11}
                style={{ fontFamily: "roboto", fontWeight: "300" }}
              />
              <YAxis
                type="number"
                domain={["dataMin-100", "dataMax + 40"]}
                fontSize={12}
                width={40}
                tickCount={8}
                style={{ fontFamily: "roboto", fontWeight: "300" }}
              />
              <Tooltip />
              <Legend
                iconType="plainline"
                verticalAlign="top"
                height={30}
                wrapperStyle={{ fontSize: "12px", fontFamily: "roboto" }}
              />
              <Line
                dataKey="Gampaha"
                stroke="#002147"
                dot={false}
                strokeWidth={2}
              />
              <Line
                dataKey="Yakkala"
                stroke="#7A0736"
                dot={false}
                strokeWidth={2}
              />
              <Line
                dataKey="Minuwangoda"
                stroke="#028C98"
                dot={false}
                strokeWidth={2}
              />
              <Line
                dataKey="Nittabuwa"
                stroke="#E3AC2E"
                dot={false}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default MiddleC;
