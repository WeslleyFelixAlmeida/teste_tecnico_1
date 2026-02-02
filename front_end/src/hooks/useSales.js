import { useEffect, useState } from "react";
import { API_URL } from "../utils/apiURL";

const useSales = () => {
    const [sales, setSales] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getSalesAndRefunds = async () => {
            try {
                const response = await fetch(`${API_URL}`, { method: "GET" });

                if (!response.ok) {
                    throw new Error("Erro ao buscar vendas");
                }

                const data = await response.json();
                setSales(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        getSalesAndRefunds();
    }, []);

    return { sales, isLoading, error };
};

export default useSales;
