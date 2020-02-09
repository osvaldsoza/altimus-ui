import React from 'react'
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";


class PesquisaVeiculo extends React.Component{
    constructor() {
        super();
        this.state = {
            placaVeiculo: ''
        }
    }

    handleClickPesquisarVeiculo = () => {
        this.handleGetVeiculosByPlaca();
        this.setState({ placaVeiculo: '' })
    }

    render(){
        return(
            <div className="d-flex p-col-9" style={{ padding: '.5em', marginTop: '1em'}}>
                        <span className="p-float-label">
                            <InputText
                                id="pesquisaVeiculo"
                                className="p-error"
                                onChange={(e) => this.setState({ placaVeiculo: e.target.value.toUpperCase() })}
                                value={this.state.placaVeiculo} name="pesquisaVeiculo" />
                            <label htmlFor="in">Placa do veículo</label>
                        </span>
                <Button
                    style={{ float: 'left' }}
                    label="Pesquisar"
                    onClick={this.handleClickPesquisarVeiculo}
                    disabled={!this.state.placaVeiculo}
                />
            </div>
        )
    }
}

export default PesquisaVeiculo