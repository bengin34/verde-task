import errorImg from "../assests/img/404.png";

const NotFound = () => {
  return (
    <div className="container text-center mt-4">
      <img className="w-75" src={errorImg} alt="error" />
    </div>
  );
};

export default NotFound;
