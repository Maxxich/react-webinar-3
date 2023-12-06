import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css'
import { numberFormat } from "../../utils";
import { i } from "../../internationalization/i";

function ArticleInfo({article, onAdd}) {

  const cn = bem('ArticleInfo');

  const callbacks = {
    onAdd: () => onAdd(article._id)
  }

  return (
    <div className={cn()}>
      <div className={''}>{article.description}</div>
      <div>{i("Страна производитель")}: <strong>{article.madeIn.title} ({article.madeIn.code})</strong></div>
      <div>{i("Категория")}: <strong>{article.category.title}</strong></div>
      <div>{i("Год выпуска")}: <strong>{article.edition}</strong></div>
      <div className={cn('price')}>{i("Цена")}: {numberFormat(article.price)} ₽</div>
      <button onClick={callbacks.onAdd}>{i("Добавить")}</button>
    </div>
  );
}

ArticleInfo.propTypes = {
  article: PropTypes.shape({
    description: PropTypes.string,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string
    }),
    category: PropTypes.shape({
      title: PropTypes.string,
    }),
    price: PropTypes.number,
    edition: PropTypes.number,
  }),
  onAdd: PropTypes.func
};

ArticleInfo.defaultProps = {
  onAdd: () => {}
}

export default memo(ArticleInfo);
