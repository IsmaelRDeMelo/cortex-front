import React, { useState } from 'react';
import { Card, Button, Tabs, List, Typography, Descriptions, Tag, Modal } from 'antd';
import { RocketOutlined, ExperimentOutlined, CodeOutlined, EyeOutlined, SyncOutlined, CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { lastExecutionData, queriesData } from '../components/mockData';

const { TabPane } = Tabs;
const { Title, Text, Paragraph } = Typography;
const { confirm } = Modal;

const statusMap = {
    "EM ANDAMENTO": { color: "blue", icon: <SyncOutlined spin /> },
    "FINALIZADO": { color: "green", icon: <CheckCircleOutlined /> },
    "CANCELADO": { color: "red", icon: <CloseCircleOutlined /> },
};

const etapaMap = {
    "SÓ MAIS 72 HORAS": "purple",
    "PROCESSO ALTERAÇÃO DE LIMITES": "cyan",
    "ANÁLISE DE CRÉDITO": "geekblue",
};

const HomePage = () => {
    const [isQueryModalVisible, setIsQueryModalVisible] = useState(false);
    const [selectedQuery, setSelectedQuery] = useState({ nome: '', sql: '' });
    const { id, dataCriacao, etapa, status } = lastExecutionData;

    const statusInfo = statusMap[status] || { color: "default", icon: null };
    const etapaColor = etapaMap[etapa] || "default";

    const showQueryModal = (query) => {
        setSelectedQuery(query);
        setIsQueryModalVisible(true);
    };

    const handleQueryModalOk = () => {
        setIsQueryModalVisible(false);
    };

    const showExecutionConfirm = (policyType) => {
        confirm({
            title: `Confirma a execução da política "${policyType}"?`,
            icon: <ExclamationCircleOutlined />,
            content: 'Esta ação iniciará um novo processo de batimento de políticas de crédito. Não poderá ser desfeito.',
            okText: 'Sim, executar',
            okType: 'primary',
            cancelText: 'Cancelar',
            onOk() {
                console.log(`Executando política: ${policyType}`);
                // Aqui iria a lógica para iniciar a execução
            },
            onCancel() {
                console.log('Execução cancelada');
            },
        });
    };

    return (
        <div>
            <Title level={2} className="page-title">Dashboard Principal</Title>

            <Card style={{ marginBottom: 24 }}>
                <Descriptions title="Última Execução" bordered>
                    <Descriptions.Item label="ID">{id}</Descriptions.Item>
                    <Descriptions.Item label="Data Criação">{new Date(dataCriacao).toLocaleString()}</Descriptions.Item>
                    <Descriptions.Item label="Etapa"><Tag color={etapaColor}>{etapa}</Tag></Descriptions.Item>
                    <Descriptions.Item label="Status">
                        <Tag color={statusInfo.color} icon={statusInfo.icon}>
                            {status}
                        </Tag>
                    </Descriptions.Item>
                </Descriptions>
            </Card>

            <Card>
                <Tabs defaultActiveKey="1">
                    <TabPane tab={<span><RocketOutlined /> Execução</span>} key="1">
                        <div style={{ padding: '24px', textAlign: 'center' }}>
                            <Title level={4}>Iniciar Nova Execução de Política</Title>
                            <Paragraph type="secondary">
                                Escolha qual política de crédito você deseja executar. A "Política Campeã" é a versão estável, enquanto a "Política Teste" é usada para validações.
                            </Paragraph>
                            <Button type="primary" size="large" icon={<RocketOutlined />} style={{ marginRight: 16 }} onClick={() => showExecutionConfirm('Política Campeã')}>
                                Política Campeã
                            </Button>
                            <Button size="large" icon={<ExperimentOutlined />} onClick={() => showExecutionConfirm('Política Teste')}>
                                Política Teste
                            </Button>
                        </div>
                    </TabPane>
                    <TabPane tab={<span><CodeOutlined /> Queries</span>} key="2">
                        <List
                            header={<Title level={4}>Listagem de Queries</Title>}
                            itemLayout="horizontal"
                            dataSource={queriesData.content}
                            renderItem={item => (
                                <List.Item
                                    actions={[<Button icon={<EyeOutlined />} onClick={() => showQueryModal(item)}>Ver Query</Button>]}
                                >
                                    <List.Item.Meta
                                        avatar={<CodeOutlined style={{ fontSize: '24px', color: '#1890ff' }} />}
                                        title={<Text strong>{item.nome}</Text>}
                                        description={`Criada em: ${new Date(item.dataHoraCriacao).toLocaleDateString()}`}
                                    />
                                </List.Item>
                            )}
                        />
                    </TabPane>
                </Tabs>
            </Card>

            <Modal
                title={`Query: ${selectedQuery.nome}`}
                visible={isQueryModalVisible}
                onOk={handleQueryModalOk}
                onCancel={handleQueryModalOk}
                width={800}
                footer={[<Button key="back" onClick={handleQueryModalOk}>Fechar</Button>]}
            >
                <Paragraph>A seguir o conteúdo completo da query SQL:</Paragraph>
                <pre className="sql-code"><code>{selectedQuery.sql}</code></pre>
            </Modal>
        </div>
    );
};

export default HomePage;