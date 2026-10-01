import './style/Relatorio.css';

//icons
import {
    IconFileDescription,
    IconPackage,
    IconCash,
    IconAlertTriangle,
    IconTag,
    IconAlertTriangleFilled
} from '@tabler/icons-react';

//Context
import { useContext } from 'react';
import { ProductContext } from '../Context/ProductContext';
import { ThemeContext } from "../Context/ThemeContext";

// PDF
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const RelatorioPage = () => {
    const { tema } = useContext(ThemeContext);

    const { state, showStock, lowStockLimit } = useContext(ProductContext)

    const totalValue = state.products.reduce((total, product) => {
        return total + product.price;
    }, 0).toFixed(2);

    const lowStock = state.products.filter((product) => {
        return product.stock <= lowStockLimit;
    });

    const categoriesWithCount = state.categories
        .map(category => {
            const count = state.products.filter(
                product => product.category === category.name
            ).length;

            return {
                ...category,
                count
            };
        })
        .sort((a, b) => b.count - a.count);

    const maxProducts = Math.max(
        ...categoriesWithCount.map(category => category.count)
    );

    //exporando relatorio com chat GPT
    const exportarRelatorio = () => {

        const doc = new jsPDF();


        // =========================
        // CABEÇALHO
        // =========================

        doc.setFontSize(20);

        doc.setFont(
            'helvetica',
            'bold'
        );

        doc.text(
            'RELATÓRIO DE PRODUTOS',
            105,
            20,
            {
                align: 'center'
            }
        );

        doc.setFontSize(10);

        doc.setFont(
            'helvetica',
            'normal'
        );

        doc.text(
            'Relatório completo do estoque',
            105,
            27,
            {
                align: 'center'
            }
        );


        // =========================
        // RESUMO
        // =========================

        doc.setFontSize(14);

        doc.setFont(
            'helvetica',
            'bold'
        );

        doc.text(
            'Resumo',
            14,
            42
        );

        autoTable(doc, {

            startY: 47,

            head: [
                [
                    'Total de Produtos',
                    'Valor do Estoque',
                    'Estoque Baixo',
                    'Categorias'
                ]
            ],

            body: [
                [
                    state.products.length,
                    `R$ ${totalValue}`,
                    lowStock.length,
                    state.categories.length
                ]
            ],

            theme: 'grid',

            headStyles: {
                fontStyle: 'bold',
                halign: 'center'
            },

            bodyStyles: {
                halign: 'center'
            }

        });


        // =========================
        // ESTOQUE BAIXO
        // =========================

        let y = doc.lastAutoTable.finalY + 15;

        doc.setFontSize(14);

        doc.setFont(
            'helvetica',
            'bold'
        );

        doc.text(
            'Estoque baixo',
            14,
            y
        );


        if (lowStock.length > 0) {

            autoTable(doc, {

                startY: y + 5,

                head: [
                    [
                        'Produto',
                        'Estoque Atual'
                    ]
                ],

                body: lowStock.map(
                    (product) => [
                        product.name,
                        `${product.stock} unidades`
                    ]
                ),

                theme: 'grid',

                headStyles: {
                    fontStyle: 'bold'
                }

            });

        } else {

            doc.setFontSize(10);

            doc.setFont(
                'helvetica',
                'normal'
            );

            doc.text(
                'Nenhum produto com estoque baixo.',
                14,
                y + 8
            );
        }


        // =========================
        // PRODUTOS POR CATEGORIA
        // =========================

        y = doc.lastAutoTable
            ? doc.lastAutoTable.finalY + 15
            : y + 20;


        if (y > 250) {

            doc.addPage();

            y = 20;
        }


        doc.setFontSize(14);

        doc.setFont(
            'helvetica',
            'bold'
        );

        doc.text(
            'Produtos por categoria',
            14,
            y
        );


        autoTable(doc, {

            startY: y + 5,

            head: [
                [
                    'Categoria',
                    'Quantidade'
                ]
            ],

            body: categoriesWithCount.map(
                (category) => [
                    category.name,
                    category.count
                ]
            ),

            theme: 'grid',

            headStyles: {
                fontStyle: 'bold'
            }

        });


        // =========================
        // GRÁFICO
        // =========================

        y = doc.lastAutoTable.finalY + 15;


        if (y > 245) {

            doc.addPage();

            y = 20;
        }


        doc.setFontSize(14);

        doc.setFont(
            'helvetica',
            'bold'
        );

        doc.text(
            'Gráfico de produtos por categoria',
            14,
            y
        );


        y += 10;


        categoriesWithCount.forEach(
            (category) => {

                const barWidth =
                    (category.count / maxProducts) * 120;


                doc.setFontSize(9);

                doc.setFont(
                    'helvetica',
                    'normal'
                );


                // Nome da categoria

                doc.text(
                    category.name,
                    14,
                    y + 4
                );


                // Barra

                doc.rect(
                    55,
                    y,
                    120,
                    7
                );


                // Preenchimento

                if (barWidth > 0) {

                    doc.setFillColor(
                        50,
                        50,
                        50
                    );

                    doc.rect(
                        55,
                        y,
                        barWidth,
                        7,
                        'F'
                    );
                }


                // Quantidade

                doc.text(
                    String(category.count),
                    180,
                    y + 5
                );


                y += 13;


                // Nova página

                if (y > 270) {

                    doc.addPage();

                    y = 20;
                }

            }
        );


        // =========================
        // LISTA DE PRODUTOS
        // =========================

        if (y > 245) {

            doc.addPage();

            y = 20;
        }


        doc.setFontSize(14);

        doc.setFont(
            'helvetica',
            'bold'
        );

        doc.text(
            'Lista de produtos',
            14,
            y
        );


        autoTable(doc, {

            startY: y + 5,

            head: [
                [
                    'Produto',
                    'Categoria',
                    'Valor'
                ]
            ],

            body: state.products.map(
                (product) => [
                    product.name,
                    product.category,
                    `R$ ${Number(
                        product.price
                    ).toFixed(2)}`
                ]
            ),

            theme: 'grid',

            headStyles: {
                fontStyle: 'bold'
            }

        });


        // =========================
        // RODAPÉ
        // =========================

        const paginas =
            doc.internal.getNumberOfPages();


        for (
            let i = 1;
            i <= paginas;
            i++
        ) {

            doc.setPage(i);

            doc.setFontSize(8);

            doc.setFont(
                'helvetica',
                'normal'
            );

            doc.text(
                `Relatório de Produtos - Página ${i} de ${paginas}`,
                105,
                290,
                {
                    align: 'center'
                }
            );
        }


        // =========================
        // DOWNLOAD
        // =========================

        doc.save(
            'relatorio-produtos.pdf'
        );
    };

    //exporando relatorio com chat GPT


    return (
        <div className={`relatorio-content ${tema}`}>

            <div className="gerencie-produtos">

                <div className="gerencie-title">
                    <h2>Relatórios</h2>
                    <p>Acompanhe o desempenho dos seus Produtos</p>
                </div>

                <button
                    onClick={exportarRelatorio}
                >

                    <IconFileDescription stroke={2} />
                    Exportar relatório
                </button>

            </div>

            <div className="relatorio-summary">
                <div className="relatorio-card">
                    <div className="info">
                        <p>📦 Total de Produtos</p>
                        <span className='svg-products'><IconPackage /></span>
                    </div>

                    <h3>{state.products.length}</h3>
                </div>
                <div className="relatorio-card">
                    <div className="info">
                        <p>💰 Valor estoque</p>
                        <span className='svg-valor'> <IconCash /></span>
                    </div>


                    <h3
                        className={!showStock ? 'hidden-value' : ""}
                    >{totalValue}
                    </h3>
                </div>
                <div className="relatorio-card estoquecard">
                    <div className="info">
                        <p>⚠️ Estoque baixo</p>
                        <span className='svg-estoque'> <IconAlertTriangle /></span>
                    </div>

                    <h3>{lowStock.length}</h3>
                </div>
                <div className="relatorio-card category">
                    <div className="info">
                        <p>🏷️ Categorias</p>
                        <span className='svg-categories'><IconTag /></span>
                    </div>

                    <h3>{state.categories.length}</h3>
                </div>
            </div>

            <div className="relatorio-details">

                <div className="relatorio-category-chart">
                    <h2>Produtos por categoria</h2>

                    <h6>Categoria</h6>

                    <div className="category-list">
                        {categoriesWithCount.map((category) => {

                            const width = (category.count / maxProducts) * 100;

                            return (
                                <div className="category" key={category.id}>
                                    <h5>{category.name}</h5>

                                    <span style={{ width: `${width}%` }}></span>

                                    <p>{category.count}</p>
                                </div>
                            );
                        })}



                    </div>
                </div>

                <div className="estoque-baixo">
                    <h2>Estoque baixo</h2>

                    <div className="fita"></div>

                    <div className="estoque-list">
                        {lowStock.map((product) => (
                            <div className="estoque" key={product.id}>
                                <div className="estoque-product">
                                    <IconAlertTriangleFilled />
                                    <h5>{product.name}</h5>
                                </div>

                                <p>{product.stock} unidades</p>
                            </div>
                        ))}

                    </div>
                </div>

            </div>

        </div >
    )
}

export default RelatorioPage