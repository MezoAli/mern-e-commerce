import { Helmet } from "react-helmet";
const Metadata = ({ title }) => {
  return (
    <Helmet>
      <title>{title} - Mezo-Shopping</title>
    </Helmet>
  );
};

export default Metadata;
