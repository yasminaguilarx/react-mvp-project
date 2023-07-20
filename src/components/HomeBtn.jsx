import { FaHome } from "react-icons/fa";

const HomeBtn = ({ handleHomeClick }) => {
  const handleClick = () => {
    handleHomeClick();
  };

  return (
    <div className='homeBtn' onClick={handleClick}>
      <FaHome /> Home
    </div>
  );
};

export default HomeBtn;
