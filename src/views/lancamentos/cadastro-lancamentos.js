import React, { Component } from 'react'


import Card from '../../components/card'
import FormGroup from '../../components/form-groups'
import SelectMenu from '../../components/selectMenu'

import LancamentoService from '../../app/service/lancamentoService'
import * as messages from '../../components/toastr'

import LocalStorageService from '../../app/service/localStorageService'

import CurrencyInput from 'react-currency-input';

class CadastroLancamentos extends Component {

    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: '',
        usuario: null,
        atualizando: false
    }


    constructor() {
        super()
        this.service = new LancamentoService();
    }

    componentDidMount() {
        const params = this.props.match.params
        if (params.id) {

            this.service
                .obterPorid(params.id)
                .then(response => {
                    this.setState({ ...response.data, atualizando: true })  // seta todos os atributos do objeto vindo do servidor no state, o formulario sera atualizado também
                })
                .catch(erros => {
                    messages.mensagemErro(erros.response.data)
                })

        }
    }

    submit = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        const { descricao, valor, mes, ano, tipo } = this.state;
        const lancamento = { descricao, valor, mes, ano, tipo, usuario: usuarioLogado.id };

        try {
            this.service.validar(lancamento);

        } catch (erro) {
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => messages.mensagemErro(msg))
            return false;
        }

        this.service
            .salvar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamentos')
                messages.mensagemSucesso('Lançamento Cadastrado com sucesso!')

            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    atualizar = () => {

        const { descricao, valor, mes, ano, tipo, status, usuario, id } = this.state;
        const lancamento = { descricao, valor, mes, ano, tipo, usuario, status, id };

        
        this.service
            .atualizar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamentos')
                messages.mensagemSucesso('Lançamento atualizado com sucesso!')

            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name]: value })
    }

    handleChangeCurrency = (event, maskedvalue, floatvalue) => {
        this.setState({ valor: maskedvalue });
    }

    render() {

        const tipos = this.service.obterListaTipos();
        const meses = this.service.obterListaMeses();

        return (
            <Card title={ this.state.atualizando ? 'Atualização de Lançamento' : 'Cadastro de Lançamentos' }>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup htmlFor="inputDescricao" label="Descrição: *">
                            <input id="inputDescricao"
                                type="text"
                                className="form-control"
                                name="descricao"
                                value={ this.state.descricao }
                                onChange={ this.handleChange } />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup htmlFor="inputAno" label="Ano: *">
                            <input id="inputAno"
                                type="text"
                                className="form-control"
                                name="ano"
                                value={ this.state.ano }
                                onChange={ this.handleChange }
                            />

                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup htmlFor="inputMes" label="Mês: *">
                            <SelectMenu id="inputMes"
                                lista={ meses }
                                className="form-control"
                                name="mes"
                                value={ this.state.mes }
                                onChange={ this.handleChange }
                            />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputValor" label="Valor: *" >
                            <CurrencyInput
                                id="inputValor"
                                inputType="text"
                                className="form-control"
                                name="valor"
                                value={ this.state.valor }
                                onChangeEvent={ this.handleChangeCurrency }
                                decimalSeparator=","
                                thousandSeparator="."
                            />
                        </FormGroup>

                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputTipo" label="Tipo: *" >
                            <SelectMenu id="inputTipo"
                                lista={ tipos }
                                className="form-control"
                                name="tipo"
                                value={ this.state.tipo }
                                onChange={ this.handleChange }
                            />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputStatus" label="Status: ">
                            <input type="text"
                                className="form-control"
                                name="status"
                                value={ this.state.status }
                                disabled
                            />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div
                        className="col-md-6">
                        { this.state.atualizando ?
                            (
                                <button onClick={ this.atualizar }
                                    className="btn btn-primary">
                                    <i className="pi pi-refresh"></i>    Atualizar
                                </button>

                            ) : (

                                <button onClick={ this.submit }
                                    className="btn btn-success">
                                    <i className="pi pi-save"></i>Salvar
                                </button>
                            )
                        }
                        <button onClick={ e => this.props.history.push('/consulta-lancamentos') }
                            className="btn btn-danger">
                            <i className="pi pi-times"></i>    Cancelar
                           </button>

                    </div>
                </div>
            </Card>
        )
    }
}

export default CadastroLancamentos