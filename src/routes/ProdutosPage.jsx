import './style/Produtos.css';
//icons
import { IconPlus } from '@tabler/icons-react';
import { IconSearch } from '@tabler/icons-react';
import { IconBrandGithub } from '@tabler/icons-react';
import { IconBox } from '@tabler/icons-react';
import {
    IconChevronLeft,
    IconChevronRight
} from '@tabler/icons-react';

//react-router
import { Link } from 'react-router-dom';

//Components
import ProdutosCard from '../Components/ProdutosCard';
import Loadding from '../Components/Loadding.jsx'
import NewProduct from '../Components/NewProduct.jsx';
//Context
import { useContext, useState } from 'react';
import { ProductContext } from '../Context/ProductContext';
import { ThemeContext } from '../Context/ThemeContext';

const ProdutosPage = () => {
    //tema
    const { tema } = useContext(ThemeContext);

    const { state, deleteProduct, newProductAPI, categories } = useContext(ProductContext)

    const [newProduct, setNewProduct] = useState(false)

    //Sistema selecionar categoria
    const [selectCategory, setSelectCategory] = useState("Todos")

    const FilteredProducts =
        selectCategory === "Todos"
            ? state.products
            : state.products.filter((produto) =>
                produto.category.includes(selectCategory)
            );

    //sistema de pesquisa
    const [search, setSearch] = useState("")

    const searchFilteredProducts = FilteredProducts.filter((produto) =>
        normalizeText(produto.name).includes(normalizeText(search))
    );

    //sistema de ordenação
    const [order, setOrder] = useState("")

    const SortedProducts = [...searchFilteredProducts].sort((a, b) => {

        if (order === "menor") {
            return a.price - b.price
        }

        if (order === "maior") {
            return b.price - a.price
        }

        if (order === "az") {
            return a.name.localeCompare(b.name)
        }

        if (order === "za") {
            return b.name.localeCompare(a.name)
        }

        return 0
    })
    function normalizeText(text) {
        return text
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();
    }

    //Sistema de ArrowPages
    const productsPorPage = 3

    const totalPages = Math.ceil(
        SortedProducts.length / productsPorPage
    );



    //Sistema para muudar de pagina
    const [currentPage, setCurrentPage] = useState(1);

    const indexLastProduct = currentPage * productsPorPage;
    const indexFirstProduct = indexLastProduct - productsPorPage;

    const currentProducts = SortedProducts.slice(
        indexFirstProduct,
        indexLastProduct
    );




    return (
        <div className={`produtos-content ${tema}`}>

            <Link to={'/produtos'}>
                <div className="nav-title">

                    <div className="animation-title">
                        <IconBox stroke={1} />
                        <h1>CRUD Produtos</h1>
                    </div>

                </div>
            </Link>
            <div className="gerencie-produtos">

                <div className="gerencie-title">
                    <h2>Produtos</h2>
                    <p>Gerencie seus produtos</p>
                </div>

                <button
                    onClick={() => setNewProduct(true)}
                >
                    < IconPlus stroke={1} color='#fff' />
                    Adicionar produto
                </button>

            </div>

            <div className="search-produtos">

                <div className="input-search">
                    <input
                        type="text"
                        placeholder='Buscar produto...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <IconSearch stroke={1} />
                </div>

                <div className="select">
                    <label htmlFor="Categoria">
                        Categoria
                    </label>
                    <select id="categoria"
                        value={selectCategory}
                        onChange={(e) => setSelectCategory(e.target.value)}
                    >
                        <option value="Todos">Todos</option>
                        <option value="perifericos">Periféricos</option>
                        <option value="informatica">Informática</option>
                        <option value="celulares">Celulares</option>
                        <option value="games">Games</option>
                        <option value="acessorios">Acessórios</option>
                    </select>
                </div>

                <div className="select">
                    <label htmlFor="Ordenar por">
                        Ordenar Por
                    </label>
                    <select id="categoria"
                        value={order}
                        onChange={(e) => setOrder(e.target.value)}
                    >
                        <option value="">Selecione</option>
                        <option value="menor">Menor preço</option>
                        <option value="maior">Maior preço</option>
                        <option value="az">Nome (A - Z)</option>
                        <option value="za">Nome (Z - A)</option>
                    </select>
                </div>

                <a href="https://github.com/PedroHenriqueLino" target="_blank" rel="noreferrer">
                    <div className="select-icon">
                        <IconBrandGithub stroke={2} />
                    </div>
                </a>
            </div>

            <div className="produtos-cards">
                <span>Total: {state.products.length} produtos</span>

                {state.products.length > 0
                    ?
                    (
                        currentProducts.map((product, index) => (
                            <ProdutosCard
                                key={product.id}
                                product={product}
                                deleteProduct={deleteProduct}

                                style={{
                                    animationDelay: `${index * 0.2}s`
                                }}
                            />
                        ))
                    )
                    :
                    (
                        <Loadding />
                    )
                }

                <div className="arrow">

                    {currentPage > 1 && (
                        <button onClick={() => setCurrentPage(currentPage - 1)}>
                            <IconChevronLeft
                                title="Anterior"
                                stroke={1}
                            />
                        </button>
                    )}

                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            className={`new-btn ${index + 1 === currentPage ? "active" : ""}`}
                            key={`${currentPage}-${index}`}
                            style={{
                                animationDelay: `${(totalPages - index) * 0.15}s`
                            }}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}

                    {currentPage < totalPages && (
                        <button onClick={() => setCurrentPage(currentPage + 1)}>
                            <IconChevronRight
                                title="Próximo"
                                stroke={1}
                            />
                        </button>
                    )}


                </div>


            </div>

            <div className="add-product">
                <NewProduct newProduct={newProduct} setNewProduct={setNewProduct} newProductAPI={newProductAPI} categories={state.categories} />
            </div>
        </div >
    )
}

export default ProdutosPage