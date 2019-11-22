import React from 'react'
import PropTypes from 'prop-types'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'



function ListaVeiculos({ veiculos, selectedVeiculo, handleOnSelectionChange, handleVeiculoSelected, btnNovoVeiculo }) {
    return (
        <DataTable
            value={veiculos}
            paginator={true}
            rows={6}
            responsive={true}
            header={veiculos.length > 0 ? "veiculos" : "Não há veículos cadastrados"}
            footer={btnNovoVeiculo}
            selectionMode="single"
            selection={selectedVeiculo}
            onSelectionChange={handleOnSelectionChange}
            onRowSelect={handleVeiculoSelected}>
            <Column field="placa" header="Placa" />
            <Column field="marca" header="Marca" />
            <Column field="modelo" header="Modelo" />
            <Column field="anoModelo" header="Ano do Modelo" sortable={true} />
            <Column field="quilometragem" header="Quilometragem" />
        </DataTable>
    );
}

ListaVeiculos.propTypes = {
    veiculos: PropTypes.array,
    selectedVeiculo: PropTypes.string.isRequired,
    handleOnSelectionChange: PropTypes.func.isRequired,
    handleVeiculoSelected: PropTypes.func.isRequired,
    btnNovoVeiculo: PropTypes.object.isRequired
}
ListaVeiculos.defaultProps = {
    veiculos: []
}
export default ListaVeiculos