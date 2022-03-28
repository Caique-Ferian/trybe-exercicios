import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loadingHeader: true,
    };
  }

  componentDidMount() {
    this.gettingUser();
  }

   gettingUser = async () => {
     const value = await getUser();
     this.setState({
       loadingHeader: false,
       userName: value.name,
     });
   }

   render() {
     const { userName, loadingHeader } = this.state;
     return (
       <div>
         {loadingHeader ? <Loading />
           : (
             <header data-testid="header-component">
               <p data-testid="header-user-name">{ `Bem vindo, ${userName}` }</p>
               <Link to="/search" data-testid="link-to-search">Search</Link>
               <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
               <Link to="/profile" data-testid="link-to-profile">Profile</Link>
             </header>)}
       </div>
     );
   }
}
export default Header;
