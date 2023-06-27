
type Props = {}

interface User {
  email: string,
  username: string,
  password: string
}

type Users = User[]

const Homepage = (props: Props) => {


  return (
    <>

      <div className="p-4 sm:ml-64">
        <div>
          <div className="grid grid-cols-3 mb-4 gap-4">
            <div className="flex items-center justify-center">
              <img src="images/cryptopunk.jpg" alt="cryptopunk" />
            </div>
            <div className='grid items-center justify-center p-4 '>
              <span className='text-yellow-100'>LOG IN / <br />SIGN UP <br />AND SWAP<br />NFTS</span>
              <span>
                <i className="fa-solid fa-slash fa-spin-pulse" style={{ color: "#fefc78", }}></i>
                <i className="fa-solid fa-slash fa-spin-pulse" style={{ color: "#fefc78", }}></i>
                <i className="fa-solid fa-slash fa-spin-pulse" style={{ color: "#fefc78", }}></i></span>

            </div>
            <div className="flex items-center justify-center">
              <img src="images/orbital-ape.png" alt="orbital ape" />
            </div>

          </div>
          <div className="flex items-center justify-center mb-4">
            <span className='grid items-center justify-center p-4'>
              <i className="fa-solid fa-slash fa-spin-pulse"></i>
              <i className="fa-solid fa-slash fa-spin-pulse"></i>
              <i className="fa-solid fa-slash fa-spin-pulse"></i>
            </span>
            <h1 className="text-7xl text-indigo-400 border-dotted animate-pulse font-serif">NFT SWAP</h1>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center justify-center ">
              <div className="flex items-center justify-center">
                <img src="images/crego.jpg" alt="NFT by Crego" />
              </div>

            </div>
            <div className="flex items-center justify-center rounded ">
              <img src={`${process.env.PUBLIC_URL}/images/nft-banner.jpg`} className='object-contain' alt="NFT-banner" />

            </div>

          </div>





        </div>
      </div>

    </>
    // <div>
    //   <h1>hello</h1>
    //   <h2>All users:</h2>
    //   {users.map((user, i) => {
    //     return <p key={i}>{user.username}</p>
    //   })}
    //   <h2>User with ID: 6447a2bc1362e69f068f823b</h2>
    //   {user && <p>{user.username}</p>}
    // </div>
  )
}

export default Homepage