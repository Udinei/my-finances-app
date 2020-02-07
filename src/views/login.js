import React, { Component } from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-groups'
import { withRouter } from 'react-router-dom'

import UsuarioService from '../app/service/usuarioService'


import { mensagemErro } from '../components/toastr'

import { AuthContext } from '../main/provedorAutenticacao' // usando { } porque as variaveis não sao export default, somente a classe

class Login extends Component {

    state = {
        email: '',
        senha: '',

    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    // entrar é uma funcao callback e pode ser chamada assim: {this.entrar}  
    entrar = () => {

        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha

        }).then(response => {
            //LocalStorageService.adicionarItem('_usuario_logado', response.data) //para ober o usuario logado 
            this.context.iniciarSessao(response.data)
            this.props.history.push('/home')

        }).catch(erro => {
            mensagemErro(erro.response.data)
        })

    }


    prepareCadastrar = () => {
        this.props.history.push('/cadastro-usuarios');
    }

    render() {
        return (

            <div className="row">
                <div className="container col-sm-* col-md-* col-lg-6">
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                                <input type="email"
                                                    value={ this.state.email }
                                                    onChange={ e => this.setState({ email: e.target.value }) } // e = evento                                                        
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Digite o Email" />
                                            </FormGroup>
                                            <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                                <input type="password"
                                                    value={ this.state.senha }
                                                    onChange={ e => this.setState({ senha: e.target.value }) }
                                                    className="form-control"
                                                    id="exampleInputPassword1"
                                                    placeholder="Password" />
                                            </FormGroup>
                                            <button onClick={ this.entrar }
                                                className="btn btn-success">
                                                <i className="pi pi-sign-in"></i> Entrar
                                            </button>
                                            <button onClick={ this.prepareCadastrar }
                                                className="btn btn-danger">
                                                <i className="pi pi-plus"></i>  Cadastrar
                                            </button>

                                        </fieldset>
                                    </div>
                                </div>
                            </div>

                        </Card>
                    </div>
                </div>
            </div>


        )
    }
}

// inscrevendo o componente de classe no contexto de autenticao, para obter o usuario logado
// somente componentes de classe possuem contextType
Login.contextType = AuthContext

export default withRouter(Login)