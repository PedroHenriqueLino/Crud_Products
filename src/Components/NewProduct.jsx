import { useState } from "react";
import { IconX } from '@tabler/icons-react';

import './NewProduct.css';
const NewProduct = ({ newProduct, setNewProduct, newProductAPI, categories }) => {


    const [errors, setErrors] = useState({});

    const [img, setImg] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");

    const newProductSubmit = (e) => {
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


        const newProduct = {
            img,
            name,
            price: Number(price),
            category,
            stock: Number(stock)
        }

        newProductAPI(newProduct)

        setNewProduct(false)
        setImg("")
        setName("")
        setPrice("")
        setStock("")
    }

    return (
        <div>

            {newProduct &&
                <div className="overlay">
                    <div className="edit-content">
                        <div className="edit-top">
                            <h3>Adicionar Produto</h3>

                            <IconX
                                stroke={1}
                                onClick={() => setNewProduct(false)}
                            />
                        </div>

                        <form
                            onSubmit={(e) => newProductSubmit(e)}
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
                                    {categories.map((category) => (
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
                                    onClick={() => setNewProduct(false)}
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
                </div >
            }

        </div>
    )
}

export default NewProduct