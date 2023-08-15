import Link from 'next/link'
import '../_styles/NavbarLeft.css'

const NavbarLeft = () => {
  return (
    <div className='relative'>
      <nav className="navbar-left bg-primary p-6 w-[120px] flex flex-col items-center justify-center">
        <Link href="#" className="py-5">
          <img src="yoga.png" alt="yoga" />
        </Link>
        <Link href="#" className="py-5">
          <img src="swim.png" alt="Natation" />
        </Link>
        <Link href="#" className="py-5">
          <img src="bike.png" alt="Vélo" />
        </Link>
        <Link href="#" className="py-5">
          <img src="weight.png" alt="Haltère" />
        </Link>

      </nav>
      <p
        style={{
          position: 'absolute',
          bottom: '60px',
          left: '50%',
          writingMode: 'vertical-lr',
          color: 'white',
          transform: 'rotate(180deg) translateX(50%)',
          fontSize: '12px'
        }}
      >
        Copiryght, SportSee 2020
      </p>
    </div>
  )
}

export default NavbarLeft