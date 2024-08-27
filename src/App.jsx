

import CakeView from './features/cake/CakeView'
import IcecreamView from './features/icecream/IcecreamView'
import UserView from './features/user/UserView'


function App() {

  return (
    <>
      <div className='app'>
        <section className='app-section'>
          <CakeView />
          <IcecreamView />
          <UserView />
        </section>
      </div>

    </>
  )
}

export default App
