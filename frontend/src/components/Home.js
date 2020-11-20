const { default: Carousel } = require("../containers/Carousel");
const { default: UserInfo } = require("./UserInfo");

function HomePage() {
  return (
    <div>
      <Carousel />
      <UserInfo />
    </div>
  );
}

export default HomePage;
