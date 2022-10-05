import Card from '../components/Card'
// import Tinder from '../components/TinderEx'
import Header from '../components/Header'
const style = {
  wrapper: `h-screen w-screen flex flex-col bg-[#161816]`,
  cardsContainer: `flex flex-col items-center justify-center flex-1 overflow-hidden`,
}
export default function Home() {
  return (
    <div className={style.wrapper}>
      <Header />
      <div className={style.cardsContainer}>
        <Card />
        {/* <Tinder /> */}
      </div>
    </div>
  )
}
