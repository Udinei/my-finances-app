//import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';

import Rotas from './rotas'
import Navbar from '../components/navbar'
import ProvedorAutenticacao from './provedorAutenticacao'
import 'toastr/build/toastr.min.js'

// primeiro instalar o bootswatch: yarn 
import 'bootswatch/dist/flatly/bootstrap.css'
//import $ from 'jquery/dist/jquery.js'
//import '../bootswatch_files/custom.min.js'

import '../custom.css'
import 'toastr/build/toastr.css'


import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

class App extends Component {

  render() {
    return (
      <>
        <ProvedorAutenticacao>
       
          <Navbar />

          <div className="container">
            <Rotas />
          </div>
        </ProvedorAutenticacao>
      </>

    )
  };
}

export default App;
