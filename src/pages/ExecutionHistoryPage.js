import React, { useState } from 'react';
import { Table, Button, Modal, Descriptions, Tag, Typography, Card, Collapse, Form, Row, Col, DatePicker, Select } from 'antd';
import { EyeOutlined, StopOutlined, DownloadOutlined, FilterOutlined, SyncOutlined, CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { executionHistoryData, executionDetailsData } from '../components/mockData';

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;
const { Option } = Select;
const { confirm } = Modal;

const statusMap = {
    "EM ANDAMENTO": { color: "processing", icon: <SyncOutlined spin /> },
    "FINALIZADO": { color: "success", icon: <CheckCircleOutlined /> },
    "CANCELADO": { color: "error", icon: <CloseCircleOutlined /> },
};

const etapaMap = {
    "SÓ MAIS 72 HORAS": "purple",
    "PROCESSO ALTERAÇÃO DE LIMITES": "cyan",
    "ANÁLISE DE CRÉDITO": "geekblue",
};

const ExecutionHistoryPage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedExecution, setSelectedExecution] = useState(null);

    const showDetailModal = (record) => {
        setSelectedExecution(executionDetailsData.content);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedExecution(null);
    };

    const showCancelConfirm = (record) => {
        confirm({
            title: `Confirma o cancelamento da execução #${record.id}?`,
            icon: <ExclamationCircleOutlined />,
            content: 'Esta ação não pode ser desfeita. O processo será interrompido permanentemente.',
            okText: 'Sim, cancelar',
            okType: 'danger',
            cancelText: 'Não',
            onOk() {
                console.log(`Cancelando execução: ${record.id}`);
                // Lógica de cancelamento aqui
            },
        });
    };
    
    const handleDownload = (record) => {
        console.log(`Baixando arquivo para execução: ${record.id}, URL: ${record.url}`);
        // Lógica para iniciar o download da URL pré-assinada
        window.open(record.url, '_blank');
    };

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Tipo', dataIndex: 'queryTipo', key: 'queryTipo', render: tipo => <Tag color={tipo === 'CAMPEÃ' ? 'gold' : 'cyan'}>{tipo}</Tag> },
        { title: 'Etapa', dataIndex: 'etapa', key: 'etapa', render: etapa => <Tag color={etapaMap[etapa] || 'default'}>{etapa}</Tag> },
        { title: 'Status', dataIndex: 'status', key: 'status', render: status => {
            const statusInfo = statusMap[status] || { color: "default" };
            return <Tag color={statusInfo.color} icon={statusInfo.icon}>{status}</Tag>;
        }},
        { title: 'Criação', dataIndex: 'dataHoraCriacao', key: 'dataHoraCriacao', render: date => new Date(date).toLocaleString() },
        { title: 'Usuário', dataIndex: 'usuarioCriacao', key: 'usuarioCriacao' },
        {
            title: 'Ações',
            key: 'action',
            render: (_, record) => (
                <span>
                    <Button icon={<EyeOutlined />} onClick={() => showDetailModal(record)} style={{ marginRight: 8 }}>Detalhes</Button>
                    {record.status === 'EM ANDAMENTO' && (
                        <Button icon={<StopOutlined />} danger onClick={() => showCancelConfirm(record)} style={{ marginRight: 8 }}>Cancelar</Button>
                    )}
                    {record.status === 'FINALIZADO' && (
                        <Button icon={<DownloadOutlined />} onClick={() => handleDownload(record)}>Download</Button>
                    )}
                </span>
            ),
        },
    ];

    return (
        <Card>
            <Title level={2} className="page-title">Histórico de Execução</Title>
            <Collapse bordered={false} style={{ marginBottom: 24, background: '#f0f2f5' }}>
                <Panel header={<><FilterOutlined /> Filtros de Pesquisa</>} key="1">
                    <Form layout="vertical">
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item label="Período de Criação">
                                    <DatePicker.RangePicker style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Status">
                                    <Select placeholder="Selecione um status">
                                        <Option value="EM ANDAMENTO">Em Andamento</Option>
                                        <Option value="FINALIZADO">Finalizado</Option>
                                        <Option value="CANCELADO">Cancelado</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Tipo de Query">
                                    <Select placeholder="Selecione um tipo">
                                        <Option value="CAMPEÃ">Campeã</Option>
                                        <Option value="TESTE">Teste</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Button type="primary">Aplicar Filtros</Button>
                    </Form>
                </Panel>
            </Collapse>

            <Table columns={columns} dataSource={executionHistoryData.content} rowKey="id" />

            {selectedExecution && (
                <Modal
                    title={`Detalhes da Execução #${selectedExecution.id}`}
                    visible={isModalVisible}
                    onOk={handleModalClose}
                    onCancel={handleModalClose}
                    width={800}
                    footer={[<Button key="back" onClick={handleModalClose}>Fechar</Button>]}
                >
                    <Descriptions bordered column={2}>
                        <Descriptions.Item label="ID">{selectedExecution.id}</Descriptions.Item>
                        <Descriptions.Item label="Batch VOM ID">{selectedExecution.idBatchVom}</Descriptions.Item>
                        <Descriptions.Item label="Tipo"><Tag color={selectedExecution.queryTipo === 'CAMPEÃ' ? 'gold' : 'cyan'}>{selectedExecution.queryTipo}</Tag></Descriptions.Item>
                        <Descriptions.Item label="Etapa"><Tag color={etapaMap[selectedExecution.etapa]}>{selectedExecution.etapa}</Tag></Descriptions.Item>
                        <Descriptions.Item label="Status"><Tag color={statusMap[selectedExecution.status]?.color}>{selectedExecution.status}</Tag></Descriptions.Item>
                        <Descriptions.Item label="Data Criação">{new Date(selectedExecution.dataHoraCriacao).toLocaleString()}</Descriptions.Item>
                        <Descriptions.Item label="Usuário Criação">{selectedExecution.usuarioCriacao}</Descriptions.Item>
                    </Descriptions>
                    <Title level={4} style={{ marginTop: 24 }}>Quantidades</Title>
                    <Descriptions bordered column={1}>
                        <Descriptions.Item label="Clientes">{selectedExecution.quantidades.quantidadeClientes.toLocaleString()}</Descriptions.Item>
                        <Descriptions.Item label="Comunicação Inicial (Sucesso/Falha)">{`${selectedExecution.quantidades.quantidadeComunicacaoInicialComSucesso.toLocaleString()} / ${selectedExecution.quantidades.quantidadeComunicacaoInicialComFalha.toLocaleString()}`}</Descriptions.Item>
                        <Descriptions.Item label="Alteração de Limite (Sucesso/Falha)">{`${selectedExecution.quantidades.quantidadeAlteracaoLimiteComSucesso.toLocaleString()} / ${selectedExecution.quantidades.quantidadeAlteracaoLimiteComFalha.toLocaleString()}`}</Descriptions.Item>
                    </Descriptions>
                </Modal>
            )}
        </Card>
    );
};

export default ExecutionHistoryPage;