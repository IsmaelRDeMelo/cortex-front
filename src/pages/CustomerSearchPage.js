import React, { useState } from 'react';
import { Form, Input, Button, Table, Tag, Typography, Card, Row, Col, Collapse, DatePicker, Select } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { customerSearchData } from '../components/mockData';

const { Title } = Typography;
const { Panel } = Collapse;
const { Option } = Select;

const CustomerSearchPage = () => {
    const [form] = Form.useForm();
    const [results, setResults] = useState([]);
    const [searched, setSearched] = useState(false);

    const onFinish = (values) => {
        console.log('Search values:', values);
        setResults(customerSearchData.content);
        setSearched(true);
    };

    const columns = [
        { title: 'ID Pessoa', dataIndex: 'idPessoa', key: 'idPessoa' },
        { title: 'ID Conta', dataIndex: 'idConta', key: 'idConta' },
        { title: 'Status VOM', dataIndex: 'statusVom', key: 'statusVom', render: status => <Tag color={status === 'APROVADO' ? 'success' : 'error'}>{status}</Tag> },
        { title: 'Limite Aprovado', dataIndex: 'valorLimiteAprovado', key: 'valorLimiteAprovado', render: value => `R$ ${value.toFixed(2)}` },
        { title: 'Com. Inicial', dataIndex: 'flagComunicacaoInicial', key: 'flagComunicacaoInicial', render: flag => <Tag color={flag ? 'green' : 'red'}>{flag ? 'Sim' : 'Não'}</Tag> },
    ];

    return (
        <Card>
            <Title level={2} className="page-title">Consulta de Clientes</Title>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                    name="idProcesso"
                    label="ID Processo (Obrigatório)"
                    rules={[{ required: true, message: 'O ID do Processo é obrigatório' }]}
                >
                    <Input placeholder="Digite o ID do Processo" />
                </Form.Item>

                <Collapse bordered={false} style={{ background: '#f0f2f5', marginBottom: 24 }}>
                    <Panel header={<><FilterOutlined /> Mais Filtros</>} key="1">
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item name="idPessoa" label="ID Pessoa">
                                    <Input placeholder="Digite o ID da Pessoa" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="idConta" label="ID Conta">
                                    <Input placeholder="Digite o ID da Conta" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="dataModificacao" label="Data de Modificação">
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="flagComunicacao" label="Flag Comunicação Inicial">
                                    <Select placeholder="Selecione">
                                        <Option value={true}>Sim</Option>
                                        <Option value={false}>Não</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Panel>
                </Collapse>

                <Form.Item>
                    <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                        Consultar
                    </Button>
                </Form.Item>
            </Form>

            {searched && <Table columns={columns} dataSource={results} rowKey="idPessoa" style={{ marginTop: 24 }} />}
        </Card>
    );
};

export default CustomerSearchPage;