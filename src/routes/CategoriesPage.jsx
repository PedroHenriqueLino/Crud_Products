import "./style/Categories.css";

import { useState } from "react";
//icons
import {
    IconSearch,
    IconPlus,
    IconPencil,
    IconTrashX,
    IconX,
    IconExclamationMark
} from "@tabler/icons-react";

//Components
import NewCategory from "../Components/NewCategory";
//Context
import { useContext } from "react";
import { ProductContext } from '../Context/ProductContext';
import { ThemeContext } from "../Context/ThemeContext";
const CategoriesPage = () => {
    const { tema } = useContext(ThemeContext);

    const { state, newCategoryAPI, } = useContext(ProductContext)
    const [newCategoryContent, setNewCategoryContent] = useState(false);
    const [name, setname] = useState("");

    //searchCategory
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCategories = state.categories.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const [errors, setErrors] = useState({});



    const newCategorySubmit = (e) => {

        e.preventDefault();

        const newErrors = {};

        if (name === "") newErrors.name = true;

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        const newCategory = {
            name,
        }

        newCategoryAPI(newCategory)

        setname("")
        setNewCategoryContent(false)
    }


    return (

        <div className={`categories-content ${tema}`}>


            <div className="gerencie-categories">
                <div className="gerencie-title">
                    <h2>Categorias</h2>
                    <p>
                        Gerencie as categorias dos seus produtos
                    </p>
                </div>

                <button
                    onClick={() => setNewCategoryContent(true)}
                >
                    <IconPlus stroke={2} />
                    Nova categoria
                </button>
            </div>


            <div className="search-categories">

                <div className="input-search">
                    <input
                        type="text"
                        placeholder="Pesquisar categoria..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <IconSearch stroke={2} />
                </div>

            </div>

            <div className="categories-list">
                <h3>
                    Categorias
                </h3>

                <div className="categories-cards">
                    {filteredCategories.map((category) => (
                        <NewCategory
                            key={category.id}
                            category={category}
                        />
                    ))}
                </div>

            </div>


            {newCategoryContent && (

                <div className="overlay">

                    <div className="category-modal">

                        <div className="edit-top">

                            <h3>
                                Nova categoria
                            </h3>

                            <IconX
                                stroke={1}
                                onClick={() => setNewCategoryContent(false)}
                            />

                        </div>

                        <form onSubmit={(e) => newCategorySubmit(e)} >

                            <div className="form-input">

                                <label htmlFor="category-name">
                                    Nome da categoria
                                </label>

                                <input
                                    className={errors.name ? "input-error" : ""}
                                    id="category-name"
                                    type="text"
                                    placeholder="Ex: Periféricos"
                                    value={name}
                                    onChange={(e) =>
                                        setname(e.target.value)
                                    }
                                    autoFocus
                                />

                            </div>




                            <div className="form-arrow">

                                <button
                                    type="button"
                                    onClick={() => setNewCategoryContent(false)}
                                    style={{
                                        background: "#2b3239",
                                        boxShadow:
                                            "0 2px 6px rgba(0, 0, 0, 0.15)",
                                    }}
                                >
                                    Cancelar
                                </button>


                                <button
                                    type="submit"
                                    style={{
                                        background: "#444be3",
                                        boxShadow:
                                            "0 2px 6px rgba(0, 0, 0, 0.15)",
                                    }}
                                >
                                    Salvar
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}


        </div>
    );
};

export default CategoriesPage;