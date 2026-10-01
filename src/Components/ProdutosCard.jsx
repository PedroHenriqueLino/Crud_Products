import './ProdutosCard.css';
import { useState } from 'react';
//icons
import { IconTrashX } from '@tabler/icons-react';
import { IconPencil } from '@tabler/icons-react';
import { IconExclamationMark } from '@tabler/icons-react';
import { IconX } from '@tabler/icons-react';

//Context
import { useContext } from 'react';
import { ProductContext } from '../Context/ProductContext';
import { ThemeContext } from '../Context/ThemeContext';

const ProdutosCard = ({ product, deleteProduct, style }) => {
    const { tema, setTema } = useContext(ThemeContext);

    const { updateProduct, state } = useContext(ProductContext)

    const [confirmDelete, setConfirmDelete] = useState(false)

    //edit-produto
    const [editProduct, seteditProduct] = useState(false)

    //Função para editar produto

    const [img, setImg] = useState(product.img);
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(String(product.price));
    const [category, setCategory] = useState(product.category);
    const [stock, setStock] = useState(product.stock);

    const [errors, setErrors] = useState({});

    const editSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        if (img === "") newErrors.img = true;
        if (name === "") newErrors.name = true;
        if (price === "") newErrors.price = true;
        if (category === "") newErrors.category = true;
        if (stock === "") newErrors.stock = true;

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        const priceNumber = Number(
            price.replace(',', '.')
        );

        updateProduct(product.id, {
            img,
            name,
            price: Number(
                price
                    .replace(/\./g, '')
                    .replace(',', '.')
            ),
            category,
            stock: Number(stock)
        });

        seteditProduct(false)
    }

    return (

        <>
            <div className={`produtos-card-content ${tema}`} style={style} >
                <div className="card-img">
                    <img src={product.img} alt="" />
                </div>

                <div className="card-info">
                    <h1>{product.name}</h1>

                    <div className="category">
                        <span>{product.category}</span>
                    </div>

                    <p> R${product.price}</p>

                    <span id='stock'> Estoque:{product.stock} unidades</span>
                </div>

                <div className="card-btn">
                    <button
                        id='edit'
                        onClick={() => seteditProduct(true)}
                    >
                        <IconPencil stroke={1} />
                        Editar
                    </button>

                    <button
                        id='clear'
                        onClick={() => setConfirmDelete(true)}
                    >
                        <IconTrashX stroke={1} />
                        excluir
                    </button>
                </div >
            </div >

            {confirmDelete ? (
                <div className="overlay">

                    <div className="delet-content" >
                        <div className="delet-banner">
                            <IconExclamationMark stroke={2} />
                        </div>
                        <h1>Excluir produto</h1>

                        <div className="delet-info">
                            <p>
                                Tem Certeza que deseja excluir o Produto
                            </p>
                            <span>"{product.name}"?</span>

                        </div>

                        <div className="delet-arrow">
                            <button
                                style={{
                                    background: '#14181e',
                                    color: "white",
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                                }}
                                onClick={() => setConfirmDelete(false)}
                            >
                                Cancelar
                            </button>

                            <button
                                style={{
                                    background: "rgba(224, 72, 72, 0.709)",
                                    color: "white",
                                    boxShadow: '0 2px 8px rgba(255, 0, 0, 0.2)',
                                }}
                                onClick={() => deleteProduct(product.id)}
                            >
                                Excluir
                            </button>
                        </div>
                    </div >

                </div>

            ) : (null)
            }

            {editProduct &&
                <div className="overlay">

                    <div className="edit-content">
                        <div className="edit-top">
                            <h3>Editar produto</h3>

                            <IconX
                                stroke={1}
                                onClick={() => seteditProduct(false)}
                            />
                        </div>

                        <form
                            onSubmit={(e) => editSubmit(e)}
                        >
                            <div className="form-input">
                                <label htmlFor="Nome">
                                    Url da img
                                </label>

                                <input
                                    className={errors.img ? "input-error" : ""}
                                    type="text"
                                    value={img}
                                    onChange={(e) => setImg(e.target.value)}
                                />
                            </div>
                            <div className="form-input">
                                <label htmlFor="Nome">
                                    Nome do Produto
                                </label>

                                <input
                                    className={errors.name ? "input-error" : ""}
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="form-input">
                                <label htmlFor="Price">
                                    Preço (R$)
                                </label>

                                <input
                                    className={errors.price ? "input-error" : ""}
                                    type="text"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>

                            <div className="form-input category">
                                <label htmlFor="Category">
                                    Categoria
                                </label>

                                <select
                                    className={errors.category ? "input-error" : ""}
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="" disabled>Selecione uma opção</option>
                                    {state.categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.name}
                                        > {category.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-input">
                                <label htmlFor="Estoque">
                                    Estoque
                                </label>

                                <input
                                    className={errors.stock ? "input-error" : ""}
                                    type="number"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </div>

                            <div className="form-arrow">
                                <button
                                    type='button'
                                    onClick={() => seteditProduct(false)}
                                    style={{
                                        background: "#2b3239",
                                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)"
                                    }}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type='submit'
                                    style={{
                                        background: "#444be3",
                                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)"
                                    }}
                                >
                                    Salvar alterações
                                </button>
                            </div>
                        </form >
                    </div >
                </div>
            }



        </>
    )
}

export default ProdutosCard