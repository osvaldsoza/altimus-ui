import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {Dialog} from 'primereact/dialog';
import {Message} from 'primereact/message';
import Container from 'react-bootstrap/Container';
import ListaVeiculos from './ListaVeiculos';
import {loadVeiculos, loadVeiculoByPlaca, mergeVeiculo, deleteVeiculo} from "../actions/VeiculoAction";

class veiculos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            placaVeiculo: '',
            veiculos: [],
            opcionais: [],
            opcional: []
        }
    }

    componentDidMount() {
        this.props.loadVeiculos()
    }

    handleGetVeiculosByPlaca = () => {
        let placa = this.state.placaVeiculo
        this.props.loadVeiculoByPlaca(placa)
    }

    handleClickMergeVeiculo = () => {
        this.props.mergeVeiculo(this.state.veiculo)
        this.setState({selectedVeiculo: null, veiculo: '', displayFormVeiculo: false})
    }

    handleClickExcluirVeiculo = () => {
        let codigo = this.state.selectedVeiculo.codigo
        this.props.deleteVeiculo(codigo)
        this.setState({
            selectedVeiculo: null,
            veiculo: null,
            displayFormVeiculo: false
        })
    }

    handleOnChangeField = (property, value) => {
        let veiculo = this.state.veiculo;
        veiculo[property] = typeof value === 'object' ? value.label : value;
        this.setState({veiculo})
    }

    handleVeiculoSelected = (e) => {
        this.ehNovoVeiculo = false;
        this.setState({
            displayFormVeiculo: true,
            veiculo: Object.assign({}, e.data)
        })
    }

    handleClickNovoVeiculo = () => {
        this.ehNovoVeiculo = true;
        this.setState({
            veiculo: {marca: '', placa: '', modelo: '', anoModelo: '', quilometragem: ''},
            displayFormVeiculo: true
        })
    }

    handleClickPesquisarVeiculo = () => {
        this.handleGetVeiculosByPlaca();
        this.setState({placaVeiculo: ''})
    }

    handleOnSelectionChange = (e) => this.setState({selectedVeiculo: e.value, placa: e.value.placa})

    render() {
        let btnNovoVeiculo = <div className="p-clearfix" style={{width: '100%'}}>
            <Button
                style={{float: 'left'}}
                label="Novo Veiculo"
                icon="pi pi-plus"
                onClick={this.handleClickNovoVeiculo}
            />
        </div>

        let corButton = this.ehNovoVeiculo ? "p-button-success" : "p-button-warning"
        let actionsButtons = <div className="ui-dialog-buttonpane p-clearfix">
            <Button
                label="Excluir"
                icon="pi pi-times"
                disabled={this.ehNovoVeiculo}
                onClick={this.handleClickExcluirVeiculo}
                className="p-button-danger p-button-raised p-button-rounded"
            />
            <Button
                label={this.ehNovoVeiculo ? "Salvar" : "Atualizar"}
                icon="pi pi-check"
                onClick={this.handleClickMergeVeiculo}
                disabled={this.ehNovoVeiculo && (this.state.veiculo.marca === '' ||
                    this.state.veiculo.placa === '' ||
                    this.state.veiculo.modelo === '' || this.state.veiculo.anoModelo === '' || this.state.veiculo.quilometragem === '')}
                className={`${corButton} p-button-raised p-button-rounded`}
            />
        </div>

        return (
            <Container>
                <div className="content-section implementation">
                    <div className="d-flex p-col-9" style={{padding: '.5em', marginTop: '1em'}}>
                        <span className="p-float-label">
                            <InputText
                                id="pesquisaVeiculo"
                                className="p-error"
                                onChange={(e) => this.setState({placaVeiculo: e.target.value.toUpperCase()})}
                                value={this.state.placaVeiculo} name="pesquisaVeiculo"/>
                            <label htmlFor="in">Placa do veículo</label>
                        </span>
                        <Button
                            style={{float: 'left'}}
                            label="Pesquisar"
                            onClick={this.handleClickPesquisarVeiculo}
                            disabled={!this.state.placaVeiculo}
                        />
                    </div>

                    <ListaVeiculos
                        veiculos={this.props.veiculos}
                        selectedVeiculo={this.state.selectedVeiculo}
                        handleOnSelectionChange={this.handleOnSelectionChange}
                        handleVeiculoSelected={this.handleVeiculoSelected}
                        btnNovoVeiculo={btnNovoVeiculo}
                    />

                    <Dialog
                        visible={this.state.displayFormVeiculo}
                        width="300px"
                        header="Veiculo"
                        modal={true}
                        footer={actionsButtons}
                        onHide={() => this.setState({displayFormVeiculo: false})}>
                        {
                            this.state.veiculo &&

                            <div className="p-grid p-fluid">
                                <div className="d-flex p-col-9" style={{padding: '.5em', marginBottom: '.3em'}}>
                                    <span className="p-float-label">
                                        <InputText id="placa" className="p-error" onChange={(e) => {
                                            this.handleOnChangeField('placa', e.target.value.toUpperCase())
                                        }} value={this.state.veiculo.placa} name="placa"/>
                                        <label htmlFor="in">Placa</label>
                                    </span>
                                    {
                                        this.state.veiculo.placa === '' &&
                                        <Message severity="error" text="Campo obrigatório" style={{width: '20em'}}/>
                                    }
                                </div>

                                <div className="d-flex p-col-9" style={{padding: '.5em', marginBottom: '.3em'}}>
                                    <span className="p-float-label">
                                        <InputText id="marca" className="p-error" onChange={(e) => {
                                            this.handleOnChangeField('marca', e.target.value.toUpperCase())
                                        }} value={this.state.veiculo.marca} name="marca"/>
                                        <label htmlFor="in">Marca</label>
                                    </span>
                                    {
                                        this.state.veiculo.marca === '' &&
                                        <Message severity="error" text="Campo obrigatório" style={{width: '20em'}}/>
                                    }
                                </div>

                                <div className="d-flex p-col-9" style={{padding: '.5em', marginBottom: '.3em'}}>
                                    <span className="p-float-label">
                                        <InputText className="p-error" id="modelo" onChange={(e) => {
                                            this.handleOnChangeField('modelo', e.target.value.toUpperCase())
                                        }} value={this.state.veiculo.modelo} name="modelo"/>
                                        <label htmlFor="in">Modelo</label>
                                    </span>
                                    {
                                        this.state.veiculo.modelo === '' &&
                                        <Message severity="error" text="Campo obrigatório" style={{width: '20em'}}/>
                                    }
                                </div>

                                <div className="d-flex p-col-9" style={{padding: '.5em', marginBottom: '.3em'}}>
                                    <span className="p-float-label">
                                        <InputText id="anoModelo" className="p-error" onChange={(e) => {
                                            this.handleOnChangeField('anoModelo', e.target.value)
                                        }} value={this.state.veiculo.anoModelo} name="anoModelo"/>
                                        <label htmlFor="in">Ano do Modelo</label>
                                    </span>
                                    {
                                        this.state.veiculo.anoModelo === '' &&
                                        <Message severity="error" text="Campo obrigatório" style={{width: '20em'}}/>
                                    }
                                </div>

                                <div className="d-flex p-col-9" style={{padding: '.5em', marginBottom: '.3em'}}>
                                    <span className="p-float-label">
                                        <InputText id="quilometragem" className="p-error" onChange={(e) => {
                                            this.handleOnChangeField('quilometragem', e.target.value)
                                        }} value={this.state.veiculo.quilometragem} name="quilometragem"/>
                                        <label htmlFor="in">Quilometragem</label>
                                    </span>
                                    {
                                        this.state.veiculo.quilometragem === '' &&
                                        <Message severity="error" text="Campo obrigatório" style={{width: '20em'}}/>
                                    }
                                </div>
                            </div>
                        }
                    </Dialog>
                </div>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        veiculos: state.VeiculoReducer.veiculos,
        isMergeVeiculo: state.VeiculoReducer.isMergeVeiculo,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadVeiculos: () => dispatch(loadVeiculos()),
        loadVeiculoByPlaca: (placa) => dispatch(loadVeiculoByPlaca(placa)),
        mergeVeiculo: (veiculo) => dispatch(mergeVeiculo(veiculo)),
        deleteVeiculo: (codigo) => dispatch(deleteVeiculo(codigo)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(veiculos)
