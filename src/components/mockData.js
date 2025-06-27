export const lastExecutionData = {
    id: 123,
    dataCriacao: "2025-06-10T14:34:45",
    etapa: "SÓ MAIS 72 HORAS",
    status: "EM ANDAMENTO"
};

export const queriesData = {
    page: 1,
    size: 10,
    hasNextPage: false,
    content: [
        { nome: "stg_limits_base", sql: "SELECT * FROM stg_limits_base WHERE condition = 'active';", dataHoraCriacao: "2025-05-01T10:00:00" },
        { nome: "fact_limits", sql: "SELECT id, limit, score FROM fact_limits fl JOIN users u ON fl.user_id = u.id;", dataHoraCriacao: "2025-05-02T11:30:00" },
        { nome: "customer_segmentation", sql: "SELECT customer_id, segment FROM customer_segmentation WHERE last_purchase > '2024-01-01';", dataHoraCriacao: "2025-05-03T14:00:00" },
        { nome: "risk_analysis", sql: "SELECT * FROM risk_analysis WHERE risk_level = 'high';", dataHoraCriacao: "2025-05-04T16:45:00" },
    ]
};

export const executionHistoryData = {
    page: 1,
    size: 10,
    hasNextPage: false,
    content: [
        { id: 123, idBatchVom: "ujklsa-isjjsat-ksjauqye-sksajsk", idQuery: 1, idEtapa: 1, idStatus: 2, dataHoraCriacao: "2025-06-10T14:34:45", dataHoraConclusao: null, dataHoraAtualizacao: "2025-06-10T15:34:48", url: "url-presignada", queryTipo: "CAMPEÃ", etapa: "SÓ MAIS 72 HORAS", status: "EM ANDAMENTO", usuarioCriacao: "ricardelas@ceapay.com.br", usuarioUltimoStatus: "dagster@ceapay.com.br" },
        { id: 122, idBatchVom: "asadea-isjjsat-ksjauqye-sksajsk", idQuery: 1, idEtapa: 1, idStatus: 2, dataHoraCriacao: "2025-06-05T15:54:45", dataHoraConclusao: "2025-06-08T13:14:15", dataHoraAtualizacao: "2025-06-08T13:14:15", url: "url-presignada", queryTipo: "TESTE", etapa: "PROCESSO ALTERAÇÃO DE LIMITES", status: "FINALIZADO", usuarioCriacao: "ricardelas@ceapay.com.br", usuarioUltimoStatus: "dagster@ceapay.com.br" },
        { id: 121, idBatchVom: "bdefaa-isjjsat-ksjauqye-sksajsk", idQuery: 2, idEtapa: 2, idStatus: 3, dataHoraCriacao: "2025-06-01T10:20:30", dataHoraConclusao: "2025-06-01T11:00:00", dataHoraAtualizacao: "2025-06-01T11:00:00", url: "url-presignada", queryTipo: "CAMPEÃ", etapa: "ANÁLISE DE CRÉDITO", status: "CANCELADO", usuarioCriacao: "joao.silva@ceapay.com.br", usuarioUltimoStatus: "sistema@ceapay.com.br" },
    ]
};

export const executionDetailsData = {
    content: {
        id: 123,
        idBatchVom: "ujklsa-isjjsat-ksjauqye-sksajsk",
        idQuery: 1,
        idEtapa: 1,
        idStatus: 2,
        dataHoraCriacao: "2025-06-10T14:34:45",
        dataHoraConclusao: null,
        dataHoraAtualizacao: "2025-06-10T15:34:48",
        url: "url-presignada",
        queryTipo: "CAMPEÃ",
        etapa: "SÓ MAIS 72 HORAS",
        status: "EM ANDAMENTO",
        usuarioCriacao: "ricardelas@ceapay.com.br",
        usuarioUltimoStatus: "dagster@ceapay.com.br",
        quantidades: {
            quantidadeClientes: 5837345,
            quantidadeComunicacaoInicialComSucesso: 5837345,
            quantidadeComunicacaoInicialComFalha: 0,
            quantidadeComunicacaoFinalComSucesso: 5837345,
            quantidadeComunicacaoFinalComFalha: 0,
            quantidadeAlteracaoLimiteComSucesso: 5837345,
            quantidadeAlteracaoLimiteComFalha: 0
        }
    }
};

export const customerSearchData = {
    page: 1,
    size: 10,
    hasNextPage: false,
    content: [
        { idPessoa: 123, idConta: 124, idProcesso: 123, idStatus: 1, valorLimiteGlobal: 1234.54, valorLimiteAprovado: 2345, statusVom: "APROVADO", dataHoraModificacao: "2025-06-10T15:34:48", flagComunicacaoInicial: true, flagComunicacaoFinal: true, flagAlteracaoLimite: true },
        { idPessoa: 125, idConta: 126, idProcesso: 123, idStatus: 2, valorLimiteGlobal: 500.00, valorLimiteAprovado: 500, statusVom: "REPROVADO", dataHoraModificacao: "2025-06-10T15:35:02", flagComunicacaoInicial: true, flagComunicacaoFinal: false, flagAlteracaoLimite: false },
    ]
};