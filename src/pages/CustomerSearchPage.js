import React, { useState } from 'react';
import { Form, Input, Button, Table, Tag, Typography, Card, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { customerSearchData } from '../components/mockData';

const { Title } = Typography;

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
        { title: 'ID Processo', dataIndex: 'idProcesso', key: 'idProcesso' },
        { title: 'Status VOM', dataIndex: 'statusVom', key: 'statusVom', render: status => <Tag color={status === 'APROVADO' ? 'success' : 'error'}>{status}</Tag> },
        { title: 'Limite Global', dataIndex: 'valorLimiteGlobal', key: 'valorLimiteGlobal', render: value => `R$ ${value.toFixed(2)}` },
        { title: 'Limite Aprovado', dataIndex: 'valorLimiteAprovado', key: 'valorLimiteAprovado', render: value => `R$ ${value.toFixed(2)}` },
        { title: 'Com. Inicial', dataIndex: 'flagComunicacaoInicial', key: 'flagComunicacaoInicial', render: flag => <Tag color={flag ? 'green' : 'red'}>{flag ? 'Sim' : 'Não'}</Tag> },
        { title: 'Com. Final', dataIndex: 'flagComunicacaoFinal', key: 'flagComunicacaoFinal', render: flag => <Tag color={flag ? 'green' : 'red'}>{flag ? 'Sim' : 'Não'}</Tag> },
        { title: 'Alt. Limite', dataIndex: 'flagAlteracaoLimite', key: 'flagAlteracaoLimite', render: flag => <Tag color={flag ? 'green' : 'red'}>{flag ? 'Sim' : 'Não'}</Tag> },
    ];

    return (
        <Card>
            <Title level={2} className="page-title">Consulta de Clientes</Title>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="idPessoa"
                            label="ID Pessoa"
                        >
                            <Input placeholder="Digite o ID da Pessoa" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="idConta"
                            label="ID Conta"
                        >
                            <Input placeholder="Digite o ID da Conta" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="idProcesso"
                            label="ID Processo"
                            rules={[{ required: true, message: 'O ID do Processo é obrigatório' }]}
                        >
                            <Input placeholder="Digite o ID do Processo" />
                        </Form.Item>
                    </Col>
                </Row>
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