
// import DailyActivity from '../_components/DailyActivity'
import DailyActivityChart from '../_components/DailyActivityChart'
import ScoreChartRadial from '../_components/ScoreChartRadial'
import SmallCard from '../_components/SmallCard'
import PerformanceChart from '../_components/PerformanceChart'
import SessionDurationChart from '../_components/SessionDurationChart'

const URL = 'http://localhost:3000/user'

const getData = async (userId, breakpoint) => {
  const res = await fetch(`${URL}/${userId}${breakpoint}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {
  const [userData, perfData, activityData, sessionsData] = await Promise.all(
    [
      getData(12, ''),
      getData(12, '/performance'),
      getData(12, '/activity'),
      getData(12, '/average-sessions')
    ]
  )

  const dataStat = userData.data.keyData
  const userInfos = userData.data.userInfos

  const todayScore = userData.data.todayScore

  return (
    <main className='mx-auto my-10'>
      <h1 className='text-5xl mb-4'>
        Bonjour
        <span className='text-secondary'>{` ${userInfos.firstName}`}</span>
      </h1>
      <p className="mb-10">Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      <div className="flex flex-col-reverse desktop:flex-row gap-8">
        <div className='flex flex-col gap-6'>
          {/* <DailyActivity data={activityData.data} /> */}
          <DailyActivityChart data={activityData.data} />
          <div className='flex justify-between'>
            <SessionDurationChart data={sessionsData.data} />
            <PerformanceChart data={perfData.data} />
            <ScoreChartRadial data={todayScore} />

          </div>
        </div>
        <div className='flex flex-row justify-between desktop:flex-col'>
          <SmallCard
            img='calories-icon.png'
            textAlt='icon calories'
            text={{
              title: `${dataStat.calorieCount}kCal`,
              text: 'Calories'
            }}
          />
          <SmallCard
            img='protein-icon.png'
            textAlt='icon protéines'
            text={{
              title: `${dataStat.proteinCount}g`,
              text: 'Protéines'
            }}
          />
          <SmallCard
            img='carbs-icon.png'
            textAlt='icon glucides'
            text={{
              title: `${dataStat.carbohydrateCount}g`,
              text: 'Glucides'
            }}
          />
          <SmallCard
            img='fat-icon.png'
            textAlt='icon lipides'
            text={{
              title: `${dataStat.lipidCount}g`,
              text: ''
            }}
          />
        </div>
      </div>
    </main>
  )
}