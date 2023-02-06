import { Button } from '@chakra-ui/button';
import css from './TransactionsTable.module.css';
import { useDispatch } from 'react-redux';
import { deleteTransaction } from 'redux/transaction/transactionOperations';
import { isModalUpdateTransaction } from 'redux/modal/modalSlice';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { EditTransaction } from 'redux/transaction/transactionSlice';
import { numberNormalize } from 'helpers/numberNormalize';

export const TransactionsTable = function ({ dataArr }) {
  // удаление транзакции
  const dispatch = useDispatch();
  const onClickUpdate = transaction => {
    dispatch(isModalUpdateTransaction(true));
    dispatch(EditTransaction(transaction));
  };

  return (
    <section className={css.transactionSection}>
      <table className={css.transactionTable}>
        <thead style={{ width: '704px' }}>
          <tr className={css.transactionTableHead}>
            <th className={css.transactionTitles}>Date</th>
            <th className={css.transactionTitles}>Type</th>
            <th className={css.transactionTitles}>Category</th>
            <th className={css.transactionTitles}>Comment</th>
            <th className={css.transactionTitles}>Sum</th>
            <th className={css.transactionTitles}>Balance</th>
          </tr>
        </thead>

        <tbody className={css.transactionTableBody}>
          {dataArr.map(item => (
            <tr className={css.transactionBodyLine}>
              <td className={css.transactionsValues}>{item.transactionDate}</td>
              <td className={css.transactionsValues}>{item.type}</td>
              {/* <td className={css.transactionsValues}>{item.categoryId}</td> */}
              <td className={css.transactionsValues}>{item.category}</td>
              <td className={css.transactionsValues}>{item.comment}</td>
              <td className={item.type === '+' ? css.income : css.expense}>
                {numberNormalize(item.amount)}
              </td>
              <td className={css.transactionsValues}>
                {numberNormalize(item.balanceAfter)}
              </td>
              <div className={css.blockButton}>
                <Button
                  borderRadius="50"
                  backgroundColor="#24CCA7"
                  _hover="#24CCA7"
                  boxSize="44px"
                  boxShadow=" 0px 6px 15px rgba(36, 204, 167, 0.5)"
                  onClick={() => dispatch(deleteTransaction(item))}
                >
                  <DeleteIcon boxSize="20px" color="#FFFFFF" />
                </Button>
              </div>
              <div className={css.blockButton}>
                <Button
                  borderRadius="50"
                  backgroundColor="#24CCA7"
                  _hover="#24CCA7"
                  boxSize="44px"
                  boxShadow=" 0px 6px 15px rgba(36, 204, 167, 0.5)"
                  onClick={() => onClickUpdate(item)}
                >
                  <EditIcon boxSize="20px" color="#FFFFFF" />
                </Button>
              </div>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
