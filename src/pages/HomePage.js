import React from 'react';
import { Card, Button, Tabs, List, Typography, Descriptions, Tag } from 'antd';
import { RocketOutlined, ExperimentOutlined, CodeOutlined, CheckCircleOutlined, SyncOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { lastExecutionData, queriesData } from '../components/mockData';

const { TabPane } = Tabs;
const { Title, Text } = Typography;

const statusMap = {
    "EM ANDAMENTO": { color: "blue", icon: <SyncOutlined spin /> },
    "FINALIZADO": { color: "green", icon: <CheckCircleOutlined /> },
    "CANCELADO": { color: "red", icon: <CloseCircleOutlined /> },
};

const HomePage = () => {
    const { id, dataCriacao, etapa, status } = lastExecutionData;
    const statusInfo = statusMap[status] || { color: "default", icon: null };

    return (
        <div>
            <Title level={2} className="page-title">Dashboard Principal</Title>

            <div className="last-execution-info">
                <Descriptions title="Última Execução" bordered>
                    <Descriptions.Item label="ID">{id}</Descriptions.Item>
                    <Descriptions.Item label="Data Criação">{new Date(dataCriacao).toLocaleString()}</Descriptions.Item>
                    <Descriptions.Item label="Etapa">{etapa}</Descriptions.Item>
                    <Descriptions.Item label="Status">
                        <Tag color={statusInfo.color} icon={statusInfo.icon}>
                            {status}
                        </Tag>
                    </Descriptions.Item>
                </Descriptions>
            </div>

            <Card>
                <Tabs defaultActiveKey="1">
                    <TabPane tab={<span><RocketOutlined /> Execução</span>} key="1">
                        <div style={{ padding: '24px', textAlign: 'center' }}>
                            <Title level={4}>Iniciar Nova Execução de Política</Title>
                            <Text type="secondary" style={{ marginBottom: '24px', display: 'block' }}>
                                Escolha qual política de crédito você deseja executar. A "Política Campeã" é a versão estável e principal, enquanto a "Política Teste" é usada para validações e melhorias.
                            </Text>
                            <Button type="primary" size="large" icon={<RocketOutlined />} style={{ marginRight: 16 }}>
                                Política Campeã
                            </Button>
                            <Button size="large" icon={<ExperimentOutlined />}>
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
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<CodeOutlined style={{ fontSize: '24px', color: '#1890ff' }} />}
                                        title={<Text strong>{item.nome}</Text>}
                                        description={item.sql}
                                    />
                                    <div><Text type="secondary">{new Date(item.dataHoraCriacao).toLocaleDateString()}</Text></div>
                                </List.Item>
                            )}
                        />
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    );
};

export default HomePage;