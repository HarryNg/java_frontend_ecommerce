import { productProvider } from "@/provider/product-provider";
import { useContext, useEffect, useState } from "react";
import { Input } from "./ui/input";
import search_icon from "@/assets/search_icon.png";
import cross_icon from "@/assets/cross_icon.png";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
    const search = useContext(productProvider)?.search;
    const setSearch = useContext(productProvider)?.setSearch;
    const showSearch = useContext(productProvider)?.showSearch;
    const setShowSearch = useContext(productProvider)?.setShowSearch
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        location.pathname==='/' ? setVisible(true) : setVisible(false);
        setShowSearch && setShowSearch(false);
    }, [location]);

    return showSearch && visible? (
    <div className="border-t border-b bg-gray-100 text-center rounded-full mt-10">
        <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
            <Input value={search} 
            onChange={(e) => setSearch && setSearch(e.target.value)}
            className="flex-1 outline-none bg-inherit text-sm" 
            type="text" placeholder="Search"/>
            <img className="w-4" src={search_icon} alt="" />
        </div>
        <img onClick={()=>setShowSearch && setShowSearch(false)}
        className="inline w-3 cursor-pointer" src={cross_icon} alt="" />
        
    </div>
    ) : null;
}

export default SearchBar
