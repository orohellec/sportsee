export default function ({ img, textAlt, text }) {

  return (
    <div className="p-6 flex bg-c-gray gap-4">
      <img src={img} alt={textAlt} />
      <div className='flex-col'>
        <h3 className='font-bold text-xl'>{text.title}</h3>
        <p className='text-tertiary text-sm'>{text.text}</p>
      </div>
    </div>
  )
}