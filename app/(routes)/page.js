
import DailyActivity from '../_components/DailyActivity'
import Score from '../_components/Score'
import SmallCard from '../_components/SmallCard'

async function getData(userId) {
  const res = await fetch(`http://localhost:3000/user/${userId}`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {
  const { data } = await getData(12)

  const dataStat = data.keyData

  return (
    <main className='mx-auto my-10'>
      <h1 className='text-5xl mb-4'>
        Bonjour
        <span className='text-secondary'>{` ${data.userInfos.firstName}`}</span>
      </h1>
      <p className="mb-10">Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      <div className="flex flex-col-reverse desktop:flex-row gap-8">
        <div className='flex flex-col gap-6'>
          <DailyActivity />
          <div className='flex justify-between'>
            <Score />
            <Score />
            <Score />
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