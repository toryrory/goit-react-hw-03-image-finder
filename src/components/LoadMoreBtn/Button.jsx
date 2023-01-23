import PropTypes from 'prop-types';
import { Button } from './Button.styled';

const LoadMoreBtn = ({ loadMore }) => {
  return (
    <Button type="button" onClick={loadMore}>
      Load More
    </Button>
  );
};
export default LoadMoreBtn;

LoadMoreBtn.propTypes = {
  loadMore: PropTypes.func.isRequired
}