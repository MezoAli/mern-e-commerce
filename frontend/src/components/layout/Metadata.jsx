import { Helmet } from "react-helmet";
const Metadata = ({ title, description = "" }) => {
  return (
    <Helmet>
      <title>{title} - Mezo-Shopping</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default Metadata;
