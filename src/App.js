import { useEffect, Fragment } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { sendCartData } from './store/cart-slice';
import Notification from './components/UI/Notification';

let isInitial= true; // I am writting this initial here because it only initialize when
//app is run 1st and does not get re-render which is exactly what i need not to show notification-
//at very 1st.

function App() {

  const showCart= useSelector(state=> state.ui.cartIsVisible);
  const cart= useSelector(state=> state.cart);
  const dispatch= useDispatch();
  const notification= useSelector(state=> state.ui.notification);

  useEffect(()=>{
    if (isInitial){
      isInitial= false;
      return;
    }
    dispatch(sendCartData(cart));
  }, [cart, dispatch]);
  
  return (
    <Fragment>
      {notification && <Notification
       status= {notification.status}
       title= {notification.title}
       message= {notification.message}
       />}
      <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
    </Fragment>
    
  );
}

export default App;