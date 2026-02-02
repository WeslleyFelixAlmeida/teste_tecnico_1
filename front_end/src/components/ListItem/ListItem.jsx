import style from "./ListItem.module.css";

const ListItem = ({ saleData, refundData, invoice }) => {
  return (
    <li className={style.listItem}>
      <div className={`${style.listItemLine} ${style.lineBottom}`}>
        <p className={`${style.movementLine} ${style.lineBottomMovement}`}>
          Compra
        </p>
        <p className={style.createLine}>{saleData.product}</p>
        <p className={style.createLine}>{saleData.company}</p>
        <p className={style.createLine}>{saleData.value}</p>
        <p>{invoice}</p>
      </div>
      <div className={style.listItemLine}>
        <p className={style.movementLine}>Estorno</p>
        <p className={style.createLine}>{refundData.product}</p>
        <p className={style.createLine}>{refundData.company}</p>
        <p className={style.createLine}>{refundData.value}</p>
        <p>{invoice}</p>
      </div>
    </li>
  );
};

export default ListItem;
