import React, { useState } from 'react';
import { Table, Button, Modal, Descriptions, Tag, Typography, Card } from 'antd';
import { EyeOutlined, StopOutlined, CheckCircleOutlined, SyncOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { executionHistoryData, executionDetailsData } from '../components/mockData';

const { Title } = Typography;

const statusMap = {
    "EM ANDAMENTO": { color: "processing", icon: <SyncOutlined spin /> },
    "FINALIZADO": { color: "success", icon: <CheckCircleOutlined /> },
    "CANCELADO": { color: "error", icon: <CloseCircleOutlined /> },
};

const ExecutionHistoryPage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedExecution, setSelectedExecution] = useState(null);

    const showModal = (record) => {
        setSelectedExecution(executionDetailsData.content);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        setSelectedExecution(null);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedExecution(null);
    };

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Tipo de Query', dataIndex: 'queryTipo', key: 'queryTipo', render: tipo => <Tag color={tipo === 'CAMPEÃ' ? 'gold' : 'cyan'}>{tipo}</Tag> },
        { title: 'Etapa', dataIndex: 'etapa', key: 'etapa' },
        { title: 'Status', dataIndex: 'status', key: 'status', render: status => {
            const statusInfo = statusMap[status] || { color: "default" };
            return <Tag color={statusInfo.color} icon={statusInfo.icon}>{status}</Tag>;
        }},
        { title: 'Data de Criação', dataIndex: 'dataHoraCriacao', key: 'dataHoraCriacao', render: date => new Date(date).toLocaleString() },
        { title: 'Usuário Criação', dataIndex: 'usuarioCriacao', key: 'usuarioCriacao' },
        {
            title: 'Ações',
            key: 'action',
            render: (_, record) => (
                <span>
                    <Button icon={<EyeOutlined />} onClick={() => showModal(record)} style={{ marginRight: 8 }}>Detalhes</Button>
                    {record.status === 'EM ANDAMENTO' && (
                        <Button icon={<StopOutlined />} danger>Cancelar Execução</Button>
                    )}
                </span>
            ),
        },
    ];

    return (
        <Card>
            <Title level={2} className="page-title">Histórico de Execução</Title>
            <Table columns={columns} dataSource={executionHistoryData.content} rowKey="id" />

            {selectedExecution && (
                <Modal
                    title={`Detalhes da Execução #${selectedExecution.id}`}
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    width={800}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            Fechar
                        </Button>,
                    ]}
                >
                    <Descriptions bordered column={2}>
                        <Descriptions.Item label="ID">{selectedExecution.id}</Descriptions.Item>
                        <Descriptions.Item label="Batch VOM ID">{selectedExecution.idBatchVom}</Descriptions.Item>
                        <Descriptions.Item label="Tipo de Query"><Tag color={selectedExecution.queryTipo === 'CAMPEÃ' ? 'gold' : 'cyan'}>{selectedExecution.queryTipo}</Tag></Descriptions.Item>
                        <Descriptions.Item label="Etapa">{selectedExecution.etapa}</Descriptions.Item>
                        <Descriptions.Item label="Status">
                            <Tag color={statusMap[selectedExecution.status]?.color}>{selectedExecution.status}</Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="Data Criação">{new Date(selectedExecution.dataHoraCriacao).toLocaleString()}</Descriptions.Item>
                        <Descriptions.Item label="Data Conclusão">{selectedExecution.dataHoraConclusao ? new Date(selectedExecution.dataHoraConclusao).toLocaleString() : 'N/A'}</Descriptions.Item>
                        <Descriptions.Item label="Usuário Criação">{selectedExecution.usuarioCriacao}</Descriptions.Item>
                    </Descriptions>
                    <Title level={4} style={{ marginTop: 24 }}>Quantidades</Title>
                    <Descriptions bordered column={1}>
                        <Descriptions.Item label="Clientes">{selectedExecution.quantidades.quantidadeClientes.toLocaleString()}</Descriptions.Item>
                        <Descriptions.Item label="Comunicação Inicial (Sucesso/Falha)">{`${selectedExecution.quantidades.quantidadeComunicacaoInicialComSucesso.toLocaleString()} / ${selectedExecution.quantidades.quantidadeComunicacaoInicialComFalha.toLocaleString()}`}</Descriptions.Item>
                        <Descriptions.Item label="Comunicação Final (Sucesso/Falha)">{`${selectedExecution.quantidades.quantidadeComunicacaoFinalComSucesso.toLocaleString()} / ${selectedExecution.quantidades.quantidadeComunicacaoFinalComFalha.toLocaleString()}`}</Descriptions.Item>
                        <Descriptions.Item label="Alteração de Limite (Sucesso/Falha)">{`${selectedExecution.quantidades.quantidadeAlteracaoLimiteComSucesso.toLocaleString()} / ${selectedExecution.quantidades.quantidadeAlteracaoLimiteComFalha.toLocaleString()}`}</Descriptions.Item>
                    </Descriptions>
                </Modal>
            )}
        </Card>
    );
};

export default ExecutionHistoryPage;