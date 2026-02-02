import style from "./ListItem.module.css";

const ListHeader = () => {
  return (
    <li className={style.listHeader}>
      <p className={style.createLine}>Movimento</p>
      <p className={style.createLine}>Código produto</p>
      <p className={style.createLine}>Código loja</p>
      <p className={style.createLine}>Valor</p>
      <p>NF número</p>
    </li>
  );
};

export default ListHeader;
