import style from "./Main.module.css";
import ListHeader from "../ListItem/ListHeader";
import ListItem from "../ListItem/ListItem";
import useSales from "../../hooks/useSales";

const Main = () => {
  const { sales, isLoading, error } = useSales();

  return (
    <main>
      <h1>Lista de produtos estornados:</h1>

      {error && <p>Erro: {error}</p>}
      {isLoading && <p>Carregando...</p>}
      {!isLoading && sales.length < 1 && (
        <p>Não foram encontrados dados de estorno.</p>
      )}

      {!isLoading && sales.length > 0 && (
        <ul>
          <ListHeader />
          {sales.map((sale) => (
            <ListItem
              key={sale.invoice}
              saleData={sale.transaction.sale}
              refundData={sale.transaction.refund}
              invoice={sale.invoice}
            />
          ))}
        </ul>
      )}
    </main>
  );
};

export default Main;
