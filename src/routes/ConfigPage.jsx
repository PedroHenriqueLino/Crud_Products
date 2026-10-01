import './style/Config.css';

// Context
import { useContext, useState } from 'react';

import { ThemeContext } from '../Context/ThemeContext';
import { ProductContext } from '../Context/ProductContext';

const ConfigPage = () => {

    // tema
    const { tema, setTema } = useContext(ThemeContext);

    const {
        showStock,
        setShowStock,
        lowStockLimit,
        setLowStockLimit
    } = useContext(ProductContext);

    // estados temporários
    const [stockLimited, setstockLimited] = useState(lowStockLimit);
    const [showStockValue, setShowStockValue] = useState(showStock);
    const [temaInput, setTemaInput] = useState(tema);

    const handleSubmit = (e) => {

        setLowStockLimit(stockLimited);
        setShowStock(showStockValue);
        setTema(temaInput);

        localStorage.setItem('config', JSON.stringify({
            lowStockLimit: stockLimited,
            showStock: showStockValue,
            tema: temaInput
        }));
    };

    return (
        <div className={`config-content ${tema}`}>

            <div className="gerencie-produtos">

                <div className="gerencie-title">

                    <h2>Configurações</h2>

                    <p>
                        Gerencie as preferências e configurações do sistema
                    </p>

                </div>

            </div>

            <div className="config-form-container">

                <form onSubmit={handleSubmit}>

                    <section className="config-section">

                        <h3>// ESTOQUE</h3>

                        <div className="config-field">

                            <label htmlFor="stockThreshold">
                                Estoque baixo a partir de:
                            </label>

                            <div className="config-input-row">

                                <input
                                    type="text"
                                    id="stockThreshold"
                                    value={stockLimited}
                                    onChange={(e) =>
                                        setstockLimited(e.target.value)
                                    }
                                />

                                <span>[ 3 ]</span>

                                <span className="config-help">
                                    ?
                                </span>

                            </div>

                        </div>

                    </section>

                    <section className="config-section">

                        <h3>// RELATÓRIO</h3>

                        <div className="config-field">

                            <label>
                                Exibir valor total do estoque
                            </label>

                            <div className="config-toggle-row">

                                <label className="config-toggle">

                                    <input
                                        type="checkbox"
                                        checked={showStockValue}
                                        onChange={(e) =>
                                            setShowStockValue(e.target.checked)
                                        }
                                    />

                                    <span></span>

                                </label>

                                <p>
                                    [{showStockValue ? 'ON' : 'OFF'}]
                                </p>

                            </div>

                        </div>

                        <div className="config-field">

                            <label>
                                Exibir categorias vazias
                            </label>

                            <div className="config-toggle-row">

                                <label className="config-toggle">

                                    <input
                                        type="checkbox"
                                        checked={!showStockValue}
                                        onChange={(e) =>
                                            setShowStockValue(!e.target.checked)
                                        }
                                    />

                                    <span></span>

                                </label>

                                <p>[OFF]</p>

                            </div>

                        </div>

                    </section>

                    <section className="config-section">

                        <h3>// INTERFACE</h3>

                        <div className="config-field">

                            <label htmlFor="tema">
                                Tema
                            </label>

                            <div className="config-select-row">

                                <select
                                    id="tema"
                                    value={temaInput}
                                    onChange={(e) => setTemaInput(e.target.value)}
                                >

                                    <option value="escuro">
                                        Escuro
                                    </option>

                                    <option value="claro">
                                        Claro
                                    </option>

                                </select>

                                <span>
                                    ▼
                                </span>

                            </div>

                        </div>

                    </section>

                    <div className="config-actions">

                        <button type="submit">
                            Salvar Alterações
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default ConfigPage;