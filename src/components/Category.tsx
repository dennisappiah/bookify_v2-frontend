import { Category as CategoryModel } from '../models/Category'


interface CategoryProps{
    category: CategoryModel
    onFilterSelect: (category: {_id: string, name: string}) => void
    currentFilter: {_id: string, name: string}
}

const Category = ({category, currentFilter, onFilterSelect,}: CategoryProps) => {
    const {_id, name} = category;

    return (
        <li  onClick={() => onFilterSelect(category)} 
        className={`${category === currentFilter? "list-group-item active clickable ": 
        "list-group-item " }`}>{name}
        </li>
    )
}


export default Category