import { Grid } from 'react-loader-spinner';
import { LoaderContainer } from './Loader.styled';

const Loader = () => {
  return (
    <LoaderContainer>
      <Grid color="#303f9f" />
    </LoaderContainer>
  );
};
export default Loader;
