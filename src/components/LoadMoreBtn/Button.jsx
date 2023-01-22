import { Button } from "./Button.styled";

 const LoadMoreBtn = ({ loadMore }) => {
   return <Button type="button" onClick={loadMore}>Load More</Button>;
 };
export default LoadMoreBtn;