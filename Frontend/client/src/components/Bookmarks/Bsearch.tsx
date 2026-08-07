import { FaSearch } from "react-icons/fa";

interface Props {
    search: string,
    setSearch: (value: string) => void;
}

function Search_Bar({
    search,
    setSearch,
}: Props) {

    return (

        <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>

            <input type="text" 
            placeholder="Search bookmarks..."  
            className="input input-bordered w-full pl-12"
            value={search}
            onChange={(e) =>
                setSearch(e.target.value)
            }
            />
        </div>
    )
}

export default Search_Bar;