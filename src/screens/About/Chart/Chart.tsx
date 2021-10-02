import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'
import useSWR from 'swr'
import { useMediaQuery } from '@/utils/useMediaQuery'

const COLORS = [`#0088FE`, `#00C49F`, `#FFBB28`, `#FF8042`]

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  percent: number
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      dominantBaseline='central'
      fill='white'
      textAnchor='middle'
      x={x}
      y={y}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export const Chart = () => {
  const { data } = useSWR<Backend.ContainerStats>(`/container-count`)
  const { matches } = useMediaQuery(`(min-width: 1024px)`)

  return (
    <div style={{ height: 400 }}>
      <ResponsiveContainer height='100%' width='100%'>
        <PieChart height={400} width={300}>
          <Legend
            align={matches ? `right` : `center`}
            layout='vertical'
            verticalAlign={matches ? `middle` : `bottom`}
          />
          <Pie
            cx='50%'
            cy='50%'
            data={data?.map((buildingStats) => ({
              name: buildingStats.building,
              value: buildingStats.count,
            }))}
            dataKey='value'
            fill='#8884d8'
            isAnimationActive={false}
            label={renderCustomizedLabel}
            labelLine={false}
            outerRadius={matches ? 150 : 125}
          >
            {data?.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
