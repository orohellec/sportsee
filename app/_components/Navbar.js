import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="bg-primary flex h-[95px] pr-[90px] pl-[28px] text-white items-center">
      <Link href="/">
        <img src="logo.png" alt="logo" className="w-[180px] mr-[150px]" />
      </Link>
      <div className="flex items-center justify-between w-full text-2xl">
        <Link href="/" className="">Accueil</Link>
        <Link href="#" className="">Profil</Link>
        <Link href="#" className="">Réglages</Link>
        <Link href="#" className="">Communauté</Link>
      </div>
    </nav>
  )
}

export default Navbar