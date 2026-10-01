import {
    IconSearch,
    IconPlus,
    IconPencil,
    IconTrashX,
    IconX,
    IconExclamationMark
} from "@tabler/icons-react";
import './NewCategory.css';
//Context
import { useContext, useState } from "react";
import { ProductContext } from '../Context/ProductContext';
import { ThemeContext } from "../Context/ThemeContext";

const NewCategory = ({ category, }) => {
    const { tema } = useContext(ThemeContext);

    const { state, deleteCategory } = useContext(ProductContext)
    const [confirmDelete, setConfirmDelete] = useState(false)

    return (
        <>
            <div
                className={`category-card ${tema}`}
                key={category.id}
            >
                <div className="category-info">
                    <div className="category-icon">
                        📁
                    </div>

                    <div>
                        <h4>
                            {category.name}
                        </h4>
                        <span>
                            {state.products.filter(
                                (product) =>
                                    product.category === category.name.toLowerCase()
                            ).length} produtos
                        </span>
                    </div>

                </div>


                <div className="category-buttons">
                    <button

                        className="category-delete"
                        onClick={() => setConfirmDelete(true)}
                    >
                        <IconTrashX stroke={1.5} />

                        Excluir

                    </button>
                </div>


            </div>

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
                            <span>"{category.name}"?</span>

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
                                onClick={() => deleteCategory(category.id)}
                            >
                                Excluir
                            </button>
                        </div>
                    </div >

                </div>

            ) : (null)
            }
        </>
    )
}

export default NewCategory