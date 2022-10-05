import Image from 'next/image'
import { useContext } from 'react'
import { TinderContext } from '../context/TinderContext'
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSackDollar } from '@fortawesome/free-solid-svg-icons'
// Next.js docs (default import)
import Head from 'next/head';
const style = {
  wrapper: `h-24 py-11 text-white flex w-screen items-center px-16 justify-between`,
  main: `flex items-center gap-4`,
  tinderText: `text-5xl font-semibold mr-8 cursor-pointer`,
  leftMenu: `flex gap-8 text-lg`,
  menuItem: `cursor-pointer hover:text-red-400 duration-300 hover:scale-110`,
  rightMenu: `flex gap-3 items-center`,
  currentAccount: `px-4 py-2 border border-gray-500 rounded-full flex items-center`,
  voteAmount: `px-4 py-2 border border-gray-500 rounded-full flex items-center`,
  accountAddress: `ml-2`,
  authButton: `bg-white font-bold text-blue-500 px-6 py-3 items-center ml-4 rounded-lg hover:bg-blue-500 duration-300 hover:text-white`,
}

const Header = () => {
  const {  currentAccountAddress, votesData } =
    useContext(TinderContext)

  return (
    <>
    {/* use head and add meta tag in head component  */}
    <Head>
        <title></title>
    </Head><div
      className={`${style.wrapper} ${currentAccountAddress ? ' ' : 'bg-transparent fixed'}`}
    >
        <div className={style.main}>
          {/* <Image src={fire} alt='fire' height={45} width={45} /> */}
          <h1 className={style.tinderText}></h1>

          <div className={style.leftMenu}>
            {/* <div className={style.menuItem}>Products</div>
    <div className={style.menuItem}>Learn</div>
    <div className={style.menuItem}>Safety</div>
    <div className={style.menuItem}>Support</div> */}
    <div className={style.menuItem}><Link href="/"><a>Home</a></Link></div>

          </div>
        </div>
        {/* {votesData.map((votes) => ( */}
        <div className={style.rightMenu}>

          {currentAccountAddress ? (
            <>
              <Link href="/votes">
                <a>
                  <span className={style.voteAmount}>
                  <Image
                      src={'https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg'}
                      alt='buy ethereum'
                      height={20}
                      width={20} />
                    &nbsp; {votesData}
                  </span>

                </a>
              </Link>

              <div className={style.currentAccount}>
                {/* <Link href="/profile">
                  <a> */}
                    <Image
                      src={'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Line-style-icons-wallet.svg/38px-Line-style-icons-wallet.svg.png?20170710095905'}
                      alt='wallet address'
                      height={20}
                      width={20} />
                    <span className={style.accountAddress}>
                      {currentAccountAddress.slice(0, 6)}...{currentAccountAddress.slice(39)}
                    </span>
                  {/* </a>
                </Link> */}
              </div>


            </>
          ) : (
           <div></div>
          )}

        </div>
        {/* ))} */}
      </div></>
  )
}

export default Header
